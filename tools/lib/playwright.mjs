/* Finds Playwright (local, global or the cloud image) and launches Chromium. */
import { createRequire } from 'node:module';

export async function launchChromium() {
  const require = createRequire(import.meta.url);
  let chromium = null;
  for (const name of ['playwright', 'playwright-core', '/opt/node-tools/node_modules/playwright', '/usr/local/lib/node_modules/playwright']) {
    try { chromium = require(name).chromium; break; } catch (e) { /* try the next one */ }
  }
  if (!chromium) throw new Error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium');
  const tries = [{}, { executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] }];
  if (process.env.PLAYWRIGHT_CHROMIUM) tries.unshift({ executablePath: process.env.PLAYWRIGHT_CHROMIUM });
  let last;
  for (const opts of tries) { try { return await chromium.launch(opts); } catch (e) { last = e; } }
  throw new Error('Could not launch Chromium: ' + (last && last.message));
}
