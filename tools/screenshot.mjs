#!/usr/bin/env node
/* Perronjoy — screenshots of one page at phone and desktop size.
   Usage:  node tools/screenshot.mjs <station-id|index> [--from <key>] [--to <key>]
                [--via wc] [--open from|to] [--search <text>]
                [--lang nl|en] [--theme light|dark] [--scale 1|2]
   Writes PNG files to tools/out/ (ignored by git). Animations are off.
   --open also writes <name>-open.png per size: the search list of that field,
   open, after typing --search when given. */

import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { startServer, ROOT } from './lib/server.mjs';
import { launchChromium } from './lib/playwright.mjs';

const OUT = join(ROOT, 'tools', 'out');
const args = process.argv.slice(2);
const id = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--'))) || 'index';
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : def; };
const lang = opt('lang', 'nl'), theme = opt('theme', 'light'), from = opt('from', ''), to = opt('to', ''), via = opt('via', ''), openField = opt('open', ''), search = opt('search', ''), scale = Number(opt('scale', '1'));

const server = await startServer();
let browser;
try { browser = await launchChromium(); }
catch (e) { console.error(e.message); server.close(); process.exit(2); }

await mkdir(OUT, { recursive: true });
const query = new URLSearchParams({ motion: 'off', lang, theme });
let url;
if (id === 'index') url = server.base + 'index.html?' + query;
else { query.set('station', id); if (from) query.set('from', from); if (to) query.set('to', to); if (via) query.set('via', via); url = server.base + 'station.html?' + query; }

const shots = [
  { name: 'phone', viewport: { width: 390, height: 844 }, full: true },
  { name: 'desktop', viewport: { width: 1280, height: 800 }, full: false },
  { name: 'desktop-wide', viewport: { width: 1440, height: 900 }, full: false }
];
const tag = [id, lang, theme === 'dark' ? 'dark' : null, from || to ? `${from || 'x'}-${to || 'x'}` : null, via ? 'via-' + via : null].filter(Boolean).join('-');
const errors = [];
for (const shot of shots) {
  const context = await browser.newContext({ viewport: shot.viewport, deviceScaleFactor: scale });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(`[${shot.name}] page error: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${shot.name}] console: ${m.text()}`); });
  await page.goto(url, { waitUntil: 'networkidle' });
  if (id !== 'index') await page.waitForFunction(() => document.documentElement.dataset.pjState, null, { timeout: 10000 }).catch(() => errors.push(`[${shot.name}] page did not reach a ready state`));
  await page.waitForTimeout(250);
  const file = join(OUT, `${tag}-${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: shot.full });
  console.log('wrote ' + file);
  if (id !== 'index' && (openField === 'from' || openField === 'to')) {
    await page.focus('#sel-' + openField);
    if (search) await page.keyboard.type(search, { delay: 15 });
    await page.waitForTimeout(300);
    const f3 = join(OUT, `${tag}-${shot.name}-open${search ? '-' + search.replace(/[^a-z0-9]+/gi, '_') : ''}.png`);
    await page.screenshot({ path: f3 });
    console.log('wrote ' + f3);
    await page.keyboard.press('Escape');
    await page.locator('#sel-' + openField).blur();
  }
  if (id !== 'index' && shot.name === 'phone') {
    const listBtn = page.locator('#mode button[data-mode="list"]');
    if (await listBtn.count() && await listBtn.isVisible()) {
      await listBtn.click();
      await page.waitForTimeout(150);
      const f2 = join(OUT, `${tag}-phone-list.png`);
      await page.screenshot({ path: f2, fullPage: true });
      console.log('wrote ' + f2);
    }
  }
  await context.close();
}
await browser.close();
server.close();
if (errors.length) { console.log('\nBrowser reported problems:'); errors.forEach((e) => console.log('  ' + e)); process.exit(1); }
console.log('no browser errors');
