# Perronjoy — station contract

This file is the contract between the shared site and every station. Four
people or agents build four stations on four branches. The branches merge into
`main`. The work only merges cleanly and looks like one product when every
station follows this file. Read it fully before you start a station.

If something here is unclear, choose the simplest reading and write your choice
in your station's `NOTES.md`. Do not change this file on a station branch.

---

## 1. What the product does

Perronjoy helps a traveller with a short transfer. The traveller arrives on
one platform and must reach another platform in a few minutes. The page shows:

1. A clear, realistic map of the station, seen from above, tracks vertical.
2. The train the traveller arrives with, coming in from the correct end.
3. The platform the traveller must reach, highlighted in green.
4. A walking route drawn on the map, with short written steps.
5. A verdict: comfortable, tight, or very tight, based on walking time.

Version 1 uses sample data. The URL `station.html?station=<id>&from=<platform>&to=<platform>`
already works with plain platform numbers, so a later version can fill it from
a live feed (for example the NS API) without changing the stations.

## 2. Who edits what

| Path | Owner | Station branches may edit? |
|---|---|---|
| `site/stations/<your-station>/` | the station builder | **yes, only this folder** |
| `site/index.html`, `site/station.html` | shared shell | no |
| `site/css/site.css`, `site/js/*.js` | shared shell | no |
| `site/stations/index.json` | shared shell (already lists all four stations) | no |
| `site/stations/_template/` | shared example | no |
| `tools/`, `SPEC.md`, `README.md`, `prompts/` | shared | no |

If the shared shell has a bug that blocks you, do not fix it on your branch.
Describe it in your `NOTES.md` under "Shell issues" and in your final message.
Work around it inside your folder when you can.

## 3. A station folder

```
site/stations/<id>/
  station.json   facts, walking graph, sample arrivals and departures
  scene.svg      the drawing
  NOTES.md       sources, what is verified, what is marked VERIFY, decisions
```

`<id>` is fixed: `utrecht-centraal`, `amsterdam-centraal`, `rotterdam-centraal`,
`schiphol-airport`. The folders already exist with a placeholder `station.json`.
Replace it.

Start from `site/stations/_template/`. It is a small fictional station that
follows every rule. Open it in the site to see what the shell does with it.

## 4. What the shell draws for you

You do **not** draw these. The shared script adds them from your files:

- Ballast, sleepers and rails for every track, from your centreline paths.
- Platform number badges on every platform.
- Tiny people on the platforms.
- Trains, standing at the right place and moving in or out.
- The walking route, its step markers, and the start and end markers.
- The green "your platform" and blue "arrival platform" highlight.
- The fog at the top and bottom, the north arrow, the "towards …" labels.
- The transfer panel, the step list, the departures list, list mode, languages.

You draw only the station itself: ground, surroundings, platform surfaces,
track centrelines, passages, buildings, stairs marks, labels, and the invisible
walking nodes.

## 5. scene.svg

### 5.1 Coordinates

- One `<svg>` with a `viewBox="0 0 W H"`. No `width`/`height` attributes.
- **1 unit ≈ 1 metre along the tracks.** A 300 m platform is 300 units long.
- **Across the tracks you may widen for legibility.** Keep track centrelines at
  least **10 units** apart and platform surfaces at least **16 units** wide.
  State your across-track factor in `NOTES.md` (for example "widths ×1.6").
- Tracks run **from the top of the scene to the bottom**. Every track path is
  drawn in that direction (first point at the top).
- **Platform numbers increase from left to right.** Rotate the real station to
  make this true. Then set `orientation.north_deg` in `station.json`: the
  angle in degrees, clockwise, from screen-up to true north. Example: if north
  points to the right of the screen, `north_deg` is `90`.
- Put about 30–60 units of surroundings around the platforms. The scene should
  show the real shape of the station: where the hall is, which side is the
  city, where the passages run.

### 5.2 Layers (ids and order are fixed)

