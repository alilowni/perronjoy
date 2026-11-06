# Notes — Schiphol Airport

The contract is [docs/SPEC.md](../../../docs/SPEC.md). Plain English, one fact per line.

## Summary

Schiphol Airport is an underground through station in the Schipholspoortunnel,
under Schiphol Plaza, the public hall of the airport. It has three island
platforms with six platform tracks: 1/2, 3/4 and 5/6. There is no passage
below the platforms. Every island has escalators, fixed stairs and a lift up
into Schiphol Plaza, all in one block in the north-east part of the platform,
so changing to another island always means going up to the Plaza and down
again. Changing between the two tracks of one island is a walk across the
platform. Tracks 1/2 and 5/6 are flexible: the side of the island is decided a
few minutes before the train arrives.

The tracks run at a bearing of 38° / 218° (north-east to south-west). The
scene is rotated so the platform numbers run left to right: the **top** is the
south-west end (Hoofddorp, then Leiden and Den Haag, and the HSL to Rotterdam,
Breda, Antwerpen, Brussel and Paris), the **bottom** the north-east end
(Amsterdam Zuid and Amsterdam Lelylaan), the **left** the south-east side
(departure halls 1 and 2, Jan Dellaertplein) and the **right** the north-west
side (P1, the World Trade Center towers, the Sheraton, departure hall 3).

**How the facts were collected.** This session could reach
`api.openstreetmap.org`, `nl.wikipedia.org`, `www.ns.nl`, `www.prorail.nl` and
`www.rijdendetreinen.nl`. `overpass-api.de` reset the connection and
`schiphol.nl` was blocked, so Schiphol's own project news was read through
search excerpts only. The NS station page is a script app behind keyed APIs and
gave nothing readable. The geometry comes from an OpenStreetMap download of
the station area made on 6 November 2026. The sample trains are real trains
from the Rijden de Treinen live departures and arrivals of the same afternoon.
Facts that no source confirms are marked **VERIFY**.

## Sources

