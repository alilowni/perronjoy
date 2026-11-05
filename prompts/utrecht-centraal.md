# Build prompt — Utrecht Centraal (Perronjoy)

You are a careful front-end builder with an eye for maps. You build **one
station** for Perronjoy: **Utrecht Centraal** (id `utrecht-centraal`). Three other builders build the
other three stations at the same time on their own branches. All four branches
merge into `main`. Your work only fits if you follow the shared rules exactly.

Write in clean, simple English in your notes and messages. Keep Dutch for the
labels on the map, because that is what the real signs say.

## 1. What Perronjoy does

Perronjoy helps a traveller with a short transfer. The page shows a realistic
top-down map of the station, the train the traveller arrives with (coming in
from the correct end), the platform they must reach (green), the walking route
between the two (drawn on the map and written as steps), and a verdict:
comfortable, tight, or very tight.

The shared shell already does all of this. **You only add the station**: its
facts, its walking graph, its drawing, and sample trains. You do not write
JavaScript or CSS.

## 2. Before you start

1. Read `README.md`, then read `SPEC.md` from start to end. `SPEC.md` is the
   contract. When this prompt and `SPEC.md` differ, `SPEC.md` wins.
2. Look at the template station: `site/stations/_template/station.json`,
   `site/stations/_template/scene.svg`.
3. Run it, so you know what the shell draws for you and what you must draw:

   ```bash
   node tools/check-station.mjs _template
   node tools/screenshot.mjs _template
   ```

   Open the PNG files in `tools/out/` and look at them. If the screenshot tool
   cannot start Chromium, run `python3 -m http.server 8000 --directory site`
   and open `http://localhost:8000/station.html?station=_template` in a
   browser instead.
4. Watch or look at frames of `reference-kyoto-joy-scroll.mp4` once. It sets
   the mood: soft, bright, miniature, calm. Do not copy Kyoto.

## 3. Rules for all four stations

These rules are the same in all four prompts. Do not bend them.

**Files.** You may create or change files **only** inside
`site/stations/utrecht-centraal/`:

- `station.json` — replace the placeholder.
- `scene.svg` — the drawing.
- `NOTES.md` — sources, decisions, VERIFY list, shell issues.

Do not touch `site/index.html`, `site/station.html`, `site/css/`, `site/js/`,
`site/stations/index.json`, `site/stations/_template/`, `tools/`, `SPEC.md`,
`README.md`, `prompts/`, or another station's folder. Do not add npm packages,
build steps, fonts, images, or a second stylesheet. If the shell has a bug or
misses something you need, write it in `NOTES.md` under **Shell issues** and in
your final message, then work around it inside your folder. Never "fix" the
shell on your branch; a shell change on four branches at once cannot merge.

**Truth.** The map is schematic but true. The platform numbers, their order,
which numbers share an island, where the passages and halls are, whether they
are above or below the platforms, and what lies beyond each end must be real.
Check them against sources: the NS station page and station map
(*plattegrond*), OpenStreetMap (platform `ref` and `level` tags), Wikipedia
(NL), ProRail. If you have web access, use it. If you cannot verify a fact,
keep the most likely value and mark it `VERIFY` in `NOTES.md` with one line on
how to check it. The facts in section 4 below were written from memory by the
planner. Treat them as a starting point, not as truth. Verify them too.

**Scope.** Only what matters for a train-to-train transfer: platforms, tracks,
stairs, escalators, lifts, passages, halls, and enough surroundings to
recognise the station. No shops, no bus stops, no ticket machines, no exits
that play no role in a transfer. No live data. No new features.

**Scene.** Follow `SPEC.md` section 5 exactly: fixed layer ids, tracks
vertical and drawn top to bottom, platform numbers increasing from left to
right, one `<rect id="platform-N">` per platform number, one
`<path id="track-N">` per platform number, nodes as plain circles, no
transforms on layers, platform rects or nodes, classes instead of colours,
under 150 KB, no scripts, no images, no external URLs, no logos.

**Graph.** Follow `SPEC.md` section 7: platform nodes `p<number><section>`,
real stairs in real places, bilingual `label` and `short`, seconds that match
a hurried walk, every platform reachable from every other platform.

**Sample data.** Follow `SPEC.md` section 8: 1–3 arrivals and 6–10
departures, minutes relative to page load, real destinations in Dutch
spelling, real train types, at most one delayed train. The default transfer on
page load (the arrival plus the soonest departure on another platform) must be
realistic and comfortable. Include at least one departure that makes a tight
transfer, so the amber verdict can be seen.

**Language.** Every label in `station.json` is `{"nl": "...", "en": "..."}`.
Station and city names stay in Dutch in both languages.

**Checks.** Before every push:

```bash
node tools/check-station.mjs utrecht-centraal
node tools/screenshot.mjs utrecht-centraal
node tools/screenshot.mjs utrecht-centraal --lang en
```

The checker must print `0 error(s)`. Look at all PNG files and fix what looks
wrong. Also take one screenshot with a different pair, for example
`--from <platform> --to <platform>`, and check the route and the steps.

**Git.** Work on the branch you were given. If you were not given one, create
`station/utrecht-centraal` from `main`. Commit in small steps with clear messages. Push
the branch. Do not merge into `main` and do not open a pull request unless you
are asked to. Do not push changes to any other branch.