```
<g id="layer-ground">      ground rect, city blocks, water, trees
<g id="layer-passages">    tunnels and passages BELOW the platforms
<g id="layer-tracks">      track centrelines, invisible, id="track-N"
<g id="layer-platforms">   platform rects, id="platform-N"
<g id="layer-buildings">   station building, halls, bridges ABOVE the platforms, stairs marks
<g id="layer-labels">      text labels
<g id="layer-nodes">       invisible circles for the walking graph, id="node-ID"
```

Rules:

- No `transform` attribute on any layer group, platform rect, or node circle.
  The shell reads plain coordinates.
- A platform (Dutch: *spoor*, one number) is **one `<rect>`** with
  `id="platform-N"` and `class="platform"`. An island platform with two
  numbers is two rects that touch. Example: platform 5 and 7 share an island
  → `platform-5` is the left half, `platform-7` is the right half, no gap.
- Optional section rects: `id="platform-5a"` and `id="platform-5b"` inside
  the platform rect area, same class. If present, the shell highlights the
  section instead of the whole platform.
- A track centreline is **one `<path>`** with `id="track-N"`, one per platform
  number, running the full height of the scene. Keep it next to its platform.
  Tracks that have no platform may be drawn as `<path id="track-x-N">` with any
  id that does not match `track-N` of a platform; the shell draws rails for
  every path whose id starts with `track-`.
- Node circles: `<circle id="node-ID" cx=".." cy=".." r="1"/>`. The id after
  `node-` must match a node in `station.json`.
- Use the classes below. Colours come from `site/css/site.css` so every
  station matches. Do not add `fill`/`stroke` attributes to elements that have
  a class, except for small extra detail that has no class.

| class | use |
|---|---|
| `ground` | one full-size rect |
| `block` | city blocks and other low surroundings |
| `water` | canals, the IJ, harbours |
| `tree` | a circle |
| `platform` | platform rects |
| `passage` | tunnels and passages below the platforms (dashed outline) |
| `passage passage--above` | a hall or bridge above the platforms |
| `building` | station buildings |
| `stairs` and `stairs-line` | a small rect and white lines marking stairs or escalators |
| `label` and `label label--muted` | text; set `font-size` in scene units (3–6) |

- Allowed: `<rect>`, `<path>`, `<circle>`, `<ellipse>`, `<line>`, `<polygon>`,
  `<polyline>`, `<text>`, `<g>`, `<defs>` with gradients.
- Not allowed: `<script>`, `<image>`, `<foreignObject>`, external URLs,
  fonts, filters heavier than a simple blur, raster data.
- All text is real words in Dutch (the language of the signs). No lorem ipsum.
- No railway logos, no brand colours, no copyrighted map tiles.
- **Size limit: 150 KB.** Keep paths simple. Round coordinates to one decimal.

## 6. station.json

Every field, with its meaning. Look at `_template/station.json` for a full
example.

```jsonc
{
  "id": "utrecht-centraal",          // must equal the folder name
  "name": "Utrecht Centraal",        // official station name
  "city": "Utrecht",
  "status": "ready",                 // "draft" while working, "ready" when done

  "orientation": { "north_deg": 0 }, // see 5.1

  "ends": {                          // what lies beyond each end of the tracks
    "top":    { "towards": { "nl": "Amsterdam, Amersfoort", "en": "Amsterdam, Amersfoort" } },
    "bottom": { "towards": { "nl": "...", "en": "..." } }
  },

  "levels": [                        // position: 0 = platform level, 1 = above, -1 = below
    { "id": "platform", "label": { "nl": "perron", "en": "platform" }, "position": 0 },
    { "id": "hall",     "label": { "nl": "stationshal", "en": "station hall" }, "position": 1 }
  ],

  "platforms": [                     // every platform number that has a platform, in order
    { "id": "5", "sections": ["a", "b"] },
    { "id": "7" }                    // no sections
  ],

  "nodes": [ ... ],                  // walking graph, see 7
  "edges": [ ... ],

  "arrivals":   [ ... ],             // sample data, see 8
  "departures": [ ... ],

  "sources": [ "..." ]               // short list; details go in NOTES.md
}
```

