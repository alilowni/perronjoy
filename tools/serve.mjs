#!/usr/bin/env node
/* Serve site/ on http://localhost:8000 (or the port you pass). Usage: npm run serve [-- 8080] */
import { startServer } from './lib/server.mjs';
const port = Number(process.argv[2]) || 8000;
const { base } = await startServer(port, '0.0.0.0');
console.log('Perronjoy is running at ' + base.replace('0.0.0.0', 'localhost'));
console.log('Template station: ' + base.replace('0.0.0.0', 'localhost') + 'station.html?station=_template');
