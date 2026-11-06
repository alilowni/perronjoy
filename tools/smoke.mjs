#!/usr/bin/env node
/* Perronjoy — browser smoke test.
   Usage:  node tools/smoke.mjs [station-id ...]   (no id: the template and every listed station)
   Opens each ready or draft station in headless Chromium with motion on and checks:
   no browser errors, a route with steps, the green platform, a moving arrival
   train, smooth camera frames, language switch (also scene labels), theme switch,
   list mode, and picking another departure; the WC markers, the "WC onderweg"
   switch with its URL, steps and list section; the search-and-select fields by
   keyboard and mouse. Placeholder stations are skipped.
   Exit code 1 when a check fails. */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { startServer, SITE } from './lib/server.mjs';
import { launchChromium } from './lib/playwright.mjs';

const args = process.argv.slice(2);
const index = JSON.parse(readFileSync(join(SITE, 'stations', 'index.json'), 'utf8'));
const ids = !args.length || args.includes('--all') ? ['_template', ...index.stations.map((s) => s.id)] : args;

const server = await startServer();
let browser;
try { browser = await launchChromium(); }
catch (e) { console.error(e.message); server.close(); process.exit(2); }

let failed = false;
for (const id of ids) {
  const jsonPath = join(SITE, 'stations', id, 'station.json');
  if (!existsSync(jsonPath)) { console.log(`\n== ${id} ==\n  FAIL   no station.json`); failed = true; continue; }
  const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
  console.log(`\n== ${id} ==`);
  if (data.status === 'placeholder') { console.log('  skip   placeholder'); continue; }
  const results = [...await smoke(id), ...await smokeToilets(id, data), ...await smokeSearch(id)];
  results.forEach(([ok, msg]) => { console.log((ok ? '  ok     ' : '  FAIL   ') + msg); if (!ok) failed = true; });
}
await browser.close();
server.close();
process.exit(failed ? 1 : 0);

async function smoke(id) {
  const out = [];
  const check = (ok, msg) => out.push([!!ok, msg]);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(server.base + 'station.html?station=' + encodeURIComponent(id) + '&lang=nl&theme=light', { waitUntil: 'networkidle' });
  const state = await page.waitForFunction(() => document.documentElement.dataset.pjState, null, { timeout: 10000 }).then((h) => h.jsonValue()).catch(() => null);
  check(state === 'ready', `page state is "${state}"`);
  if (state !== 'ready') { await context.close(); return out; }

  const steps = await page.locator('#steps li').count();
  check(steps >= 2, `${steps} route steps shown`);
  check(await page.locator('svg.scene .platform.is-yours').count() === 1, 'one green "your train" platform');
  check(await page.locator('svg.scene .glow').count() === 1, 'glow on your platform');
  check(await page.locator('svg.scene .route-line').count() === 1, 'route line drawn');

  // Arrival train moves along its track.
  const sel = await page.evaluate(() => { const s = window.Perronjoy.state; return s.from && !s.from.synthetic ? s.from.id : null; });
  if (sel) {
    const pos = () => page.evaluate((rid) => { const g = document.querySelector(`.train[data-record="${rid}"] .car`); return g ? g.getAttribute('transform') : null; }, sel);
    const a = await pos(); await page.waitForTimeout(600); const b = await pos();
    if (a === null && b === null) check(true, 'arrival shares a platform with a standing train (no animation)');
    else check(a !== b, 'arrival train moves');
  }

  // Camera animation frame timing (headless gives a rough number only).
  const timing = await page.evaluate(() => new Promise((resolve) => {
    const times = [];
    const t0 = performance.now();
    document.querySelector('.frame-toggle').click();
    function tick(now) { times.push(now); if (now - t0 < 700) requestAnimationFrame(tick); else {
      let maxGap = 0; for (let i = 1; i < times.length; i++) maxGap = Math.max(maxGap, times[i] - times[i - 1]);
      resolve({ fps: Math.round(times.length / ((times[times.length - 1] - times[0]) / 1000)), maxGap: Math.round(maxGap) });
    } }
    requestAnimationFrame(tick);
  }));
  check(timing.maxGap < 120, `camera animation ~${timing.fps} fps, longest frame ${timing.maxGap} ms`);

  // Language: shell strings and scene labels.
  await page.click('.lang-switch');
  const lang = await page.evaluate(() => ({
    html: document.documentElement.lang,
    mode: document.querySelector('#mode button[data-mode="map"]').textContent,
    labels: Array.from(document.querySelectorAll('svg.scene text[data-en]')).every((n) => n.textContent === n.dataset.en),
    missing: document.querySelectorAll('svg.scene #layer-labels text:not([data-en])').length
  }));
  check(lang.html === 'en' && lang.mode === 'Map', 'language switches to English');
  check(lang.labels, 'scene labels switch to English');
  check(lang.missing === 0, `${lang.missing} scene label(s) without data-en`);
  await page.click('.lang-switch');

  // Theme.
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const before = await bg();
  await page.click('.theme-switch');
  await page.waitForTimeout(400);
  const after = await bg();
  const theme = await page.evaluate(() => document.documentElement.dataset.theme);
  check(theme === 'dark' && before !== after, 'theme switches to dark');

  // List mode and back.
  await page.click('#mode button[data-mode="list"]');
  check(await page.isVisible('#list') && await page.isHidden('#map'), 'list mode shows the list');
  await page.click('#mode button[data-mode="map"]');
  check(await page.isVisible('#map'), 'map mode shows the map');

  // Pick another departure.
  const beforeTo = await page.evaluate(() => new URLSearchParams(location.search).get('to'));
  const rows = page.locator('#dep-list .dep-row:not(.is-yours)');
  if (await rows.count()) {
    await rows.first().click();
    const afterTo = await page.evaluate(() => new URLSearchParams(location.search).get('to'));
    check(afterTo && afterTo !== beforeTo, 'tapping a departure moves "your train"');
  }

  check(errors.length === 0, errors.length ? 'browser errors: ' + errors.join(' | ') : 'no browser errors');
  await context.close();
  return out;
}