Platform ids are numbers written as strings: `"5"`, `"12"`. Sections are
single lowercase letters.

## 7. The walking graph

The route is computed by the shell with a shortest-path search over your
nodes and edges. The cost is seconds.

### Nodes

```jsonc
{ "id": "p5a", "kind": "platform", "level": "platform", "platform": "5", "section": "a" }
{ "id": "st5-mid", "kind": "stairs", "level": "platform",
  "label": { "nl": "de trap in het midden van spoor 5", "en": "the stairs in the middle of platform 5" },
  "short": { "nl": "spoor 5", "en": "platform 5" } }
{ "id": "hall-5", "kind": "hall", "level": "hall",
  "label": { "nl": "de stationshal", "en": "the station hall" } }
{ "id": "w1", "kind": "waypoint", "level": "hall" }
```

- `kind`: `platform`, `stairs`, `escalator`, `lift`, `ramp`, `passage`,
  `hall`, `exit`, `waypoint`.
- **Platform nodes** have the fixed id `p<platform><section>`: `p5a`, `p5b`,
  or `p7` when the platform has no sections. One node per platform section.
  Place it on the platform surface, in the middle of that section, next to
  the track. The arriving train stops next to this point.
- `label`: how the node is named as a target in a sentence ("walk to …").
  Lowercase, with the article. Required for every kind except `platform` and
  `waypoint`.
- `short`: where you are after you arrive by stairs, escalator or lift
  ("take the stairs up to **platform 5**"). Give it to every stairs, escalator,
  lift and ramp node on platform level.
- `waypoint` nodes only bend the drawn line. They never appear in the text.
- Every node needs a circle in `scene.svg` with id `node-<id>`.

### Edges

```jsonc
{ "from": "p5a", "to": "st5-mid", "kind": "walk", "seconds": 50 }
{ "from": "st5-mid", "to": "hall-5", "kind": "escalator", "seconds": 35 }
```

- Edges are two-way. Direction words (up, down) come from the levels.
- `kind`: `walk` (same level only), `stairs`, `escalator`, `lift`, `ramp`
  (these change level).
- `seconds` is the time for a hurried traveller with a bag:
  - walking on a platform: about **1.2 m/s** (50 m ≈ 40 s)
  - walking in a busy hall or tunnel: about **1.0 m/s**
  - stairs: 20 s down, 30 s up; escalator: 30 s; lift: 60–90 s including waiting
- Every platform node must be reachable from every other platform node.
- Model the real connections: the real stairs, in their real places, to the
  real passage. Two platforms that are only connected by a long detour in
  reality must be a long detour here too.
- Keep the graph small: usually 2–5 nodes per platform plus the passages.

## 8. Sample arrivals and departures

```jsonc
"arrivals": [
  { "id": "arr-ic-3045", "train": { "type": "Intercity", "number": "3045" },
    "origin": "Rotterdam Centraal", "platform": "5", "section": "b",
    "from_end": "bottom", "in_min": 0, "length_m": 160 }
],
"departures": [
  { "id": "dep-spr-5631", "train": { "type": "Sprinter", "number": "5631" },
    "destination": "Amersfoort Schothorst", "platform": "12", "section": "a",
    "to_end": "top", "in_min": 6, "status": "on_time", "delay_min": 0, "length_m": 100 }
]
```

- Times are **minutes relative to page load** (`in_min`). The page computes
  the clock time and the countdown. The arrival normally has `in_min: 0`.
- `from_end` / `to_end`: `top` or `bottom`, the end of the scene where the
  train comes from or goes to. It must match the real direction.
- `train.type` is a public product name: `Intercity`, `Sprinter`,
  `Intercity direct`, `Eurostar`, `ICE`, `NightJet`, `European Sleeper`.
  Optional `category`: `ic`, `spr` or `int` to force the nose colour.