**Working style.** Do not stop to ask questions. Make the decision, write it
in `NOTES.md`, and continue. Finish the whole station. Report honestly what is
verified, what is marked `VERIFY`, and what you could not do.

## 4. About this station (starting facts, verify them)

**Known with good confidence**

- Utrecht Centraal is the busiest station in the Netherlands and the main
  transfer hub of the country. It is a through station. Tracks run roughly
  north–south.
- The station hall (the OV-terminal, opened 2016) lies **above** the tracks.
  It spans the whole width of the station, from Stationsplein and Hoog
  Catharijne on the **east** side to Jaarbeursplein on the **west** side.
  Every platform is reached by escalators, stairs and lifts that go **up**
  into this hall. The hall is the normal way to change platforms.
- Platforms are long and have **a** and **b** sections. Departure boards say
  for example "spoor 5a".
- Train types: Intercity, Sprinter, ICE International (to Germany, via
  Arnhem), NightJet. No Eurostar.
- Beyond the **north** end: Amsterdam, Hilversum and Amersfoort, and (the
  line curves west) Woerden, Gouda, Rotterdam, Den Haag, Leiden.
  Beyond the **south** end: Utrecht Vaartsche Rijn, 's-Hertogenbosch,
  Eindhoven, and (via Driebergen-Zeist) Arnhem and Nijmegen.

**Likely, but VERIFY**

- Platform tracks: **1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 15, 18, 19, 20, 21**
  (16 platform tracks). Islands: 1/2, 3/4, 5/7, 8/9, 11/12, 14/15, 18/19,
  20/21. Missing numbers (6, 10, 13, 16, 17) are through tracks without a
  platform, or do not exist. Check the NS station map and OpenStreetMap.
- Which side holds spoor 1: find out whether the low numbers are on the east
  (Hoog Catharijne) side or on the west (Jaarbeurs) side. This decides the
  rotation of the scene and the value of `north_deg`.
- How many escalator and stair sets each platform has into the hall. Expect
  at least two per island (the hall is wide). Model what you can verify.
- Whether a second passage exists at the north or south end that connects
  platforms (older plans had a *Noordertunnel*). Include it only if a source
  confirms it is open for transfers. Otherwise model only the hall.
- Which end is section **a**. Check one real departure board photo or the
  station map.

## 5. The scene

- One level above the platforms: `levels` = platform (0) and `hall` (+1).
  Draw the hall as a wide `passage passage--above` band across all platforms
  at its real position along the platforms, with the station name on it.
- Surroundings: a `building` block for Hoog Catharijne on the city side and a
  `block` for the Jaarbeurs side. A few trees at most. The Moreelsebrug (a
  pedestrian and bicycle bridge south of the station) may be drawn as a thin
  `passage--above` line, but it is **not** in the walking graph: it does not
  connect to the platforms.
- Sixteen platform tracks are a lot. Follow the minimum widths in `SPEC.md`
  (tracks 10 units apart, platforms 16 units wide) and let the scene be wide.
  The shell zooms to the transfer, so a wide scene is fine.

## 6. The walking graph and sample data

- For each island: nodes `p<N>a` and `p<N>b` for both platform numbers, one or
  two `escalator`/`stairs` nodes on platform level with `short` labels such as
  `{"nl": "spoor 5/7", "en": "platform 5/7"}`, and a `hall` node above each
  stair set. Connect the hall nodes along the hall with `walk` edges.
- Suggested demo scenario (choose real platforms when you can verify them,
  otherwise plausible ones marked VERIFY): arrive with an Intercity from
  Rotterdam Centraal (`from_end`: the end where the Gouda line enters),
  default next train a Sprinter towards Amersfoort, plus Intercity departures
  towards Amsterdam Centraal, Eindhoven Centraal, Arnhem Centraal, Den Haag
  Centraal, Leiden Centraal, Zwolle, and one ICE International towards
  Frankfurt. Lengths: Sprinter 70–100, Intercity 160–200, ICE 200.

## 7. Steps, in order

1. Read `README.md` and `SPEC.md`. Run the template and look at it.
2. Collect the facts: platform list and order, islands, sections, passages and
   halls with their level and position, ends, compass. Write them in
   `NOTES.md` with a source or a `VERIFY` mark for each.
3. Sketch the scene on paper or in your head: viewBox size, where each
   platform rect sits (x, width, y, height), where the passages cross.
4. Write `station.json` first: platforms, levels, nodes, edges, arrivals,
   departures. Run the checker; it will complain about the missing SVG, that
   is fine for now.
5. Draw `scene.svg`: ground and surroundings, passages, track centrelines,
   platform rects, buildings and stairs marks, labels, node circles. Keep the
   node circles exactly on the platform surfaces and inside the passages.
6. Run the checker until it prints 0 errors. Run the screenshots. Look at
   them. Fix overlaps, wrong sides, routes that cross tracks, steps that read
   strangely.
7. Open the page with motion on and watch the arriving train come in once.
8. Set `"status": "ready"`. Finish `NOTES.md`. Commit and push.

## 8. Done

Use the checklist in `SPEC.md` section 12. In your final message, give:

- the branch name and the last commit,
- the list of platforms you drew, in order,
- the passages and halls you modelled,
- every `VERIFY` item in one line each,
- any shell issue you found,
- what the screenshots show at 390 px and 1280 px.