| # | Source | What it gave | Checked on |
|---|---|---|---|
| 1 | OpenStreetMap contributors: API map download of bbox 4.748,52.302,4.775,52.316 (data up to November 2026), read with a small script | platform polygons `Spoor 1`–`Spoor 6` (level −1, refs 1–6), rails with `railway:track_ref` 1–6, stop positions 1–6, the track bearing; per island two double escalators (with direction), two fixed stairs and a lift (level −1;0); three stairs under construction from the platforms to the bus station; the terminal building and the Plaza building (BAG outlines); indoor areas Departures 1–3 and Arrivals 1–4; Jan Dellaertplein; bus platforms `Schiphol Airport/Plaza`; roads Vertrekpassage, Ceintuurbaan Zuid and Noord, Havenmeesterweg, Schiphol Boulevard; P1 Kort Parkeren, WTC towers A–H, Sheraton, Privium Excellence, Terminal 1A; the park along the Schiphol Boulevard with its birches and the trees beside the Sheraton (`natural=tree`); Fietsenstalling Schiphol Plaza (196 places) | 2026-11-06 |
| 2 | Wikipedia NL, *Station Schiphol Airport* (page source) | three island platforms, six platform tracks; station in the Schipholspoortunnel under Schiphol Plaza, no separate station hall; access "3 roltrappen, 1 vaste trap, 1 lift en 4 hellingbanen per perron" (written before the 2024 works); 1/2 and 5/6 flexible since 2006; platforms first about 340 m, lengthened for two coupled high-speed sets of 400 m; the bus station on top of the station; a planned Plaza annex with a gated train area, not started in 2024; train series of the 2026 timetable | 2026-11-06 |
| 3 | Wikipedia NL, templates *Tabelrij treinserie …* (timetable 2026) | routes: Intercity 700 (Schiphol – Groningen) and 800 (Leeuwarden), 3100 (Den Haag Centraal – Nijmegen), 3200, 3500 (Dordrecht – Venlo); Intercity direct 1800 (Breda – Amersfoort Schothorst) and 2400 (Rotterdam Centraal – Lelystad Centrum); Eurocity direct 9500; Sprinter 4100 (Hoofddorp – Hoorn Kersenboogerd via Lelylaan, Sloterdijk, Zaandam), 4300 (Den Haag Centraal – Lelystad Centrum), 5700 (Leiden Centraal – Utrecht Centraal), Airport Sprinter 8100–8400 (Hoofddorp – Amsterdam Centraal via Lelylaan, Sloterdijk); Eurostar 9300 (Amsterdam Centraal – Paris-Nord) and 9900; night trains. No daytime Intercity runs between Amsterdam Centraal and Schiphol | 2026-11-06 |
| 4 | Rijden de Treinen, live departures and arrivals for Schiphol Airport (`/en/ajax/departures?station=SHL`, `/en/ajax/arrivals?station=SHL`), 6 November 2026, 15:15–17:14 | 74 departures and 97 arrivals with train numbers, platforms and rolling stock: trains towards Amsterdam Zuid on 1/2, Airport Sprinters to Amsterdam Centraal and Sprinters to Hoorn on 3, Sprinters to Hoofddorp on 4, trains towards Leiden, Den Haag, Rotterdam, Breda, Brussel, Paris and London on 5/6; trains from the north-east arrive on 4, 5 and 6, from the south-west on 1, 2 and 3; no platform section letter in any record | 2026-11-06 |
| 5 | Rijden de Treinen, live departures for Amsterdam Centraal, Utrecht Centraal and Leiden Centraal, same afternoon | comparison: Amsterdam and Leiden show sections (2a, 10b, 4a); Schiphol shows none | 2026-11-06 |
| 6 | ProRail news, *Schiphol bus station being renovated to improve accessibility* (20 March 2024) | the bus stops make way for one large covered bus platform; three new stairways link the bus station directly to the train platforms, with check-in gates; in use from 2027; many bus stops moved temporarily during the works; the lifts, escalators and stairs between Schiphol Plaza and the platforms are renewed in the same project (Multimodal Hub Schiphol) | 2026-11-06 |
| 7 | Schiphol project news (search excerpts only; schiphol.nl was blocked): 4 July 2024, 2 December 2024, July 2025, 25 November 2025, 19 June (no year in the excerpt) | the ramps were replaced by fixed stairs, the stairs widened and single escalators made double (work completed June 2024); BAM builds the three stairs to the bus station from April 2025 to summer 2026, in old openings in the tunnel roof; in November 2025 the connection was "taking shape", and on 19 June the stairways were completed, so June 2026; the new bus station is expected in autumn 2027 | 2026-11-06 |

## Facts

| Fact | Value | Source | Status |
|---|---|---|---|
| Platforms, left to right (south-east to north-west) | 1, 2, 3, 4, 5, 6 | 1, 2 | verified |
| Islands | 1/2, 3/4, 5/6; no side platform | 1, 2 | verified |
| Side of spoor 1 | south-east; spoor 6 on the north-west side | 1 (platform refs, track refs and stop positions agree) | verified |
| Track order | track 1, island 1/2, track 2, track 3, island 3/4, track 4, track 5, island 5/6, track 6 | 1 | verified |
| Sections | none in use: every train gets a whole track (1/2 and 5/6 flexible) | 4, 5 | likely; signs VERIFY |
| Transfer hall | Schiphol Plaza, **above** the platforms (level +1), about 86–218 m north-east of the middle of the platform outlines | 1, 2 | verified |
| Access per island | two fixed stairs (73–88 m and 138–153 m), two double escalators (91–101 m and 122–133 m), one lift (115 m), all north-east of the platform middle | 1, 7 | verified; directions of the stairs VERIFY |
| Escalator directions | the first pair rises towards the north-east (foot at 91 m, top at 101 m), the second towards the south-west (foot at 133 m, top at 122 m) | 1 | verified (OSM `incline`) |
| Stairs to the bus station | one per island, about 3–29 m, completed June 2026; for use with the new bus station from 2027 | 1, 6, 7 | not in the graph; open now VERIFY |
| Other passages | none: no tunnel or bridge between the islands | 1, 2 | verified |
| Top end (south-west) leads to | Hoofddorp, then Leiden and Den Haag; the HSL (after Hoofddorp) to Rotterdam, Breda, Antwerpen, Brussel and Paris | 3, 4 | verified |
| Bottom end (north-east) leads to | Amsterdam Zuid (Utrecht, Almere, Lelystad, Zwolle, Hilversum, Amersfoort) and Amsterdam Lelylaan (Sloterdijk, Amsterdam Centraal, Zaandam, Hoorn) | 3, 4 | verified |
| `north_deg` | 142: the platform outlines run at a bearing of 38.0°; screen-up is bearing 218° | 1 | verified |
| Platform lengths (OSM outlines) | 1 and 2: 432 m; 3: 438 m; 4: 428 m; 5: 452 m; 6: 451 m | 1, 2 | approximate |
| Track use | 1/2 towards Amsterdam Zuid (and the Eurostar to Amsterdam Centraal), 3 Sprinters to Amsterdam Centraal and Hoorn, 4 Sprinters to Hoofddorp, 5/6 towards Leiden, Den Haag, Rotterdam, Breda, Brussel, Paris, London | 4 | verified for 6 November 2026 |
| Surface around the Plaza | the terminal with departure halls 1–3 above arrival halls 1–4 fans out around the Plaza; the bus station and Jan Dellaertplein lie in front of it, on top of the station box | 1, 2, 6 | verified; the bus station is being rebuilt |