- `length_m`: 70–100 for a Sprinter, 130–200 for an Intercity, 200–400 for
  international trains. Trains must fit on the platform.
- Destinations and origins are real station names in Dutch spelling in both
  languages (`Den Haag Centraal`, not "The Hague").
- Give **1–3 arrivals** and **6–10 departures** spread over 2–25 minutes,
  on different platforms, with at most one `delayed` departure.
- The default "your train" is the soonest departure on another platform than
  the arrival. Make sure that default is a realistic, comfortable transfer.
- Use real train numbers and real destinations for that station when you know
  them. If not, use a plausible number and say so in `NOTES.md`.

## 9. Realism: what must be true

The map is schematic but true. These must match reality:

1. The set of platform numbers and their order from one side to the other.
2. Which numbers share an island platform.
3. Where the passages, halls and bridges are along the platforms (north end,
   middle, south end) and whether they are above or below the platforms.
4. The ends: which destinations lie beyond the top and the bottom.
5. The compass direction (`north_deg`).
6. The approximate platform length (long platforms look long).

These may be simplified: platform widths, exact track curves outside the
station, shop details, exits that are not part of a transfer.

Write every fact and its source in `NOTES.md`. Good sources: the NS station
page and station map (*plattegrond*), OpenStreetMap (platform `ref` and
`level` tags), Wikipedia (NL), ProRail. If you cannot verify a fact, keep the
most likely value and mark it **VERIFY** in `NOTES.md` with a one-line note on
how to check it. Never present a guess as a fact without the mark.

## 10. Look

The target is the soft, bright, miniature feel of the reference video
(`reference-kyoto-joy-scroll.mp4`, not published): white and pale grey, one
green for the destination platform, soft shadows, lots of air. The shell's CSS
gives you this when you use the classes. Do not add strong colours. Keep
surroundings quiet: a few blocks, a canal, a couple of trees, the hall with
the station name on it. No postcards, no landmarks that steal attention.

## 11. Checks before you push

```bash
node tools/check-station.mjs <id>
```

This must print `0 error(s)`. Warnings are allowed when you explain them in
`NOTES.md`.

```bash
node tools/screenshot.mjs <id>
node tools/screenshot.mjs <id> --lang en
node tools/screenshot.mjs <id> --from <platform> --to <platform>
```

Look at every PNG in `tools/out/`. Check with your own eyes:

- The platform numbers read left to right and match reality.
- The arriving train stands next to its platform node, not on the platform.
- The route follows the real stairs and passages and never cuts across tracks.
- The written steps make sense to someone who has never been in the station.
- Nothing overlaps the "towards …" labels, the north arrow or the toggle.
- Both languages are complete. The phone (390 px) and the desktop (1280 px)
  both look finished.

Also open the page in a browser with motion on (no `motion=off`) and watch the
arriving train come in once.

## 12. Done checklist for a station

- [ ] `station.json`, `scene.svg` and `NOTES.md` exist; `status` is `ready`.
- [ ] `node tools/check-station.mjs <id>` prints 0 errors.
- [ ] Every platform with a platform surface is in `platforms`, in real order.
- [ ] Every passage, hall and bridge used for transfers is drawn and in the graph.
- [ ] The default transfer on page load is realistic and comfortable.
- [ ] At least one sample transfer that is tight exists in the departures.
- [ ] Ends and `north_deg` are correct.
- [ ] `NOTES.md` lists sources and every VERIFY item.
- [ ] Screenshots checked at phone and desktop size, in Dutch and English.
- [ ] No file outside `site/stations/<id>/` was changed.
- [ ] `scene.svg` is under 150 KB, `station.json` under 60 KB.

## 13. Out of scope for a station

- Live data, API calls, keys.
- All exits, shops, bus and tram stops. Only what matters for a train-to-train transfer.
- New shell features, new strings, new colours. Ask for them in `NOTES.md` instead.
- Other stations.