/* Toilets (SPEC 7): markers, the WC route, its URL and steps in both languages, list mode. */
async function smokeToilets(id, data) {
  const out = [];
  const check = (ok, msg) => out.push([!!ok, msg]);
  const toilets = (data.nodes || []).filter((n) => n.kind === 'toilet');
  if (!toilets.length) { check(data.no_toilets === true, 'no toilet nodes and no "no_toilets"'); return out; }
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const open = async (q) => { await page.goto(server.base + 'station.html?station=' + encodeURIComponent(id) + '&theme=light&' + q, { waitUntil: 'networkidle' }); await page.waitForFunction(() => document.documentElement.dataset.pjState === 'ready', null, { timeout: 10000 }); };
  await open('lang=nl');

  const markers = await page.evaluate(() => {
    const boxes = (sel) => Array.from(document.querySelectorAll(sel)).map((n) => n.getBoundingClientRect());
    const wc = boxes('#layer-wc .wc-marker'), badges = boxes('#layer-badges .badge-bg');
    const cover = wc.filter((a) => badges.some((b) => a.left < b.right - 0.5 && a.right > b.left + 0.5 && a.top < b.bottom - 0.5 && a.bottom > b.top + 0.5)).length;
    return { count: wc.length, cover, text: Array.from(document.querySelectorAll('#layer-wc .wc-text')).every((n) => n.textContent === 'WC') };
  });
  check(markers.count === toilets.length && markers.text, `${markers.count} WC marker(s) for ${toilets.length} toilet node(s)`);
  check(markers.cover === 0, `${markers.cover} WC marker(s) cover a platform badge`);

  // Switch on: route via a toilet, via=wc in the URL, the toilet stop in the steps.
  await page.click('.wc-switch');
  const on = await page.evaluate(() => {
    const s = window.Perronjoy.state;
    const li = Array.from(document.querySelectorAll('#steps li'));
    const stop = li.findIndex((n) => n.classList.contains('is-wc'));
    return {
      via: new URLSearchParams(location.search).get('via'), wc: s.route && s.route.wc, checked: document.querySelector('#wc-toggle').checked,
      stop, stopText: stop >= 0 ? li[stop].textContent : '', before: stop > 0 ? li[stop - 1].textContent : '', after: li.length - stop - 1,
      verdict: document.querySelector('#verdict').textContent, routeWc: document.querySelectorAll('#layer-route .route-wc').length,
      active: document.querySelectorAll('#layer-wc .wc-marker.is-active').length
    };
  });
  const wcNode = toilets.find((n) => n.id === on.wc);
  check(on.via === 'wc' && on.checked, 'WC switch puts via=wc in the URL');
  check(!!wcNode, `the route goes via toilet "${on.wc}"`);
  check(on.stop > 0 && /Toiletbezoek, ongeveer 3 min/.test(on.stopText) && on.after >= 1, 'steps: the toilet stop, then the way on');
  check(wcNode && on.before.includes(wcNode.label.nl), 'the step before the stop walks to the toilet by its label');
  check(/\+ 3 min toilet/.test(on.verdict), 'the verdict counts the 3-minute toilet stop');
  check(on.routeWc === 1 && on.active === 1, 'the toilet on the route is marked on the map');
  const notes = wcNode ? [wcNode.paid && 'Betaald toilet', wcNode.accessible && 'Rolstoeltoilet', wcNode.outside_gates && 'Buiten de poortjes'].filter(Boolean) : [];
  check(notes.every((n) => on.stopText.includes(n)), `the stop notes say: ${notes.join(', ') || 'nothing'}`);

  // List mode: a toilets section with every toilet.
  await page.click('#mode button[data-mode="list"]');
  const rows = await page.locator('#list .list-wc .wc-row').count();
  check(rows === toilets.length, `list mode shows ${rows} toilet row(s)`);
  await page.click('#mode button[data-mode="map"]');

  // Switch off again.
  await page.click('.wc-switch');
  const off = await page.evaluate(() => ({ via: new URLSearchParams(location.search).get('via'), stops: document.querySelectorAll('#steps li.is-wc').length }));
  check(off.via === null && off.stops === 0, 'WC switch off removes via and the toilet stop');

  // English, from the URL; and no next train: the nearest toilet.
  await open('lang=en&via=wc');
  const en = await page.evaluate(() => { const li = document.querySelector('#steps li.is-wc'); return { text: li ? li.textContent : '', checked: document.querySelector('#wc-toggle').checked }; });
  check(en.checked && /Toilet stop, about 3 min/.test(en.text), 'via=wc in the URL turns the route on, in English too');
  await open('lang=nl&via=wc&to=none');
  const only = await page.evaluate(() => { const s = window.Perronjoy.state; const li = Array.from(document.querySelectorAll('#steps li')); return { toWc: !!(s.route && s.route.toWc), last: li.length ? li[li.length - 1].className : '', to: new URLSearchParams(location.search).get('to') }; });
  check(only.toWc && /is-wc/.test(only.last) && only.to === 'none', 'to=none with via=wc: the route ends at the nearest toilet');

  check(errors.length === 0, errors.length ? 'browser errors: ' + errors.join(' | ') : 'no browser errors (toilets)');
  await context.close();
  return out;
}