## Scale

- Along the tracks: 1 unit = 1 metre. Scene `y = 300 + u`, where `u` is
  metres along the tracks from 52.30872 N 4.76111 E (the middle of the six
  platform outlines), positive towards the north-east (bearing 38°). The scene
  runs from u = −300 (top) to u = +360 (bottom).
- Platform extents in u: 1 and 2 −185..247; 3 −184..254; 4 −183..245;
  5 −183..269; 6 −183..268. Schiphol Plaza: front edge at u = 86, back edge
  213–218. Access block per island: u = 73..153; stairs to the bus station
  u = 3..29.
- Across the tracks: the station is widened about **×2.8**. Real track
  centres (positive to the south-east): 1 +29.5 m, 2 +15.4, 3 +10.6, 4 −5.8,
  5 −10.7, 6 −26.9; drawn at x 0, 46, 56, 102, 112, 158. Each platform rect
  is 18 units wide (islands of 11–13 m drawn 36 wide); track centres are 5
  units from the platform edge and 10 units apart between the islands (4.8 m
  real).
- Surroundings are true along the tracks; beyond the outer tracks they are
  compressed **×0.6** across them. Shapes over the station box itself would be
  hidden by the platforms, so they are cut at the track area where they would
  only show as slivers.
- The airport's buildings and roads stand about 20° off the track direction
  and are drawn that way; the across compression turns that into about 13°.
- All tracks are drawn straight; in reality they curve slightly and converge
  beyond the platform ends.

## Surroundings

57 shapes in 7 kinds as the checker counts them (11 block, 2 building,
3 square, 5 road, 1 park, 31 tree, 4 bike), plus 3 roofs. All from source 1.

- Around the Plaza (bottom): the terminal as one building that fans out on
  both sides of Schiphol Plaza, with the roofs of departure halls 1 and 2
  (left) and 3 (right); arrival halls 1–2 and 3–4 lie under them. Labels
  "Vertrekhal 1–2 / Aankomsthal 1–2" and "Vertrekhal 3 / Aankomsthal 3–4".
- In front of the Plaza: the bus station (label "busstation") and the
  Jan Dellaertplein as squares, both mostly on top of the station box, so only
  their ends beside the tracks show.
- Left (south-east): the elevated Ceintuurbaan Zuid that becomes the
  Vertrekpassage, the departures road in front of halls 1 and 2; the
  Havenmeesterweg bus loop; Terminal 1A at the left edge.
- Right (north-west): P1 Kort Parkeren (label "P1") and the eight towers of the
  World Trade Center (Toren A–H) as tall blocks; the Sheraton as a tall block;
  Privium Excellence (34 m car park) as a tall block; the Vertrekpassage in
  front of hall 3 rising into the Ceintuurbaan Noord; the Havenmeesterweg; the
  Schiphol Boulevard looping around the park.
- Trees only where OSM has them: 23 of the birches in the park along the
  Schiphol Boulevard, and 8 of the broadleaved trees beside the Sheraton.
- Bicycle parking: Fietsenstalling Schiphol Plaza (196 places) beside the
  Sheraton, and the racks by the bus station.
