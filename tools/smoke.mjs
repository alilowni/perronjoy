#!/usr/bin/env node
/* Perronjoy — browser smoke test.
   Usage:  node tools/smoke.mjs [station-id ...]   (no id: the template and every listed station)
   Opens each ready or draft station in headless Chromium with motion on and checks:
   no browser errors, a route with steps, the green platform, a moving arrival
   train, smooth camera frames, language switch (also scene labels), theme switch,
   list mode, and picking another departure. Placeholder stations are skipped.
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
  const results = await smoke(id);
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