/* Search and select (SPEC 4): type, pick with Enter or a tap, Escape brings the old choice back. */
async function smokeSearch(id) {
  const out = [];
  const check = (ok, msg) => out.push([!!ok, msg]);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(server.base + 'station.html?station=' + encodeURIComponent(id) + '&lang=nl&theme=light&motion=off', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.documentElement.dataset.pjState === 'ready', null, { timeout: 10000 });
  const url = (k) => page.evaluate((key) => new URLSearchParams(location.search).get(key), k);
  const state = () => page.evaluate(() => {
    const s = window.Perronjoy.state;
    const lab = (r) => String(r.platform) + (r.section || '');
    return { to: s.to && s.to.id, from: s.from && s.from.id, deps: s.departures.map((r) => ({ id: r.id, label: lab(r), platform: String(r.platform), dest: r.destination, number: r.train ? String(r.train.number) : '' })), arrs: s.arrivals.map((r) => ({ id: r.id, label: lab(r) })) };
  });
  const yours = () => page.evaluate(() => { const n = document.querySelector('svg.scene .platform.is-yours'); return n ? n.id : null; });
  const shownKeys = () => page.evaluate(() => Array.from(document.querySelectorAll('#list-to .combo-opt')).map((n) => n.dataset.key));
  const typeIn = async (sel, text) => { await page.click(sel); await page.keyboard.press('Control+A'); await page.keyboard.type(text, { delay: 5 }); };

  const st = await state();
  const fontPx = await page.evaluate(() => parseFloat(getComputedStyle(document.querySelector('#sel-to')).fontSize));
  check(fontPx >= 16, `search field text is ${fontPx}px (at least 16, so iOS does not zoom)`);
  await page.click('#sel-to');
  const opened = await page.evaluate(() => ({ expanded: document.querySelector('#sel-to').getAttribute('aria-expanded'), n: document.querySelectorAll('#list-to .combo-opt').length, role: document.querySelector('#sel-to').getAttribute('role') }));
  check(opened.role === 'combobox' && opened.expanded === 'true' && opened.n >= st.deps.length, `tapping the field opens the full list (${opened.n} options)`);
  await page.keyboard.press('Escape');

  // 1. A platform number picks the first departure there: URL, green platform, field.
  const d = st.deps.find((r) => r.id !== st.to && r.label !== (st.deps.find((x) => x.id === st.to) || {}).label);
  if (d) {
    const first = st.deps.find((r) => r.label === d.label);
    await typeIn('#sel-to', d.label);
    await page.keyboard.press('Enter');
    const y = await yours();
    check(await url('to') === first.id && y && y.startsWith('platform-' + first.platform), `typing "${d.label}" + Enter picks ${first.id}; platform ${first.platform} turns green`);
    check((await page.inputValue('#sel-to')).includes(d.label), 'the field shows the new choice');
  }
  // 2. "spoor 5" is "5", in both languages.
  if (d) {
    await typeIn('#sel-to', 'spoor ' + d.label); const a = (await shownKeys())[0];
    await typeIn('#sel-to', d.label); const b = (await shownKeys())[0];
    check(a && a === b, `"spoor ${d.label}" finds the same as "${d.label}"`);
    await page.keyboard.press('Escape');
  }
  // 3. A destination.
  const counts = {}; st.deps.forEach((r) => { counts[r.dest] = (counts[r.dest] || 0) + 1; });
  const e = st.deps.slice().reverse().find((r) => counts[r.dest] === 1 && r.id !== (d && d.id));
  if (e) {
    await typeIn('#sel-to', e.dest.toLowerCase());
    const keys = await shownKeys();
    await page.keyboard.press('Enter');
    check(keys[0] === e.id && await url('to') === e.id, `typing "${e.dest.toLowerCase()}" + Enter picks ${e.id}`);
  }
  // 4. A train number by prefix.
  const f = st.deps.find((r) => r.number && r.number.length >= 3);
  if (f) {
    await typeIn('#sel-to', f.number.slice(0, 2));
    check((await shownKeys()).includes(f.id), `typing "${f.number.slice(0, 2)}" finds train ${f.number}`);
    await page.keyboard.press('Escape');
  }
  // 5. No result, then Escape restores the previous choice.
  const before = { to: await url('to'), text: await page.inputValue('#sel-to') };
  await typeIn('#sel-to', 'zzqx');
  const empty = await page.evaluate(() => { const n = document.querySelector('#list-to .combo-empty'); return n ? n.textContent : ''; });
  check(empty === 'Geen resultaat', 'no match shows "Geen resultaat"');
  await page.keyboard.press('Escape');
  const after = await page.evaluate(() => ({ hidden: document.querySelector('#list-to').hidden, value: document.querySelector('#sel-to').value, expanded: document.querySelector('#sel-to').getAttribute('aria-expanded') }));
  check(after.hidden && after.expanded === 'false' && after.value === before.text && await url('to') === before.to, 'Escape closes the list and brings the previous choice back');
  // 6. Keyboard: Home, End, ArrowDown; the active platform gets a quiet outline on the map.
  await page.click('#sel-to');
  await page.keyboard.press('End');
  const endId = await page.evaluate(() => { const ids = Array.from(document.querySelectorAll('#list-to .combo-opt')).map((n) => n.id); return { last: ids[ids.length - 1], act: document.querySelector('#sel-to').getAttribute('aria-activedescendant') }; });
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowDown');
  const down = await page.evaluate(() => ({ act: document.querySelector('#sel-to').getAttribute('aria-activedescendant'), preview: document.querySelectorAll('svg.scene .preview').length, sel: document.querySelectorAll('#list-to [aria-selected="true"]').length }));
  check(endId.act === endId.last && down.act === 'opt-to-1' && down.sel === 1, 'End, Home and ArrowDown move the active option');
  check(down.preview === 1, 'the active option\'s platform has a preview outline');
  await page.keyboard.press('Escape');
  check(await page.evaluate(() => document.querySelectorAll('svg.scene .preview').length) === 0, 'the preview goes away when the list closes');
  // 7. Mouse and touch: tap the open button, then an option.
  await page.click('#combo-to .combo-open');
  const opt = page.locator('#list-to .combo-opt:not(.is-current)').nth(1);
  const key = await opt.getAttribute('data-key');
  await opt.click();
  check(await url('to') === key && await page.evaluate(() => document.querySelector('#list-to').hidden), `tapping an option picks it (${key})`);
  // 8. The arrival field works the same way.
  await page.click('#sel-from');
  const fromOpts = await page.evaluate(() => Array.from(document.querySelectorAll('#list-from .combo-opt')).map((n) => ({ key: n.dataset.key, label: n.querySelector('.pf b').textContent, current: n.classList.contains('is-current') })));
  await page.keyboard.press('Escape');
  const curLabel = (fromOpts.find((o) => o.current) || {}).label;
  const target = fromOpts.find((o) => o.label !== curLabel);
  if (target) {
    await typeIn('#sel-from', target.label);
    await page.keyboard.press('Enter');
    check(await url('from') === target.key, `typing "${target.label}" in the arrival field picks ${target.key}`);
  }
  // 9. English: "platform 5" is "5" too.
  await page.click('.lang-switch');
  if (d) {
    await typeIn('#sel-to', 'platform ' + d.label); const a = (await shownKeys())[0];
    await typeIn('#sel-to', d.label); const b = (await shownKeys())[0];
    const ph = await page.getAttribute('#sel-to', 'placeholder');
    check(a && a === b && ph === 'Search platform, train or place', 'English: "platform N" works, placeholder in English');
    await page.keyboard.press('Escape');
  }
  check(errors.length === 0, errors.length ? 'browser errors: ' + errors.join(' | ') : 'no browser errors (search)');
  await context.close();
  return out;
}
