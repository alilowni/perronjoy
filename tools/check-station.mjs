#!/usr/bin/env node
/* Perronjoy — station checker.
   Usage:  node tools/check-station.mjs <station-id>   (for example: utrecht-centraal)
           node tools/check-station.mjs --all
   Checks site/stations/<id>/station.json and scene.svg against SPEC.md.
   Exit code 1 when there is at least one ERROR. Warnings do not fail. */

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STATIONS = join(ROOT, 'site', 'stations');
const LIMITS = { svgKB: 150, jsonKB: 60 };
const NODE_KINDS = ['platform', 'stairs', 'escalator', 'lift', 'ramp', 'passage', 'hall', 'exit', 'waypoint'];
const EDGE_KINDS = ['walk', 'stairs', 'escalator', 'lift', 'ramp'];
const STATUSES = ['placeholder', 'draft', 'ready'];

const args = process.argv.slice(2);
if (!args.length) { console.error('Usage: node tools/check-station.mjs <station-id> | --all'); process.exit(2); }
const ids = args.includes('--all')
  ? readdirSync(STATIONS).filter((d) => statSync(join(STATIONS, d)).isDirectory())
  : args;

let failed = false;
for (const id of ids) {
  const result = checkStation(id);
  console.log(`\n== ${id} ==`);
  result.errors.forEach((e) => console.log('  ERROR  ' + e));
  result.warnings.forEach((w) => console.log('  WARN   ' + w));
  result.info.forEach((i) => console.log('  ok     ' + i));
  if (result.errors.length) failed = true;
  console.log(`  ${result.errors.length} error(s), ${result.warnings.length} warning(s)`);
}
process.exit(failed ? 1 : 0);

