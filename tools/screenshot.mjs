#!/usr/bin/env node
/* Perronjoy — screenshot tool.
   Usage:  node tools/screenshot.mjs <station-id> [--from <key>] [--to <key>] [--lang nl|en] [--scale 2]
           node tools/screenshot.mjs index
   Starts a small static server for site/, opens the page in headless Chromium
   (Playwright) and writes PNG files to tools/out/. Animations are switched off
   with ?motion=off so the screenshot is stable.
   Playwright must be installed on the machine (it is in the Claude cloud environment). */

import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const OUT = join(ROOT, 'tools', 'out');
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--')) || 'index';
const opt = (name, def) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : def; };
const lang = opt('lang', 'nl'), from = opt('from', ''), to = opt('to', ''), scale = Number(opt('scale', '1'));

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(SITE, path));
    res.writeHead(200, { 'content-type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch (e) { res.writeHead(404); res.end('not found'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}/`;

let chromium;
try { chromium = loadPlaywright().chromium; }
catch (e) { console.error('Playwright is not available: ' + e.message); server.close(); process.exit(2); }

function loadPlaywright() {
  // CommonJS require honours NODE_PATH and global installs; ESM import does not.
  const require = createRequire(import.meta.url);
  const candidates = ['playwright', 'playwright-core', '/opt/node-tools/node_modules/playwright', '/usr/local/lib/node_modules/playwright'];
  for (const c of candidates) { try { return require(c); } catch (e) { /* try the next one */ } }
  throw new Error('install it with: npm i -D playwright  (then: npx playwright install chromium)');
}

const launchOpts = {};
if (process.env.PLAYWRIGHT_CHROMIUM) launchOpts.executablePath = process.env.PLAYWRIGHT_CHROMIUM;
let browser;
try { browser = await chromium.launch(launchOpts); }
catch (e) { try { browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] }); } catch (e2) { console.error('Could not launch Chromium: ' + e2.message); server.close(); process.exit(2); } }

await mkdir(OUT, { recursive: true });
const query = new URLSearchParams({ motion: 'off', lang });
let url;
if (id === 'index') url = base + 'index.html?' + query;
else { query.set('station', id); if (from) query.set('from', from); if (to) query.set('to', to); url = base + 'station.html?' + query; }

const shots = [
  { name: 'phone', viewport: { width: 390, height: 844 }, full: true },
  { name: 'desktop', viewport: { width: 1280, height: 800 }, full: false },
  { name: 'desktop-wide', viewport: { width: 1440, height: 900 }, full: false }
];
const errors = [];
for (const shot of shots) {
  const context = await browser.newContext({ viewport: shot.viewport, deviceScaleFactor: scale, locale: lang === 'en' ? 'en-GB' : 'nl-NL' });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(`[${shot.name}] page error: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${shot.name}] console: ${m.text()}`); });
  await page.goto(url, { waitUntil: 'networkidle' });
  if (id !== 'index') {
    await page.waitForFunction(() => document.documentElement.dataset.pjState, null, { timeout: 10000 }).catch(() => errors.push(`[${shot.name}] page did not reach a ready state`));
  }
  await page.waitForTimeout(300);
  const file = join(OUT, `${id}-${lang}-${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: shot.full });
  console.log('wrote ' + file);
  if (id !== 'index' && shot.name === 'phone') {
    const listBtn = page.locator('#mode button[data-mode="list"]');
    if (await listBtn.count() && await listBtn.isVisible()) {
      await listBtn.click();
      await page.waitForTimeout(200);
      const f2 = join(OUT, `${id}-${lang}-phone-list.png`);
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
