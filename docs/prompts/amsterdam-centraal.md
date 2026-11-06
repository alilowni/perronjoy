# Build prompt — Amsterdam Centraal (Perronjoy)

You are a careful front-end builder with an eye for maps. You build **one
station** for Perronjoy: **Amsterdam Centraal** (id `amsterdam-centraal`). Three other builders build the
other three stations at the same time, each on their own branch. All four
branches merge into `main`. Your work only fits if you follow the shared rules
exactly.

Write your notes and messages in clean, simple English. Map labels are Dutch
with an English `data-en` version, because the real signs are Dutch.

## 1. What Perronjoy does

Perronjoy helps a traveller with a short transfer. The page shows a realistic
top-down map of the station and its surroundings, the train the traveller
arrives with (coming in from the correct end), the platform they must reach
(green), the walking route between the two (drawn on the map and written as
steps), and a verdict: comfortable, tight, or very tight. It works in Dutch
and English, and in a light and a dark theme.

The shared shell already does all of this. **You only add the station**: its
facts, its walking graph, its drawing with real surroundings, and sample
trains. You do not write JavaScript or CSS.

## 2. Before you start

1. Read [AGENTS.md](../../AGENTS.md), [README.md](../../README.md), and then
   [docs/SPEC.md](../SPEC.md) from start to end. `SPEC.md` is the contract.
   When this prompt and `SPEC.md` differ, `SPEC.md` wins.
2. Study the template station in
   [site/stations/_template/](../../site/stations/_template/): `station.json`,
   `scene.svg` and `NOTES.md`.
3. Run it, so you see what the shell draws for you and what you must draw:

   ```bash
   npm run check -- _template
   npm run smoke -- _template
   npm run shots -- _template
   npm run shots -- _template --theme dark --lang en
   ```

   Open the PNG files in `tools/out/` and look at them. If Playwright is not
   available, run `npm run serve` and open
   `http://localhost:8000/station.html?station=_template` in a browser.
