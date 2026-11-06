# Build prompt — Rotterdam Centraal (Perronjoy)

You are a careful front-end builder with an eye for maps. You build **one
station** for Perronjoy: **Rotterdam Centraal** (id `rotterdam-centraal`). Three other builders build the
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

**Files.** Create or change files **only** inside `site/stations/rotterdam-centraal/`:

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
other platform.

**Sample data.** Follow [SPEC 8](../SPEC.md#8-sample-arrivals-and-departures):
1–3 arrivals and 6–10 departures, minutes relative to page load, real
destinations in Dutch spelling, real train types, at most one delayed train.
The default transfer on page load must be realistic and comfortable. Include
at least one departure that makes a tight transfer.

**Checks.** Before every push:

```bash
npm run check -- rotterdam-centraal
npm run smoke -- rotterdam-centraal
npm run shots -- rotterdam-centraal
npm run shots -- rotterdam-centraal --theme dark --lang en
```

The checker must print `0 error(s)` and the smoke test must pass. Explain any
warning in `NOTES.md`. Look at every PNG and fix what looks wrong. Also take
screenshots of one other pair, for example `--from <platform> --to <platform>`,
and check the route and the steps.

**Git.** Work on the branch you were given. If you were not given one, create
`station/rotterdam-centraal` from `main`. Commit in small steps with clear messages. Push
the branch. Do not merge into `main`. Open a pull request only if you are
asked to; the pull request check runs the contract checker. Never push to
another branch.

**Working style.** Do not stop to ask questions. Make the decision, write it
in `NOTES.md`, and continue. Finish the whole station. Report honestly what is
verified, what is marked `VERIFY`, and what you could not do.

## 4. About this station (starting facts, verify them)

**Known with good confidence**

- Rotterdam Centraal is the third busiest station in the Netherlands and the
  hub of the south-west. It is a through station, rebuilt in 2014, with a
  large hall with a pointed roof on the **south** side (city side,
  Stationsplein, Weena) and a smaller entrance on the **north** side
  (Proveniersplein).
- The platforms lie **above** street level under one wide roof. Travellers
  change platforms by going **down** into a passenger passage under all
  tracks, from the south hall to the north entrance, and up again.
- Tracks run roughly **west–east**. Beyond the **west** end: Schiedam
  Centrum, Delft, Den Haag, Leiden, and the classic line to Schiphol and
  Amsterdam. Beyond the **east** end: Rotterdam Alexander, Gouda and Utrecht;
  the HSL towards Schiphol and Amsterdam (Intercity direct, Eurostar); and,
  through the Willemsspoortunnel and Rotterdam Blaak, Dordrecht, Breda,
  Antwerpen, Brussel and Paris.
- Platforms have **a** and **b** sections.
- Train types: Intercity, Sprinter, Intercity direct, Eurostar, European
  Sleeper.

**Likely, but VERIFY**

- Platform tracks: about **13 platform tracks with numbers between 1 and 16**;
  some numbers have no platform. Get the exact list and the islands from the
  NS map or OpenStreetMap.
- Which side holds spoor 1: likely the south (hall) side. If so, screen-up is
  west, `north_deg` is `90`, the **top** end is west and the **bottom** end is
  east. Verify before you rotate.
- Whether there is one passage under the tracks or more.
- Which platforms the international trains normally use.
- Which end is section **a**.

## 5. The scene

- Levels: `platform` (0) and `passage` (-1). Draw the passage as a wide
  `passage` band under all platforms at its real position.
- The big hall is a `building` on the south side with `roof` detail and the
  label "Rotterdam Centraal". The north entrance is a smaller `building`.
- You may draw a very light `passage passage--above` outline over the
  platform area to suggest the wide roof. Keep it quiet.

## 6. Surroundings to draw (verify the positions)

- **South (city side):** Stationsplein as a `square`, with the tram stops on
  it as `road` and `road-line`; Weena as a wide `road` running east–west in
  front of the station; Kruisplein as a `square` to the south-west; the
  Delftse Poort towers as `block block--tall` to the west; the
  Groothandelsgebouw as a large `block` to the east; a few more city blocks.
- **North:** Proveniersplein as a `square`; the Provenierswijk as a few
  `block` shapes.
- **Bicycle parking:** the large bicycle parking under Stationsplein as
  `bike` rows at its entrance.
- **Trees:** only where they really stand. Check an aerial photo for the rows
  along Weena and the trees on Kruisplein before you add them.
- Labels (Dutch, with `data-en`): Stationsplein, Weena, Kruisplein,
  Proveniersplein, Delftse Poort.

## 7. The walking graph and sample data

- For each island: nodes `p<N>a` and `p<N>b` for both numbers; the
  escalator or stair set(s) down to the passage as `escalator` or `stairs`
  nodes with `short` labels such as `{"nl": "spoor 9/11", "en": "platform 9/11"}`;
  a `passage` node below each set; `walk` edges along the passage; a `hall`
  node at the south end for the main hall. Add `lift` edges where you can
  verify lifts.
- Demo scenario (verify the platforms when you can): arrive with an
  Intercity from Den Haag Centraal (from the west); default next train an
  Intercity towards Utrecht Centraal or Dordrecht (east); also departures
  towards Amsterdam Centraal (Intercity direct), Breda, Eindhoven Centraal,
  Schiphol Airport, a Sprinter towards Dordrecht or Gouda, and one Eurostar
  towards Brussel-Zuid. Do not use Hoek van Holland: that line is a metro
  now. Lengths: Sprinter 70–100, Intercity 160–200, Eurostar 200–400.

## 8. Steps, in order

1. Read the docs and run the template (section 2).
2. Collect the facts: platform list and order, islands, sections, passages
   and halls with their level and position, ends, compass. Write them in
   `NOTES.md` with a source or a `VERIFY` mark each.
3. Collect the surroundings from OpenStreetMap or an aerial photo: squares,
   streets, water, parks, real tree rows, large buildings, bicycle parking.
   Write them in `NOTES.md` under "Surroundings".
4. Plan the scene: the viewBox, the x and width of every platform rect, the y
   range of the platforms, where the passages cross, where the surroundings sit.
5. Write `station.json`: platforms, levels, nodes, edges, arrivals, departures.
6. Draw `scene.svg`: ground and surroundings, passages, track centrelines,
   platform rects, buildings and stairs marks, labels with `data-en`, node
   circles. Keep node circles on the platform surfaces and inside the passages.
7. Run the checker until it prints 0 errors. Run the smoke test and the
   screenshots in both themes and both languages. Fix overlaps, wrong sides,
   routes that cross tracks, and steps that read strangely.
8. Run `npm run serve` and watch the arriving train come in once with motion on.
9. Set `"status": "ready"`. Finish `NOTES.md`. Commit and push.

## 9. Done

Use the checklist in [SPEC 12](../SPEC.md#12-done-checklist-for-a-station).
In your final message, give:

- the branch name and the last commit,
- the platforms you drew, in order,
- the passages and halls you modelled,
- the surroundings you drew, and which sources placed them,
- every `VERIFY` item, one line each,
- any shell issue you found,
- what the screenshots show at 390 px and 1280 px, in light and dark.
