# Perronjoy — station contract

This file is the contract between the shared site (the "shell") and every
station. Four builders build four stations on four branches. The branches
merge into `main`. The work only merges cleanly and looks like one product
when every station follows this file. Read it fully before you start.

If something is unclear, choose the simplest reading and write your choice in
your station's `NOTES.md`. Do not change this file on a station branch.

Related files: [README](../README.md) · [AGENTS](../AGENTS.md) ·
[build prompts](prompts/README.md) · [template station](../site/stations/_template/)

**Contents**

1. [What the product does](#1-what-the-product-does)
2. [Who edits what](#2-who-edits-what)
3. [A station folder](#3-a-station-folder)
4. [What the shell draws for you](#4-what-the-shell-draws-for-you)
5. [scene.svg](#5-scenesvg)
6. [station.json](#6-stationjson)
7. [The walking graph](#7-the-walking-graph)
8. [Sample arrivals and departures](#8-sample-arrivals-and-departures)
9. [Realism](#9-realism-what-must-be-true)
10. [Look and motion](#10-look-and-motion)
11. [Checks before you push](#11-checks-before-you-push)
12. [Done checklist](#12-done-checklist-for-a-station)
13. [Out of scope](#13-out-of-scope-for-a-station)

---

## 1. What the product does

Perronjoy helps a traveller with a short transfer. The traveller arrives on
one platform and must reach another platform in a few minutes. The page shows:

1. A clear, realistic map of the station, seen from above, tracks vertical,
   with enough of the surroundings to recognise the place.
2. The train the traveller arrives with, coming in from the correct end.
3. The platform the traveller must reach, highlighted in green.
4. A walking route drawn on the map, with short written steps.
5. A verdict: comfortable, tight, or very tight, based on walking time.

Everything works in **Dutch and English** and in a **light and a dark
theme**. Version 1 uses sample data. The URL
`station.html?station=<id>&from=<platform>&to=<platform>` also works with
plain platform numbers, without a sample record. Future features are listed in
[IDEAS.md](../IDEAS.md), not here.

## 2. Who edits what

| Path | Owner | Station branches may edit? |
|---|---|---|
| `site/stations/<your-station>/` | the station builder | **yes, only this folder** |
| `site/index.html`, `site/station.html` | shell | no |
| `site/css/site.css`, `site/js/*.js` | shell | no |
| `site/stations/index.json` | shell (already lists all four stations) | no |
| `site/stations/_template/` | shell example | no |
| `tools/`, `docs/`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `IDEAS.md`, `package.json`, `.github/` | shared | no |
| `ISSUES.md` | shared | add lines only |

If the shell has a bug that blocks you, do not fix it on your branch. Write it
in your `NOTES.md` under "Shell issues", add one line to
[`ISSUES.md`](../ISSUES.md), and mention it in your final message. Work
around it inside your folder when you can.

## 3. A station folder

```
site/stations/<id>/
  station.json   facts, walking graph (with the toilets), sample arrivals and departures
  scene.svg      the drawing
  NOTES.md       sources, facts, scale, surroundings, toilets, decisions, VERIFY, shell issues
```

`<id>` is fixed: `utrecht-centraal`, `amsterdam-centraal`, `rotterdam-centraal`,
`schiphol-airport`. The folders exist with a placeholder `station.json`.
Replace it.

Start from [`site/stations/_template/`](../site/stations/_template/). It is a
small fictional station that follows every rule. Copy the headings of its
`NOTES.md`; the checker requires them. Every station includes its public
toilets: see [Toilets](#toilets) in section 7.

## 4. What the shell draws for you

You do **not** draw these. The shared script adds them from your files:

- Soft drop shadows under every `block`, `building`, `tree` and `platform`.
- Ballast, sleepers and rails for every track, from your centrelines.
- Platform number badges on every platform.
- Tiny neutral people on every platform surface, also on a platform rect
  without a number. About one in four walk slowly along their platform (see
  [section 10](#10-look-and-motion)).
- Trains, standing at the right place and moving in or out.
- The walking route, its step markers, and the start and end markers.
- A small WC marker at every toilet node, and the route via a toilet when the
  traveller turns on "WC onderweg" (see [Toilets](#toilets)).
- The green "your platform" glow and the blue "arrival platform" tint.
- The fog at the top and bottom, the north arrow, the "towards …" labels.
- The transfer panel with two search-and-select fields, "Je komt aan op" and
  "Je volgende trein": tap one for the full list, or type a platform ("5",
  "5b", "spoor 5"), a train number ("31" finds Intercity 3152) or a place
  ("rotterdam", "parijs"). Platform matches come first; while the list is
  open, the platform of the active option gets a quiet outline on the map.
  The options come from your `arrivals`, `departures` and `platforms`.
- The step list, the departures list, list mode, both languages and both
  themes.

You draw only the station itself and its surroundings.

## 5. scene.svg

### 5.1 Coordinates

- One `<svg>` with a `viewBox="X Y W H"`. No `width`/`height` attributes.
  The viewBox may start at negative values.
- **1 unit ≈ 1 metre along the tracks.** A 300 m platform is 300 units long.
- **Across the tracks you may widen for legibility.** Keep track centrelines
  at least **10 units** apart and platform surfaces at least **16 units**
  wide. Write your across-track factor in `NOTES.md` (for example "×1.6").
- Tracks run **from the top of the scene to the bottom**. Every track path is
  drawn in that direction (first point at the top).
- **Platform numbers increase from left to right.** Rotate the real station
  to make this true. Then set `orientation.north_deg` in `station.json`: the
  angle in degrees, clockwise, from screen-up to true north. Example: if
  north points to the right of the screen, `north_deg` is `90`.

### 5.2 Layers (ids and order are fixed)

```
<g id="layer-ground">      ground rect and all surroundings (see 5.5)
<g id="layer-passages">    tunnels and passages BELOW the platforms
<g id="layer-tracks">      track centrelines, invisible, id="track-N"
<g id="layer-platforms">   platform rects, id="platform-N"
<g id="layer-buildings">   station buildings, halls and bridges ABOVE the platforms, stairs marks
<g id="layer-labels">      text labels
<g id="layer-nodes">       invisible circles for the walking graph, id="node-ID"
```

- No `transform` attribute on any layer group, platform rect or node circle.
  The shell reads plain coordinates. A `transform="rotate(…)"` on a `<text>`
  is fine.
- A platform (Dutch: *spoor*, one number) is **one `<rect>`** with
  `id="platform-N"` and `class="platform"`. An island platform with two
  numbers is two rects that touch. Example: platforms 5 and 7 share an
  island → `platform-5` is the left half, `platform-7` the right half.
- Optional section rects: `id="platform-5a"`, `id="platform-5b"` inside the
  platform area, same class. If present, the shell highlights the section.
- A track centreline is **one `<path>`** with `id="track-N"`, one per
  platform number, running the full height of the scene, next to its
  platform. A dead-end track (*kopspoor*) starts or ends at its buffer stop
  instead; its trains enter and leave at the open end only. Tracks without a
  platform may use `id="track-x-N"`; the shell draws rails for every path
  whose id starts with `track-`.
- Node circles: `<circle id="node-ID" cx=".." cy=".." r="1"/>`. The id after
  `node-` must match a node in `station.json`.

### 5.3 Classes and colours (themes)

Colours come only from `site/css/site.css`, through these classes. This is
what makes the dark theme work. **Never** put a colour in the SVG: no
`fill="#…"`, no `stroke="red"`, no `style="fill:…"`, no `<style>`. The checker
rejects them. `fill="none"` is allowed, but it has no effect on a shape
with one of these classes: the class sets the fill and wins over the
attribute, so `fill="none"` cannot turn a classed shape into an outline.

| class | use |
|---|---|
| `ground` | one rect covering the whole viewBox |
| `block` | a city block or low building. Add `block--tall` for a tower (bigger shadow) |
| `building` | a station building or hall at ground level |
| `roof` | a lighter rect on top of a `building`, for a roof structure |
| `square` | a paved square or forecourt (*plein*) |
| `road` | a street; `road-line` for its dashed centre line or a tram track |
| `park` | grass or a park |
| `water` | a canal, river, harbour or lake |
| `tree` | a circle, radius 2.5–5 |
| `bike` | a row of bicycle racks (thin rect, about 15 × 1.4) |
| `platform` | platform rects |
| `passage` | a tunnel or passage below the platforms (dashed outline) |
| `passage passage--above` | a hall, bridge or deck above the platforms |
| `stairs` and `stairs-line` | a small rect and light lines marking stairs or escalators |
| `label`, `label label--muted`, `label label--water` | text; `font-size` in scene units (3–6) |

Allowed elements: `rect`, `path`, `circle`, `ellipse`, `line`, `polygon`,
`polyline`, `text`, `g`, and one `title` with the station name (see the
template). Not allowed: `script`, `style`, `image`,
`foreignObject`, `tspan`, external URLs, fonts, filters, raster data.

### 5.4 Labels in two languages

Every `<text>` is written in Dutch (the language of the signs) and carries
an English version in `data-en`. The shell swaps them when the visitor
switches language.

```xml
<text class="label label--muted" x="20" y="211" font-size="3.2" text-anchor="middle" data-en="station hall">stationshal</text>
<text class="label" x="-9" y="214" font-size="3" text-anchor="middle" data-en="Stationsplein">Stationsplein</text>
```

- Proper names stay the same in both languages: street, square, canal and
  building names (`Stationsplein`, `Hoog Catharijne`, `Weena`).
- Descriptive words are translated (`stationshal` → `station hall`,
  `fietsenstalling` → `bicycle parking`).
- One line per `<text>`. No `<tspan>`.

### 5.5 Surroundings: make it look real

The reference (see section 10) showed a station that feels like a real place:
trees, buildings, a covered entrance. Perronjoy stations do the same, quietly.

- Draw **30–80 units** of surroundings around the platform area on every side
  that is not cut off by the fog.
- Use the **real** surroundings of the station, simplified: the main square,
  the main streets, water, a park, the big buildings next to the station,
  the bicycle parking. Put them on the correct side.
- Use at least **4 kinds** (for example block, road, water, tree) and about
  **15–80 shapes** in total. The checker warns outside this range.
- Name 2–5 of them with a label (square, canal, a well-known building).
- Keep it calm. Blocks are simple rectangles with rounded corners. No
  windows, no logos, no detailed facades, no strong colours.
- List the surroundings and their sources in `NOTES.md` under
  "Surroundings".

### 5.6 Size and text

- **Size limit: 150 KB.** Round coordinates to one decimal.
- All text is real words. No lorem ipsum.
- No railway logos, no brand colours, no copied map tiles.

## 6. station.json

Every field, with its meaning. See [`_template/station.json`](../site/stations/_template/station.json)
for a full example.

```jsonc
{
  "id": "utrecht-centraal",          // must equal the folder name
  "name": "Utrecht Centraal",        // official station name
  "city": "Utrecht",
  "status": "ready",                 // "draft" while working, "ready" when done

  "orientation": { "north_deg": 210 }, // see 5.1; Utrecht is drawn turned, north points down-left

  "ends": {                          // what lies beyond each end of the tracks
    "top":    { "towards": { "nl": "'s-Hertogenbosch, Arnhem", "en": "'s-Hertogenbosch, Arnhem" } },
    "bottom": { "towards": { "nl": "Amsterdam, Gouda, Zwolle", "en": "Amsterdam, Gouda, Zwolle" } }
  },

  "levels": [                        // position: 0 = platform level, 1 = above, -1 = below
    { "id": "platform", "label": { "nl": "perron", "en": "platform" }, "position": 0 },
    { "id": "hall",     "label": { "nl": "stationshal", "en": "station hall" }, "position": 1 }
  ],

  "platforms": [                     // every platform number that has a platform, left to right
    { "id": "5", "sections": ["a", "b"] },
    { "id": "7" }
  ],

  "nodes": [ ... ],                  // walking graph with the toilets, see 7
  "edges": [ ... ],
  "no_toilets": false,               // optional; true only when the station has no public toilet (see 7)

  "arrivals":   [ ... ],             // sample data, see 8
  "departures": [ ... ],

  "sources": [ "..." ]               // short list; details go in NOTES.md
}
```

Platform ids are numbers written as strings: `"5"`, `"12"`. Sections are
single lowercase letters. Every human-readable text is
`{"nl": "...", "en": "..."}`.

## 7. The walking graph

The shell finds the route with a shortest-path search over your nodes and
edges. The cost is seconds.

### Nodes

```jsonc
{ "id": "p5a", "kind": "platform", "level": "platform", "platform": "5", "section": "a" }
{ "id": "st5-mid", "kind": "escalator", "level": "platform",
  "label": { "nl": "de roltrap in het midden van spoor 5", "en": "the escalator in the middle of platform 5" },
  "short": { "nl": "spoor 5/7", "en": "platform 5/7" } }
{ "id": "hall-5", "kind": "hall", "level": "hall",
  "label": { "nl": "de stationshal", "en": "the station hall" } }
{ "id": "w1", "kind": "waypoint", "level": "hall" }
```

- `kind`: `platform`, `stairs`, `escalator`, `lift`, `ramp`, `passage`,
  `hall`, `exit`, `waypoint`, `toilet` (see [Toilets](#toilets)).
- **Platform nodes** have the fixed id `p<platform><section>`: `p5a`, `p5b`,
  or `p7` when the platform has no sections. One per section. Place it on the
  platform surface, in the middle of that section. The arriving train stops
  next to this point.
- `label`: how the node is named as a target in a sentence ("walk to …").
  Lowercase, with the article. Required for every kind except `platform` and
  `waypoint`.
- `short`: where you are after you arrive by stairs, escalator or lift ("take
  the stairs up to **platform 5/7**"). Give it to every stairs, escalator,
  lift and ramp node on platform level.
- `waypoint` nodes only bend the drawn line. They never appear in the text.
- Every node needs a circle in `scene.svg` with id `node-<id>`.

### Edges

```jsonc
{ "from": "p5a", "to": "st5-mid", "kind": "walk", "seconds": 50 }
{ "from": "st5-mid", "to": "hall-5", "kind": "escalator", "seconds": 35 }
```

- Edges are two-way. Up and down come from the levels.
- `kind`: `walk` (same level only), `stairs`, `escalator`, `lift`, `ramp`
  (these change level).
- `seconds` is the time for a hurried traveller with a bag:
  - on a platform: about **1.2 m/s** (50 m ≈ 40 s)
  - in a busy hall or tunnel: about **1.0 m/s**
  - stairs: 20 s down, 30 s up; escalator: 30 s; lift: 60–90 s with waiting.
    An edge has one `seconds` for both directions, so give stairs one value
    between 20 and 30 s.
- Every platform node must reach every other platform node.
- Model the real connections: the real stairs in their real places to the
  real passage. A long detour in reality is a long detour here too.
- Keep it small: usually 2–5 nodes per platform plus the passages.

### Toilets

Every station shows where its public toilets are, and the shell can route a
traveller via a toilet on the way to the next train. Toilets are a fixed part
of every station build.

```jsonc
{ "id": "wc-hall", "kind": "toilet", "level": "hall",
  "label": { "nl": "de toiletten in de stationshal, bij uitgang Centrum",
             "en": "the toilets in the station hall, near the Centrum exit" },
  "paid": true, "accessible": true, "outside_gates": false }
```

- One `toilet` node per toilet block. Start the id with `wc-`.
- `label`: where it is, as a target in a sentence ("walk to …"): lowercase,
  with the article, and a landmark a stranger can find. No `short`.
- Three required booleans:
  - `paid`: you pay to get in (NS toilets at large stations are SANIFAIR,
    with staff and a fee);
  - `accessible`: there is a wheelchair toilet;
  - `outside_gates`: you reach it only after checking out at the gates, so
    you check out and in again.
- Put the node at its real position and on its real level. Give it a
  `node-<id>` circle in `scene.svg`, like every node, and connect it with real
  `walk`, `stairs`, `escalator` or `lift` edges at the speeds above.
- Do not draw a toilet sign in `scene.svg`. The shell draws the WC marker (a
  small rounded square with "WC") at the node, above the scene and below the
  route. Keep the circle off the platform number badges: the checker warns,
  and the shell moves a marker aside when it would cover one.
- Which toilets: only public toilets that a traveller can use at the station,
  in halls, in tunnels, on platforms, or just outside the gates (then
  `outside_gates: true`). Not customer-only toilets in restaurants, shops or
  lounges, not staff toilets, and at an airport not the airside toilets
  behind passport or security control.
- A route never passes through a toilet node: it is a destination, never a
  shortcut between two other nodes.
- Every toilet must be reachable from every platform node. The checker gives
  an ERROR when one is not.
- A `ready` station needs at least one toilet node. The only exception is
  `"no_toilets": true` in `station.json`, with the reason in `NOTES.md` under
  `## Toilets`.
- `NOTES.md` has a `## Toilets` section: one line per toilet with its id,
  where it is, its level, its source, `paid`, `accessible`, `outside_gates`,
  and a VERIFY mark on everything a source does not confirm. Good sources:
  OpenStreetMap `amenity=toilets` (with `level`, `fee` or `charge`,
  `wheelchair`, `access`, `opening_hours`), the NS station page, Wikipedia NL
  and the station operator's site. The gate side comes from the OSM
  `barrier=turnstile` lines or the NS station map.

What the shell does with them:

- **WC onderweg** ("Toilet on the way") in the transfer card. When it is on,
  the route goes from the arrival via the toilet that gives the shortest total
  walk to the next train, and the URL gets `via=wc`. Without a next train
  (`to=none`) the route goes to the nearest toilet.
- The steps say "Loop naar <label>", then "Toiletbezoek, ongeveer 3 min"
  with notes for a paid toilet, a wheelchair toilet and a toilet outside the
  gates ("buiten de poortjes: uit- en weer inchecken"), then the way on.
- The verdict counts the walk plus the toilet stop. The stop is the constant
  `TOILET_STOP_MIN` in `site/js/site.js`: **3 minutes**.
- List mode has a "Toiletten" section: every toilet, its flags, and the
  walking time from the arrival platform.

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
    "to_end": "bottom", "in_min": 6, "status": "on_time", "delay_min": 0, "length_m": 100 }
]
```

- Times are **minutes relative to page load** (`in_min`). The page computes
  the clock time and the countdown. The arrival normally has `in_min: 0`.
- `from_end` / `to_end`: `top` or `bottom`, where the train comes from or
  goes to. It must match the real direction.
- `train.type` is a public product name: `Intercity`, `Sprinter`,
  `Intercity direct`, `Eurostar`, `ICE`, `NightJet`, `European Sleeper`.
  Optional `category`: `ic`, `spr` or `int` to force the nose colour.
- `length_m`: 70–100 for a Sprinter, 130–200 for an Intercity, 200–400 for
  international trains. Trains must fit on the platform.
- Destinations and origins are real station names in Dutch spelling, in both
  languages (`Den Haag Centraal`, not "The Hague").
- Give **1–3 arrivals** and **6–10 departures** spread over 2–25 minutes, on
  different platforms, with at most one `delayed` departure.
- The default "your train" is the soonest departure on another platform
  than the arrival. Make that a realistic, comfortable transfer. Also include
  one departure that makes a tight transfer. Because of that rule, the tight
  one must leave from the arrival's own platform number (the other section),
  or leave after the default with a longer walk; a sooner departure on
  another platform would become the default.
- Use real train numbers when you know them. If not, use a plausible number
  and say so in `NOTES.md`.

## 9. Realism: what must be true

The map is schematic but true. These must match reality:

1. The platform numbers and their order from one side to the other.
2. Which numbers share an island platform.
3. Where passages, halls and bridges are along the platforms, and whether
   they are above or below.
4. The ends: which destinations lie beyond the top and the bottom.
5. The compass direction (`north_deg`).
6. The approximate platform length.
7. Which side the city centre, the main square and the main surroundings are on.
8. Where the public toilets are, on which level, and whether they are paid,
   accessible and outside the gates (see [Toilets](#toilets)).

These may be simplified: platform widths, track curves outside the station,
shops, exits that play no role in a transfer, the exact shape of buildings.
Toilet positions are facts: give each one a source, or mark it VERIFY.

Write every fact and its source in `NOTES.md`. Good sources: the NS station
page and station map (*plattegrond*), OpenStreetMap (platform `ref` and
`level` tags, building outlines), Wikipedia (NL), ProRail. If you cannot
verify a fact, keep the most likely value and mark it **VERIFY** in
`NOTES.md` with one line on how to check it. Never present a guess as a fact.

## 10. Look and motion

The target is the soft, bright, miniature feel of the original reference: a
concept video of a station platform map on a phone, no longer kept in the
repository. In words, it showed:

- A top-down, slightly isometric view of four platforms, tracks vertical,
  like a tidy model railway.
- Pale grey and white surfaces, thin dark rails, soft shadows, lots of air.
- One platform filled with a soft green that pulses gently: "your train".
- Real surroundings at the edges: a row of trees on one side, low buildings
  and stairs on the other, a covered station building across the tracks
  with the station name on it, a small north arrow.
- Tiny dark marks for people on the platforms. No faces, no detail.
- White fog fading the top and bottom of the map.
- Slow, smooth trains: one glides in and stops, one glides out. The camera
  stays still.
- A rounded white card under the map with the departures and a green
  "your train" row.

The shell gives you this when you use the classes. In the dark theme the same
classes turn into a calm night palette.

All motion is done by the shell. It uses one animation loop, moves only
transforms, opacity and a dash offset, and runs at the display's frame rate.
It respects "reduce motion".

People are simple neutral shapes, a head and a body in one colour token: no
gender cues, no faces, no legs, no walking cycle. About one in four walk (at
most three per platform, about twenty on the whole map), slowly (0.6–1.0
units per second), along their platform and inside a margin from its edges,
with short pauses and smooth starts and stops. Fixed seeds per station and
platform make every load and every screenshot the same. They pause in list
mode and while the page is hidden, and stand still under reduced motion
(`motion=off` or the system setting). They walk inside the platform rects,
so keep those rects simple.

Your job is to keep the scene light: few elements, simple shapes, under
150 KB. A heavy scene makes every frame slow.

## 11. Checks before you push

```bash
npm run check -- <id>        # contract checker, must print 0 error(s)
npm run smoke -- <id>        # browser test: route, train, languages, themes, list mode
npm run shots -- <id>        # PNG screenshots in tools/out/
npm run shots -- <id> --theme dark --lang en
npm run shots -- <id> --from <platform> --to <platform>
npm run shots -- <id> --via wc   # the route via the toilet
```

(Without npm: `node tools/check-station.mjs <id>`, `node tools/smoke.mjs <id>`,
`node tools/screenshot.mjs <id>`.)

Warnings are allowed when you explain them in `NOTES.md`. Look at every PNG
and check with your own eyes:

- Platform numbers read left to right and match reality.
- The arriving train stands next to its platform node.
- The route follows real stairs and passages and never cuts across tracks.
- Every WC marker sits on a real toilet and covers no badge; the `--via wc`
  route and its steps make sense.
- The steps make sense to someone who has never been in the station.
- The surroundings sit on the correct side and look calm in both themes.
- Nothing hides under the "towards …" labels, the north arrow or the toggle.
- Both languages are complete; the phone (390 px) and desktop (1280 px)
  layouts both look finished.

Run `npm run serve` and watch the arriving train come in once with motion on.

## 12. Done checklist for a station

- [ ] `station.json`, `scene.svg` and `NOTES.md` exist; `status` is `ready`.
- [ ] `npm run check -- <id>` prints 0 errors; warnings are explained.
- [ ] `npm run smoke -- <id>` passes.
- [ ] Every platform is in `platforms`, in real order.
- [ ] Every passage, hall and bridge used for transfers is drawn and in the graph.
- [ ] Every public toilet is a `toilet` node with its three flags, reachable
      from every platform, and listed with a source under `## Toilets` in
      `NOTES.md`; the `--via wc` screenshots look right.
- [ ] Real surroundings on the correct sides, at least 4 kinds, 2–5 labelled.
- [ ] Every label has `data-en`; every JSON text has `nl` and `en`.
- [ ] No colours in the SVG; the dark screenshot looks right.
- [ ] The default transfer is comfortable; one tight transfer exists.
- [ ] Ends and `north_deg` are correct.
- [ ] `NOTES.md` lists sources and every VERIFY item.
- [ ] No file outside `site/stations/<id>/` was changed.

## 13. Out of scope for a station

- Live data, API calls, keys.
- All exits, shops, bus and tram stops. Only what matters for a
  train-to-train transfer, plus calm surroundings.
- New shell features, strings, classes or colours. Ask for them in
  `NOTES.md` under "Shell issues".
- Other stations.