function checkStation(id) {
  const errors = [], warnings = [], info = [];
  const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
  const dir = join(STATIONS, id);
  if (!existsSync(dir)) { err(`folder site/stations/${id} does not exist`); return { errors, warnings, info }; }

  /* ---- station.json ---- */
  const jsonPath = join(dir, 'station.json');
  if (!existsSync(jsonPath)) { err('station.json is missing'); return { errors, warnings, info }; }
  let data;
  try { data = JSON.parse(readFileSync(jsonPath, 'utf8')); } catch (e) { err('station.json is not valid JSON: ' + e.message); return { errors, warnings, info }; }
  const jsonKB = statSync(jsonPath).size / 1024;
  if (jsonKB > LIMITS.jsonKB) err(`station.json is ${jsonKB.toFixed(0)} KB, limit ${LIMITS.jsonKB} KB`);

  if (data.id !== id) err(`"id" must be "${id}" (found "${data.id}")`);
  if (!data.name || typeof data.name !== 'string') err('"name" is missing');
  if (!STATUSES.includes(data.status)) err(`"status" must be one of ${STATUSES.join(', ')}`);
  if (data.status === 'placeholder') { info.push('placeholder station: nothing more to check'); return { errors, warnings, info }; }

  const bilingual = (v, where) => {
    if (v == null || typeof v !== 'object' || typeof v.nl !== 'string' || typeof v.en !== 'string' || !v.nl.trim() || !v.en.trim()) err(`${where} must be {"nl": "...", "en": "..."}`);
  };
  if (!data.orientation || typeof data.orientation.north_deg !== 'number') err('"orientation.north_deg" must be a number (degrees clockwise from screen-up to true north)');
  ['top', 'bottom'].forEach((end) => {
    if (!data.ends || !data.ends[end]) err(`"ends.${end}" is missing`);
    else bilingual(data.ends[end].towards, `"ends.${end}.towards"`);
  });

  const levels = Array.isArray(data.levels) ? data.levels : [];
  if (!levels.some((l) => l.id === 'platform' && Number(l.position) === 0)) err('"levels" must contain {"id": "platform", "position": 0}');
  levels.forEach((l) => { if (typeof l.position !== 'number') err(`level "${l.id}" needs a numeric "position" (0 platform, 1 above, -1 below)`); });
  const levelIds = new Set(levels.map((l) => l.id));

  const platforms = Array.isArray(data.platforms) ? data.platforms : [];
  if (!platforms.length) err('"platforms" is empty');
  const platformIds = new Set();
  platforms.forEach((p) => {
    if (!/^\d+$/.test(String(p.id))) err(`platform id "${p.id}" must be a number as a string, for example "5"`);
    if (platformIds.has(String(p.id))) err(`platform "${p.id}" appears twice`);
    platformIds.add(String(p.id));
    (p.sections || []).forEach((s) => { if (!/^[a-z]$/.test(String(s))) err(`platform "${p.id}" has a section "${s}" that is not one lowercase letter`); });
  });

  const nodes = Array.isArray(data.nodes) ? data.nodes : [];
  const nodeMap = {};
  nodes.forEach((n) => {
    if (!n.id || !/^[A-Za-z0-9_-]+$/.test(n.id)) err(`node id "${n.id}" must be letters, digits, - or _`);
    if (nodeMap[n.id]) err(`node "${n.id}" appears twice`);
    nodeMap[n.id] = n;
    if (!NODE_KINDS.includes(n.kind)) err(`node "${n.id}" has unknown kind "${n.kind}" (allowed: ${NODE_KINDS.join(', ')})`);
    if (n.level && !levelIds.has(n.level)) err(`node "${n.id}" uses level "${n.level}" that is not in "levels"`);
    if (n.kind === 'platform') {
      if (!platformIds.has(String(n.platform))) err(`platform node "${n.id}" points to unknown platform "${n.platform}"`);
      const expected = 'p' + n.platform + (n.section || '');
      if (n.id !== expected) err(`platform node "${n.id}" must have id "${expected}"`);
    } else if (n.kind !== 'waypoint') {
      bilingual(n.label, `node "${n.id}" label`);
      if (['stairs', 'escalator', 'lift', 'ramp'].includes(n.kind) && n.level === 'platform' && !n.short) warn(`node "${n.id}" has no "short" label (for example {"nl": "spoor 5", "en": "platform 5"}); the stairs label is used when you arrive by stairs`);
      if (n.short) bilingual(n.short, `node "${n.id}" short`);
    }
  });
  platforms.forEach((p) => {
    const secs = p.sections && p.sections.length ? p.sections : [''];
    secs.forEach((s) => { const want = 'p' + p.id + s; if (!nodeMap[want]) err(`platform "${p.id}" needs a node with id "${want}"`); });
  });

  const edges = Array.isArray(data.edges) ? data.edges : [];
  const adj = {};
  edges.forEach((e, i) => {
    if (!nodeMap[e.from]) err(`edge ${i} "from" node "${e.from}" does not exist`);
    if (!nodeMap[e.to]) err(`edge ${i} "to" node "${e.to}" does not exist`);
    if (!EDGE_KINDS.includes(e.kind)) err(`edge ${i} (${e.from}→${e.to}) has unknown kind "${e.kind}" (allowed: ${EDGE_KINDS.join(', ')})`);
    if (typeof e.seconds !== 'number' || e.seconds <= 0) err(`edge ${i} (${e.from}→${e.to}) needs "seconds" > 0`);
    if (nodeMap[e.from] && nodeMap[e.to]) {
      const lu = levelPos(levels, nodeMap[e.from].level), lv = levelPos(levels, nodeMap[e.to].level);
      if (e.kind === 'walk' && lu !== lv) err(`edge ${i} (${e.from}→${e.to}) is a walk between different levels; use stairs, escalator, lift or ramp`);
      if (e.kind !== 'walk' && lu === lv) warn(`edge ${i} (${e.from}→${e.to}) is "${e.kind}" but both nodes are on the same level`);
      (adj[e.from] = adj[e.from] || []).push(e.to);
      (adj[e.to] = adj[e.to] || []).push(e.from);
    }
  });
  // connectivity: every platform node must reach every other platform node
  const platformNodes = nodes.filter((n) => n.kind === 'platform').map((n) => n.id);
  if (platformNodes.length > 1) {
    const seen = new Set([platformNodes[0]]), stack = [platformNodes[0]];
    while (stack.length) { const u = stack.pop(); (adj[u] || []).forEach((v) => { if (!seen.has(v)) { seen.add(v); stack.push(v); } }); }
    platformNodes.forEach((p) => { if (!seen.has(p)) err(`platform node "${p}" cannot be reached from "${platformNodes[0]}" by walking`); });
  }

  /* ---- arrivals / departures ---- */
  const checkRecord = (r, where, isDep) => {
    if (!r.id) err(`${where} needs an "id"`);
    if (!platformIds.has(String(r.platform))) err(`${where} uses unknown platform "${r.platform}"`);
    const p = platforms.find((x) => String(x.id) === String(r.platform));
    if (p && p.sections && p.sections.length && r.section && !p.sections.includes(r.section)) err(`${where} section "${r.section}" is not a section of platform ${r.platform}`);
    if (p && p.sections && p.sections.length && !r.section) warn(`${where} has no "section" but platform ${r.platform} has sections; the first section is used`);
    const endKey = isDep ? 'to_end' : 'from_end';
    if (!['top', 'bottom'].includes(r[endKey])) err(`${where} needs "${endKey}": "top" or "bottom"`);
    if (typeof r.in_min !== 'number') err(`${where} needs a numeric "in_min"`);
    if (!r.train || !r.train.type) warn(`${where} has no train type`);
    if (isDep) {
      if (!r.destination) err(`${where} needs a "destination"`);
      if (!['on_time', 'delayed'].includes(r.status)) err(`${where} status must be "on_time" or "delayed"`);
      if (r.status === 'delayed' && !(r.delay_min > 0)) err(`${where} is delayed but "delay_min" is not > 0`);
    } else if (!r.origin) warn(`${where} has no "origin"`);
    if (r.length_m != null && (r.length_m < 40 || r.length_m > 420)) warn(`${where} length_m ${r.length_m} looks wrong (40–420 expected)`);
  };
  const arrivals = Array.isArray(data.arrivals) ? data.arrivals : [];
  const departures = Array.isArray(data.departures) ? data.departures : [];
  if (!arrivals.length) err('"arrivals" needs at least one record');
  if (departures.length < 4) err('"departures" needs at least 4 records');
  arrivals.forEach((r, i) => checkRecord(r, `arrival ${i} (${r.id || '?'})`, false));
  departures.forEach((r, i) => checkRecord(r, `departure ${i} (${r.id || '?'})`, true));
  const depIds = new Set();
  [...arrivals, ...departures].forEach((r) => { if (depIds.has(r.id)) err(`record id "${r.id}" is used twice`); depIds.add(r.id); });
  const usedPlatforms = new Set(departures.map((r) => String(r.platform)));
  if (departures.some((r) => arrivals.some((a) => String(a.platform) === String(r.platform) && a.section === r.section))) warn('a departure stands on the same platform section as the arrival; the arriving train will not be animated for it');
  if (usedPlatforms.size === 1) warn('all departures use the same platform; the demo transfer will be boring');
  if (!Array.isArray(data.sources) || !data.sources.length) err('"sources" must list at least one source');

  /* ---- scene.svg ---- */
  const svgPath = join(dir, 'scene.svg');
  if (!existsSync(svgPath)) { err('scene.svg is missing'); return { errors, warnings, info }; }
  const svg = readFileSync(svgPath, 'utf8');
  const svgKB = statSync(svgPath).size / 1024;
  if (svgKB > LIMITS.svgKB) err(`scene.svg is ${svgKB.toFixed(0)} KB, limit ${LIMITS.svgKB} KB`);
  if (!/<svg[^>]*viewBox="[^"]+"/.test(svg)) err('scene.svg needs a viewBox on the <svg> element');
  if (/<script/i.test(svg)) err('scene.svg must not contain <script>');
  if (/<image/i.test(svg)) err('scene.svg must not contain raster <image> elements');
  if (/href="https?:/i.test(svg)) err('scene.svg must not reference external URLs');
  if (/<style/i.test(svg)) warn('scene.svg contains <style>; shared colours come from site/css/site.css, keep local styles minimal');
  ['layer-ground', 'layer-tracks', 'layer-platforms', 'layer-nodes'].forEach((l) => { if (!new RegExp(`id="${l}"`).test(svg)) err(`scene.svg needs a group with id="${l}"`); });
  const ids = new Set(); for (const m of svg.matchAll(/\sid="([^"]+)"/g)) { if (ids.has(m[1])) err(`duplicate id "${m[1]}" in scene.svg`); ids.add(m[1]); }
  platforms.forEach((p) => {
    if (!new RegExp(`<path[^>]*id="track-${p.id}"`).test(svg) && !new RegExp(`id="track-${p.id}"[^>]*>`).test(svg)) err(`scene.svg needs <path id="track-${p.id}">`);
    if (!new RegExp(`<rect[^>]*id="platform-${p.id}"`).test(svg) && !new RegExp(`id="platform-${p.id}"[^>]*/?>`).test(svg)) err(`scene.svg needs <rect id="platform-${p.id}" class="platform">`);
  });
  const circles = {};
  for (const m of svg.matchAll(/<circle([^>]*)\/?>/g)) {
    const attrs = m[1];
    const idm = attrs.match(/\sid="node-([^"]+)"/); if (!idm) continue;
    const cx = attrs.match(/\scx="([-\d.]+)"/), cy = attrs.match(/\scy="([-\d.]+)"/);
    if (!cx || !cy) { err(`node circle "node-${idm[1]}" needs plain cx and cy attributes`); continue; }
    circles[idm[1]] = { x: parseFloat(cx[1]), y: parseFloat(cy[1]) };
  }
  nodes.forEach((n) => { if (!circles[n.id]) err(`scene.svg needs <circle id="node-${n.id}" cx=".." cy=".."> for node "${n.id}"`); });
  Object.keys(circles).forEach((k) => { if (!nodeMap[k]) warn(`scene.svg has node-${k} that station.json does not use`); });
  for (const m of svg.matchAll(/<g[^>]*id="layer-[^"]+"[^>]*transform=/g)) err(`layer group has a transform attribute: ${m[0].slice(0, 60)}… (not allowed)`);
  edges.forEach((e, i) => {
    const a = circles[e.from], b = circles[e.to];
    if (!a || !b || e.kind !== 'walk') return;
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    const speed = dist / e.seconds;
    if (speed > 2.2) warn(`edge ${i} (${e.from}→${e.to}) implies ${speed.toFixed(1)} units/s over ${dist.toFixed(0)} units; walking is about 1.0–1.4 m/s`);
    if (speed < 0.3 && dist > 10) warn(`edge ${i} (${e.from}→${e.to}) is slow: ${speed.toFixed(2)} units/s over ${dist.toFixed(0)} units`);
  });
  if (/<text[^>]*>\s*(lorem|ipsum|todo|xxx)/i.test(svg)) err('scene.svg contains placeholder text');

  /* ---- NOTES.md ---- */
  if (id !== '_template' && !existsSync(join(dir, 'NOTES.md'))) err('NOTES.md is missing (sources and VERIFY list)');

  info.push(`station.json ${jsonKB.toFixed(0)} KB, scene.svg ${svgKB.toFixed(0)} KB`);
  info.push(`${platforms.length} platforms, ${nodes.length} nodes, ${edges.length} edges, ${arrivals.length} arrivals, ${departures.length} departures`);
  return { errors, warnings, info };
}

function levelPos(levels, levelId) {
  const l = levels.find((x) => x.id === (levelId || 'platform'));
  return l ? Number(l.position) : 0;
}
