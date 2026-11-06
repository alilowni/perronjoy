/* Tiny static file server for site/. Used by serve, screenshot and smoke. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SITE = join(ROOT, 'site');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.md': 'text/plain; charset=utf-8'
};

export async function startServer(port = 0, host = '127.0.0.1') {
  const server = createServer(async (req, res) => {
    let path;
    try { path = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
    catch (e) { res.writeHead(400); res.end('bad request'); return; } // broken percent-encoding must not stop the server
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(SITE, path));
    if (!file.startsWith(SITE)) { res.writeHead(403); res.end('forbidden'); return; }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' });
      res.end(body);
    } catch (e) { res.writeHead(404); res.end('not found'); }
  });
  await new Promise((resolve) => server.listen(port, host, resolve));
  return { base: `http://${host}:${server.address().port}/`, close: () => server.close() };
}