- Not drawn: the piers and aprons (outside the scene); the 12 trees on top of
  the south-west end of the station box (they would cover the platforms);
  P6 (underground); the Panorama Boulevard roof terrace; the pond beyond the
  top edge; the A-terminal plot left of the tracks (OSM `landuse=greenfield`,
  surface unknown, left as plain ground); the building site of the bus station.

## Decisions

- Rotation: platform numbers increase from the south-east to the north-west,
  so the south-west end is at the top and `north_deg` is 142. The north arrow
  points down and to the right.
- No sections. The prompt expected a and b sections, but the live data (source
  4) has no section letter in any of its 171 records, while Amsterdam Centraal and
  Leiden Centraal do (source 5). Each platform has one node, `p1` … `p6`, in
  the middle of the platform, as SPEC 7 asks for a platform without sections.
  The two numbers of an island share the height of their nodes.
- Walking graph: per island one escalator node at the foot of the south-west
  pair of escalators (u = 91), one lift node (u = 115), and a Plaza node 4 m
  past the escalator top (u = 105), so the step markers do not overlap. The
  three Plaza nodes are chained across the islands. The two numbers of an
  island are joined directly (a walk across the island, 10 s).
- The fixed stairs and the north-east pair of escalators are drawn but not in
  the graph. The platform nodes are south-west of the access block, so the
  north-east pair is never on a shortest route, and the fixed stairs are
  15–18 m nearer than the escalators but would win every route by a few
  seconds; with luggage, as most travellers at Schiphol have, the escalators
  are the normal way and the step text names them.
- The lifts are in the graph (75 s with waiting) but never on the fastest
  route; they are there for a later step-free route (see IDEAS.md).
- The three stairs to the bus station are drawn, because they are built, but
  not in the graph: they lead to the bus station, which opens in autumn 2027.
- Walking times: 1.2 m/s along the platforms (real distances); 30 s per
  escalator; 75 s per lift; 26 s for each island-to-island step through the
  Plaza (20–22 m real). The Plaza time is slower than 1.0 m/s because the
  checker measures speed in scene units and the scene is widened ×2.8; the
  Plaza is crowded with luggage, so it is fair (Utrecht, Rotterdam and
  Amsterdam did the same). A script checked all 30 platform-to-platform routes
  in both languages: no line on platform level leaves its island, no Plaza line
  leaves the Plaza, and every step reads correctly.
- End labels: top "Leiden, Rotterdam, Brussel" (one name for the classic line,
  one for the HSL, one international); bottom "Amsterdam, Utrecht, Zwolle".
  "Hoofddorp, Leiden, Rotterdam" (259 px) and "Amsterdam, Utrecht, Almere" in
  English (251 px) ended in "…" in the 250 px label box on a 390 px phone.
- Station labels: "Schiphol Airport" and "Schiphol Plaza" are written on the
  Plaza between islands 1/2 and 3/4, where the default transfer view shows them
  and no stairs, badges or standing trains cover them.
- Sample data, all real train numbers from source 4 (6 November 2026), with
  sample times: arrivals Sprinter 8157 from Amsterdam Centraal and Sprinter
  4157 from Hoorn Kersenboogerd, both on 4 (real); departures Intercity direct
  2454 to Rotterdam Centraal, Eurostar 9370 to Parijs-Noord, Sprinter 8254 to
  Amsterdam Centraal (3, real), Intercity 761 to Groningen, Sprinter 4361 to
  Lelystad Centrum, Intercity 3152 to Den Haag Centraal. Which track of 1/2 or
  5/6 each train uses is a sample choice; the delay of 3 minutes on Intercity
  3152 is invented. Lengths follow the rolling stock in source 4 (SNG 3+4
  about 140 m, SLT-6 101 m, ICNG 5+5 about 218 m, VIRM 4+6 271 m, one
  high-speed set 200 m); the stock of 2454 was not shown, 170 m is assumed.
- The prompt's demo arrival was an Intercity from Amsterdam Centraal. No
  daytime Intercity runs between Amsterdam Centraal and Schiphol in the 2026
  timetable (source 3), so the arrival is the Airport Sprinter from Amsterdam
  Centraal on 4. The Intercity direct towards Rotterdam runs via Amsterdam
  Zuid, not Amsterdam Centraal (source 3), so changing here from the Airport
  Sprinter is a real way to reach it.
