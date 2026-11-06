# Issues

Known problems, one line each: `- [area] problem`.
Areas: `shell`, `station:<id>`, `tools`, `docs`, `ci`.
Add new lines at the end. When an issue is fixed, strike it through and keep it:
`- ~~[shell] problem~~ (fixed in <commit or PR>)`.
Future features go in [IDEAS.md](IDEAS.md), not here.

- [tools] The checker measures walking speed in scene units, so a station widened across the tracks gets speed warnings at real walking speeds (Utrecht, Rotterdam and Amsterdam raised their tunnel times instead).
- ~~[tools] The checker counts `road-line` shapes as `road` when it counts the surroundings, because its `\broad\b` pattern also matches `road-line`.~~ (fixed in f2b1720)
- [tools] `npm run shots` cannot capture the whole-station view, so that view is never checked in the screenshots.
- ~~[shell] `buildShadows` also gives section rects (`platform-5a`) their own shadow; stations inset them by 1 unit to hide it.~~ (fixed in fa8cf94)
- [shell] A passage below the platforms is hidden by the track art and the platform rects; only the route line shows where it is.
- [shell] There is no quiet outline class for a roof over the platforms (`passage passage--above` washes them out), so stations leave their roofs out.
- ~~[shell] `buildSteps` words a step after the node just before it: after a waypoint it says "Loop naar …" instead of "Loop over het perron naar …".~~ (fixed in e95e43a)
- [shell] There is no way to mark a platform or a passage as closed (Amsterdam: platform 13/14 and the Oosttunnel in 2026).
- [shell] On a 390 px phone the end label box is 250 px wide, so a longer "Richting …" text ends in "…".
- [shell] Platform badges sit at 18 % and 82 % of the platform height, so a route marker on a platform node near those points covers the badge.
- [shell] `sprinklePeople` uses only numbered platform rects, so an extra platform surface (Amsterdam platform 2 east of the buffer stop) has no people.
- [shell] The whole-station view of a long, narrow station leaves wide empty margins on a desktop map.
- ~~[docs] SPEC 5.2 says every track path runs the full height of the scene, but a dead-end track cannot (Amsterdam track 1, Utrecht tracks 1–4); the shell already handles shorter paths.~~ (fixed in 6dbf0ea)
- ~~[docs] SPEC 8 does not say that the tight sample transfer must use the arrival's platform number or leave after the default, because the default "your train" is the soonest departure on another number.~~ (fixed in a3d1641)
- [station:amsterdam-centraal] The Oosttunnel is closed for widening and left out of the walking graph; add it when it reopens (its lifts are expected back in June 2027).
- [station:amsterdam-centraal] Platform 13/14 has had no trains since 6 October 2026 and is not used in the sample data; check again in 2027.
- [shell] Arriving and departing trains are animated straight through a train that stands in the other section of the same track (5a and 5b), and the checker does not warn about it.
- [shell] The last step always says "Je trein vertrekt richting" plus the whole end label, so at a junction it names branches the train does not take (Utrecht: a train to Den Haag Centraal leaves "richting Amsterdam, Gouda, Zwolle").
- [tools] Nothing checks that route lines stay on platforms, halls and passages and never cross a track; Utrecht has 992 platform-to-platform routes, and the screenshots show only a few of them.
- [tools] Nothing checks that an arriving train comes in from its `from_end` and stops at its platform node; the smoke test only sees that it moves, and a cloud session cannot "watch it come in" as SPEC 11 asks.
- ~~[docs] The examples in SPEC 6 and 8 use `utrecht-centraal` with `north_deg` 0 and Amsterdam and Amersfoort at the top; the real station has `north_deg` 210 with them at the bottom, so copying the example gives wrong values.~~ (fixed in cfd2b18)
- ~~[docs] The station prompts say "use web access if you have it" but not which hosts a build needs (www.ns.nl, api.openstreetmap.org, overpass-api.de, nl.wikipedia.org, www.prorail.nl); the Utrecht and Rotterdam sessions had them blocked and fell back to search excerpts.~~ (fixed in 9769e6f)
- [station:utrecht-centraal] Stairs from the Moreelsebrug down to the platforms are approved (expected 2027–2028); when they open, the bridge is a transfer route and must join the walking graph.
- [station:utrecht-centraal] The planned building on the Jaarbeursplein (end of 2027) and the Jaarbeurskant plans for 2027–2030 will change the square and blocks drawn on the west side.
- [station:utrecht-centraal] The sample trains follow the 2026 timetable (series and platforms seen in the 2022–2026 archive); check them again after the timetable change of 13 December 2026.
- ~~[tools] A request with broken percent-encoding (`/%E0%A4%A`) crashes the dev server: `decodeURIComponent` throws in the request handler and `npm run serve`, which listens on 0.0.0.0, stops.~~ (fixed in c37e24b)
- ~~[tools] The dev server tests the path with `startsWith(SITE)` and no separator, so `/..%2fsite-private%2fx` serves a file from a sibling folder whose name starts with `site`.~~ (fixed in f1797ac)
- ~~[tools] The checker does not check that track paths run from top to bottom (SPEC 5.1): with `track-1` reversed the template still passes, and its arrival from the top comes in from the bottom.~~ (fixed in 7698520)
- ~~[tools] The checker does not flag a `transform` on a platform rect or a node circle (SPEC 5.2); the shell reads their plain coordinates, so the badges and the route land beside the drawn platform.~~ (fixed in e544091)
- ~~[tools] The checker only looks for colours in `fill` and `stroke`: a gradient (`fill="url(#g)"` with `stop-color`), a `<filter>` with `flood-color` and a `font-family` all pass, although SPEC 5.3 forbids colours, filters and fonts in the scene.~~ (fixed in 0f3579e)
- ~~[tools] The checker does not check that a platform node lies on its platform rect; the template passes with `node-p3` moved onto the road beside the station.~~ (fixed in 8d6b411)
- ~~[tools] The checker does not check the order of the layer groups (SPEC 5.2): with `layer-labels` moved before `layer-platforms` the template passes and its labels are painted under the tracks and platforms.~~ (fixed in 9058291)
- [tools] The checker asks for at least 4 departures and any number of arrivals, while SPEC 8 asks for 1–3 arrivals and 6–10 departures; nothing checks that the default transfer is comfortable and that one tight transfer exists.
- ~~[shell] Choosing another arrival in the selector draws no train at its platform; the train of the first arrival keeps standing where it stopped.~~ (fixed in 68ef7c4)
- ~~[shell] The north arrow's title is set once, so after a language switch it still says "Noord".~~ (fixed in 0774c42)
- ~~[shell] The map note for a station that does not exist or does not load ("Dit station bestaat niet.") does not follow a language switch.~~ (fixed in 26d529e)
- [shell] Trains are drawn as whole 26 m cars, so a train can be up to 13 m longer than its `length_m`; Rotterdam's 200 m Eurostar at 2a is drawn 208 m long and runs past the platform end.
- ~~[shell] `site/js/i18n.js` defines `dep.arrival`, `dep.onTime` and `list.title`, but no page uses them.~~ (fixed in 40cd0cf)
- [shell] The fallback link in `site/404.html` points to `/`, which on the project site (`…github.io/perronjoy/`) leads to the GitHub user root; only the script sends a visitor to Perronjoy.
- ~~[docs] SPEC 5.3 lists the allowed elements without `title`, but the template and every station start their scene with `<title>`.~~ (fixed in cb1d6fb)
- ~~[docs] SPEC 5.3 allows `fill="none"`, but every scene class sets its own fill, which wins over the attribute, so `fill="none"` cannot turn a shape with a class into an outline.~~ (fixed in 0e83190)
- ~~[docs] SPEC 7 gives stairs 20 s down and 30 s up, but an edge has one `seconds` value for both directions, so a station can give only one of them.~~ (fixed in 6eb2566)
- ~~[docs] Section 3 of the four station prompts says to change files only in the station folder and to report shell problems in `NOTES.md`; it does not mention `ISSUES.md`, which AGENTS.md and SPEC 2 now ask builders to use.~~ (fixed in ae2a15d)
- ~~[docs] `docs/prompts/rotterdam-centraal.md` puts the Delftse Poort west and the Groothandelsgebouw east of the station and expects `north_deg` 90; the build found the opposite sides and about 108 (see the station's NOTES.md).~~ (fixed in 25d37ef)
- [docs] AGENTS.md calls the template a station that follows every rule, but it has 4 departures and no tight transfer, against SPEC 8.
- ~~[ci] The workflow gives `pages: write` and `id-token: write` to every job, so the pull request check, which runs the branch's own checker, gets them too; only the deploy job needs them.~~ (fixed in 2406f63)
- [station:rotterdam-centraal] Platform ends, the passage position and the surroundings are estimated from coordinates and search excerpts, because OpenStreetMap, the NS map and aerial photos were blocked; redraw them from OpenStreetMap when a session can reach it.
- [station:rotterdam-centraal] The sample trains follow the series and platforms of the 2021–2025 archive; check them again after the timetable change of 13 December 2026.
- [shell] The shell draws every departure at once at its platform node, so at a station without sections two departures on one track stand on top of each other, and any departure on the arrival's track stops the arriving train from being drawn (Schiphol Airport: track 5 holds two, track 4 has no sample departure).
- [docs] SPEC 8's rule for the tight sample transfer (the arrival's own number in the other section, or later with a longer walk) cannot be met for the default arrival at a station without sections where every island-to-island walk takes the same time; Schiphol Airport uses a second, later arrival.
- [station:schiphol-airport] The three stairs from the platforms to the new bus station (completed June 2026) come into use with the bus station in autumn 2027; then check the drawing, the check-in gates and whether they belong in the walking graph.
- [station:schiphol-airport] The sample trains follow the live departures and arrivals of 6 November 2026; check them again after the timetable change of 13 December 2026.