4. Read [SPEC 10](../SPEC.md#10-look-and-motion). It describes the
   reference look in words: soft, bright, miniature, calm, with real trees
   and buildings around the tracks. Do not copy its city (Kyoto).

## 3. Rules for all four stations

These rules are the same in all four prompts. Do not bend them.

**Files.** Create or change files **only** inside `site/stations/amsterdam-centraal/`:

- `station.json` — replace the placeholder.
- `scene.svg` — the drawing.
- `NOTES.md` — copy the headings from the template `NOTES.md`.

Do not touch anything else: not `site/*.html`, `site/css/`, `site/js/`,
`site/stations/index.json`, `site/stations/_template/`, `tools/`, `docs/`,
`README.md`, `AGENTS.md`, `CLAUDE.md`, `package.json`, `.github/`, or another
station's folder. The one exception is `ISSUES.md`: you may add lines to it.
Do not add packages, build steps, fonts, images or styles.
If the shell has a bug or misses something you need, write it in `NOTES.md`
under **Shell issues**, add one line at the end of `ISSUES.md`
(`- [shell] problem`), and mention it in your final message; then work around
it inside your folder. Never fix the shell on your branch: four branches
changing the shell at once cannot merge.

**Truth.** The map is schematic but true ([SPEC 9](../SPEC.md#9-realism-what-must-be-true)).
Platform numbers, their order, islands, the position and level of passages
and halls, what lies beyond each end, the compass direction, and which side
the city and the surroundings are on must be real. Check them against
sources: the NS station page and station map (*plattegrond*), OpenStreetMap
(platform `ref` and `level` tags, building outlines, `natural=tree` and park
areas), Wikipedia (NL), ProRail, recent aerial photos. Use web access if you
have it. If you cannot verify a fact, keep the most likely value and mark it
`VERIFY` in `NOTES.md` with one line on how to check it. The facts in
sections 4 and 5 below were written from memory by the planner. Treat them as
a starting point, not as truth. Verify them too.

**Surroundings.** Make the station look like the real place
([SPEC 5.5](../SPEC.md#55-surroundings-make-it-look-real)): the real squares,
streets, water, parks, large buildings and bicycle parking, simplified and on
the correct side. **Draw trees only where real trees stand** (a row along a
canal, a park, a square with trees). Do not add trees for decoration where
there are none; a paved square stays paved. Use at least 4 kinds of shapes,
about 15–80 in total, and label 2–5 of them. Keep it calm: simple rounded
rectangles, no facades, no logos.

**Scene.** Follow [SPEC 5](../SPEC.md#5-scenesvg) exactly: fixed layer ids,
tracks vertical and drawn top to bottom, platform numbers increasing from
left to right, one `<rect id="platform-N">` and one `<path id="track-N">` per
platform number, nodes as plain circles, no transforms on layers, platform
rects or nodes, under 150 KB.

**Themes.** Use the classes from [SPEC 5.3](../SPEC.md#53-classes-and-colours-themes)
and nothing else. No colours in the SVG at all: no `fill="#…"`, no
`style="…"`, no `<style>`. The dark theme depends on this. Check the dark
screenshots.

**Languages.** Every `<text>` in the SVG has `data-en` with the English text
([SPEC 5.4](../SPEC.md#54-labels-in-two-languages)). Proper names stay the
same; descriptive words are translated. Every text in `station.json` is
`{"nl": "...", "en": "..."}`. Station names stay Dutch in both languages.

**Graph.** Follow [SPEC 7](../SPEC.md#7-the-walking-graph): platform nodes
`p<number><section>`, real stairs in real places, bilingual `label` and
`short`, seconds for a hurried walk, every platform reachable from every
other platform. Include every public toilet as a `toilet` node with its
three flags (`paid`, `accessible`, `outside_gates`), reachable from every
platform ([SPEC 7, Toilets](../SPEC.md#toilets)). The shell draws the WC
marker; you only place the node.

**Sample data.** Follow [SPEC 8](../SPEC.md#8-sample-arrivals-and-departures):
1–3 arrivals and 6–10 departures, minutes relative to page load, real
destinations in Dutch spelling, real train types, at most one delayed train.
The default transfer on page load must be realistic and comfortable. Include
at least one departure that makes a tight transfer.

**Checks.** Before every push:

```bash
npm run check -- amsterdam-centraal
npm run smoke -- amsterdam-centraal
npm run shots -- amsterdam-centraal
npm run shots -- amsterdam-centraal --theme dark --lang en
npm run shots -- amsterdam-centraal --via wc
```

The checker must print `0 error(s)` and the smoke test must pass. Explain any
warning in `NOTES.md`. Look at every PNG and fix what looks wrong. Also take
screenshots of one other pair, for example `--from <platform> --to <platform>`,
and check the route and the steps.

**Git.** Work on the branch you were given. If you were not given one, create
`station/amsterdam-centraal` from `main`. Commit in small steps with clear messages. Push
the branch. Do not merge into `main`. Open a pull request only if you are
asked to; the pull request check runs the contract checker. Never push to
another branch.

**Working style.** Do not stop to ask questions. Make the decision, write it
in `NOTES.md`, and continue. Finish the whole station. Report honestly what is
verified, what is marked `VERIFY`, and what you could not do.

## 4. About this station (starting facts, verify them)

**Known with good confidence**

- Amsterdam Centraal is a through station built on islands in the IJ. Tracks
  run **east–west**. The main station building (by Cuypers) is on the
  **south** side, facing the city. The IJ side, with the IJhal and the
  ferries to Amsterdam-Noord, is on the **north** side.
- Platform numbers rise from the **south** (spoor 1, next to the main
  building) to the **north** (spoor 15, next to the IJ). With numbers
  increasing left to right, the left of the scene is south and the right is
  north, so **screen-up is west** and `north_deg` is `90`. The **top** end is
  the west end and the **bottom** end is the east end.
- Beyond the **west** end: Amsterdam Sloterdijk, Haarlem, Zaandam, Alkmaar,
  Schiphol Airport, Leiden, Den Haag, Rotterdam, and the Eurostar towards
  Brussels and Paris. Beyond the **east** end: Amsterdam Amstel and Muiderpoort,
  Utrecht, Hilversum, Amersfoort, Almere, Lelystad, Eindhoven, Enschede, and
  the ICE towards Germany.
- Platforms are long and have **a** and **b** sections.
- Changing platforms means going **down** into tunnels under the tracks that
  run from the south hall to the IJ side. There are several such tunnels
  along the platforms, each with stairs, escalators and lifts.
- Train types: Intercity, Sprinter, Eurostar, ICE International, NightJet,
  European Sleeper.

**Likely, but VERIFY**

- Platform tracks: **1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 15** (11 platform
  tracks). Islands: 1/2, 4/5, 7/8, 10/11, 13/14, and 15 alone on the IJ
  side. Tracks 3, 6, 9 and 12 run between islands without a platform.
- The number, names and positions of the passenger tunnels (often west,
  middle and east). The Cuyperspassage at the far west is for pedestrians and
  bicycles and does not serve the platforms; leave it out of the graph.
- Which end is section **a**.
- Which platform the Eurostar to London uses (it has its own check-in). If
  you cannot verify it, use a normal international platform and mark VERIFY.

## 5. The scene

- Levels: `platform` (0) and `tunnel` (-1). Draw each tunnel as a `passage`
  band under all platforms, from the south building to the IJ side.
- Draw tracks 3, 6, 9 and 12 as centrelines with ids such as `track-x-3`, so
  that rails appear between the islands.
- The main building is long: draw it as a long `building` along the south
  side, with `roof` detail and the label "Amsterdam Centraal".

## 6. Surroundings to draw (verify the positions)

- **North (IJ side):** the IJhal entrance as a smaller `building`; the
  IJ as wide `water`; the ferry piers as small `block` shapes at the water.
- **South (city side):** Stationsplein as a `square`, with the tram stops as
  `road` and `road-line`; the Open Havenfront as `water` between the
  square and Prins Hendrikkade; Prins Hendrikkade as a `road` along the front;
  Damrak as a `road` leading south; the Sint-Nicolaasbasiliek as a
  `block block--tall` to the south-east; a few city blocks.
- **Bicycle parking:** the large bicycle parking at Stationsplein (and the
  underwater parking in the IJ side area, if verified) as `bike` rows.
- **Trees:** only where they really stand. The station front and the IJ side
  are mostly paved and water; check an aerial photo before adding any.
- Labels (Dutch, with `data-en`): IJ, Stationsplein, Damrak,
  Prins Hendrikkade, Sint-Nicolaasbasiliek or IJhal.

## 7. The walking graph and sample data

- For each island: nodes `p<N>a` and `p<N>b` for both numbers; `stairs` or
  `escalator` nodes on platform level at each tunnel entrance you can verify
  (at least two per island), with `short` labels such as
  `{"nl": "spoor 7/8", "en": "platform 7/8"}`; and `passage` nodes in each
  tunnel below each set. Connect passage nodes along each tunnel with `walk`
  edges. Connect tunnels to each other only where that is real (for example
  through the hall at their south end). Do not invent a cross passage.
- Toilets (verify): paid toilets on platform 2 at the east end (Wikipedia
  NL), SANIFAIR at the city end of the Westtunnel in the Cuypers building,
  and SANIFAIR on the IJ side by the bus station (OpenStreetMap). Check the
  level of each and which side of the gates it is on.
- Demo scenario (verify the platforms when you can): arrive with an
  Intercity from Utrecht Centraal (from the east end); default next train an
  Intercity towards Schiphol Airport or a Sprinter towards Haarlem (west
  end); also departures towards Den Haag Centraal, Rotterdam Centraal,
  Enschede, Groningen, Alkmaar, Lelystad Centrum, and one Eurostar towards
  Paris Nord or one ICE International towards Frankfurt (Main) Hbf. Lengths:
  Sprinter 70–100, Intercity 160–200, Eurostar or ICE 200–400 (must fit).

## 8. Steps, in order

1. Read the docs and run the template (section 2).
2. Collect the facts: platform list and order, islands, sections, passages
   and halls with their level and position, ends, compass. Write them in
   `NOTES.md` with a source or a `VERIFY` mark each.
3. Collect the surroundings from OpenStreetMap or an aerial photo: squares,
   streets, water, parks, real tree rows, large buildings, bicycle parking.
   Write them in `NOTES.md` under "Surroundings".
4. Collect the public toilets: OpenStreetMap `amenity=toilets` (`level`,
   `fee` or `charge`, `wheelchair`, `access`), the NS station page,
   Wikipedia NL and the operator's site. Decide `paid`, `accessible` and
   `outside_gates` for each, and write one line per toilet with its source
   in `NOTES.md` under "Toilets" ([SPEC 7, Toilets](../SPEC.md#toilets)).
5. Plan the scene: the viewBox, the x and width of every platform rect, the y
   range of the platforms, where the passages cross, where the surroundings sit.
6. Write `station.json`: platforms, levels, nodes (with the toilets), edges, arrivals,
   departures.
7. Draw `scene.svg`: ground and surroundings, passages, track centrelines,
   platform rects, buildings and stairs marks, labels with `data-en`, node
   circles (also one for every toilet). Keep node circles on the platform
   surfaces and inside the passages, and toilet circles off the platform badges.
8. Run the checker until it prints 0 errors. Run the smoke test and the
   screenshots in both themes and both languages, and with `--via wc`. Fix
   overlaps, wrong sides, routes that cross tracks, and steps that read strangely.
9. Run `npm run serve` and watch the arriving train come in once with motion on.
10. Set `"status": "ready"`. Finish `NOTES.md`. Commit and push.

## 9. Done

Use the checklist in [SPEC 12](../SPEC.md#12-done-checklist-for-a-station).
In your final message, give:

- the branch name and the last commit,
- the platforms you drew, in order,
- the passages and halls you modelled,
- the toilets you added (label, level, `paid`, `accessible`, `outside_gates`)
  and their sources,
- the surroundings you drew, and which sources placed them,
- every `VERIFY` item, one line each,
- any shell issue you found,
- what the screenshots show at 390 px and 1280 px, in light and dark.