- Default transfer: Sprinter 8157 from Amsterdam Centraal at 4 to Intercity
  direct 2454 to Rotterdam Centraal at 6: along platform 4 to the escalators,
  up into Schiphol Plaza, across, down to 5/6; 174 s walking (shown as
  3 min), 8 min available, comfortable.
- Tight transfer: Sprinter 4157 from Hoorn Kersenboogerd arrives at 4 in
  5 minutes; to Eurostar 9370 at 5 in 9 minutes it has 4 minutes for a 3-minute
  walk (tight), to Intercity direct 2454 3 minutes (tight). It cannot be a
  departure for the default arrival: without sections every other departure
  needs about 3 minutes through the Plaza, so a tight one would leave sooner
  than the default and become the default (see Shell issues).
- No departure on track 4: a departure on the arrival's track and section
  stops the arriving train from being drawn, and track 4 has no sections. In
  reality Sprinters to Hoofddorp leave from 4 every few minutes (the arriving
  Sprinters continue there), so list mode showing "no departure" for platform
  4 is a sample-data gap.
- Tracks 5/6 carry three of the six departures. Intercity 3152 (24 min) and
  Eurostar 9370 (9 min) both stand on track 5 at load; the longer Intercity is
  drawn on top and covers the Eurostar until it leaves. The prompt's Sprinter
  to Leiden Centraal and Sprinter towards Hoofddorp are left out for the same
  reason: on 5/6 they would cover the default train, and on 4 they would stop
  the arrival from being drawn. Intercity 3152 calls at Leiden Centraal.
- The prompt drew Schiphol Plaza over the middle of the platforms. OSM puts it
  over their north-east third (u = 86..218 of −185..269), with the escalators
  in the same part; the scene follows OSM.
- `scene.svg` and `station.json` were written by a small script that is not in
  the repository. Both files are plain: edit them by hand, and keep the node
  circles and `station.json` in step.

## VERIFY

- Platform sections: none in the live data. Check the platform signs for a/b
  letters; if they exist and are used, add `p1a`/`p1b` … like the other
  stations.
- Which end of each fixed stair is the top (OSM has no `incline` for them).
  Check on a platform or on the NS station map.
- Access per island after the 2024 renovation: two double escalators, two
  fixed stairs, one lift (OSM); Wikipedia NL still gives the older count with
  ramps. Check the NS station map.
- Whether the three stairs to the bus station (completed June 2026) are open
  before the bus station opens in autumn 2027. Check NS travel information or
  the signs at the station.
- Where trains stop along the 430–450 m platforms; the nodes sit in the middle,
  a short train may stop nearer one end. Check the stop boards (stopborden).
- Rolling stock of Intercity direct 2454 (170 m assumed) and the lengths of
  the other stock types (approximate). Check Rijden de Treinen for a day.
- Bus station and Jan Dellaertplein: drawn from the OSM bus platforms; the bus
  station is a building site until autumn 2027 and many stops have moved.
  Check current OSM or an aerial photo.
- The A-terminal plot west of the tracks (OSM `landuse=greenfield`): grass,
  sand or building works? Check an aerial photo before drawing it.
- The planned Plaza annex with a gated train area (Wikipedia NL: not started in
  2024) and the check-in gates near the new stairs (ProRail). Check whether
  gates now sit between the Plaza and the escalators.

## Shell issues

- The shell draws every departure at once, standing at its platform node. At a
  station without sections two departures on one track stand on top of each
  other (track 5 here), and any departure on the arrival's track stops the
  arriving train from being drawn, so track 4 has no sample departure.
  Suggestion: draw only the next departure on each track and section, and let
  later ones arrive after it leaves. Added to ISSUES.md.
- SPEC 8 says a tight transfer must use the arrival's own platform number (the
  other section) or leave after the default with a longer walk. Without
  sections, and with every island-to-island walk taking the same time, neither
  is possible for the default arrival, so the tight transfer here uses the
  second arrival. Added to ISSUES.md (docs).
- Already in ISSUES.md and seen here as well: the checker measures walking
  speed in scene units (Plaza walks slowed to 26 s); the last step names the
  whole end label ("Je trein vertrekt richting Leiden, Rotterdam, Brussel" for
  a train that takes the HSL); the 250 px end label box on a phone; the empty
  margins of the whole-station view on a desktop; `npm run shots` cannot
  capture the whole-station view (a small Playwright script did).
