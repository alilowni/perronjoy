# Notes — Rotterdam Centraal

The contract is [docs/SPEC.md](../../../docs/SPEC.md). Plain English, one fact per line.

## Summary

Rotterdam Centraal is a through station with seven platforms and thirteen
platform tracks: a side platform along the station building (track 2) and six
island platforms, 3/4, 6/7, 8/9, 11/12, 13/14 and 15/16. Tracks 5 and 10 are
through tracks without a platform. Track 1 was removed in 2018, when the side
platform was widened to track 2. The platforms lie above street level. One
wide passenger passage (about 48–50 m) runs under all tracks, at street level,
from the main hall on the Stationsplein (south, city side) to the north
entrance on the Proveniersplein. Every platform has escalators on the west side
of the passage and stairs on the east side.

The scene is rotated so the platform numbers run left to right: the **top** is
the west-south-west end (Schiedam, Delft, Den Haag), the **bottom** the
east-north-east end (Gouda and Utrecht, the HSL to Schiphol, the
Willemsspoortunnel to Dordrecht and Breda), the **left** the city side and the
**right** the Proveniersplein side.

**How the facts were collected.** The build environment could not open the NS
station page and map, OpenStreetMap, the Overpass API, Wikipedia, PDOK
(ProRail open data) or aerial photos: the network policy blocked
`www.ns.nl`, `www.openstreetmap.org`, `api.openstreetmap.org`,
`overpass-api.de`, `nl.wikipedia.org`, `api.pdok.nl` and `download.geofabrik.de`.
All facts come from web search excerpts of the sources below, plus published
coordinates. Facts that no source confirms, and all geometry that had to be
estimated, are marked **VERIFY**.

## Sources

| # | Source | What it gave | Checked on |
|---|---|---|---|
| 1 | Wikipedia NL, *Station Rotterdam Centraal* (Wikiwand and mirror excerpts) | 7 platforms, 13 platform tracks, one of them a dead end; tracks 5 and 10 without platform; track 1 removed early 2018 when the side platform along the building was widened to track 2; new passage opened November 2012, six times as wide as the old cyclists' tunnel; west side of the passage: three escalators (two down) to most platforms; east side: one up escalator and one fixed stair at most platforms | 2026-11-05 |
| 2 | Seat61, *Rotterdam Centraal station guide* | platforms numbered 2 to 16 from the southern (main) side; each platform has an a end and a b end, "3a is the eastern end of platform 3, 3b is the western end"; one broad passage under all tracks with steps, escalators and lifts to every platform; Eurostar terminal reached from platform 2 | 2026-11-05 |
| 3 | Railway Gazette (2018), Eurostar station pages, NS International map of the Eurostar terminal | the side platform widened 4 m to face track 2; London check-in and security on platform 2; Eurostar to Paris usually leaves from platform 2 | 2026-11-05 |
| 4 | West 8 (Team CS), Arcadis project page, Treinreiziger *In beeld: nieuwe reizigerspassage* (November 2012) | passage 48 m (West 8) or 50 m (Arcadis) wide under the tracks; extra entrance on the Proveniers side; the existing Provenierstunnel stays a public, gate-free cycle and pedestrian tunnel | 2026-11-05 |
| 5 | SBE project document on the steel structure | platform roof about 250 m long, 155 m wide, up to 17 m high | 2026-11-05 |
| 6 | ProRail, *Capaciteitsanalyse en -vergrotingsplan Rotterdam European Sleeper* (13 February 2025) | track 11 is 414 m long and is the only track where the European Sleeper with 15 carriages fits; track 13 has a usable platform length of 398 m | 2026-11-05 |
| 7 | Rijden de Treinen, train archive for Rotterdam Centraal 2021–2024 (search excerpts) | Intercity direct to Breda on 3 or 4; Intercity direct to Amsterdam on 12; Intercity to Utrecht on 13 or 14; Sprinter to Gouda Goverwelle on 15; Sprinter 4024 to Uitgeest on 16 (16 July 2023); Sprinters to Dordrecht on 2, 6, 7 and 9 (Sprinter 5027 on 2, 25 September 2024); Intercity 1123 and 1131 to Eindhoven on 8 and 6 (2024) | 2026-11-05 |
| 8 | Published coordinates: Wikipedia EN (station 51°55′28″N 4°28′10″E), Structurae (Groothandelsgebouw 51°55′23″N 4°28′04″E), Wikipedia via Wikiwand (Delftse Poort 51.92397 N, 4.47195 E), postcode data (Stationsplein 3013 AJ), Open Charge Map (Proveniersplein 5), Sygic (Hofplein) | compass direction of the tracks; positions of the buildings and squares along the tracks | 2026-11-05 |
| 9 | Rijksmonumentenregister, monument 530940; Wikipedia EN *Groothandelsgebouw* and *Weena (Rotterdam)*; Markel visitor directions (Delftse Poort) | Groothandelsgebouw 220 m long, 85 m wide, between the Stationsplein, the Weena and the railway; the Weena runs east–west from the Hofplein to the Beukelsdijk; Delftse Poort (Weena 505) entrance on the corner of the Stationsplein and the Weena, next to the station | 2026-11-05 |
| 10 | The Architect's Newspaper (2014) and Dutch architecture press on Team CS | trams moved to the east side of the station square; tram and bus stops on the east and west sides of the hall, so the square is one open space; the pointed roof points to the city centre | 2026-11-05 |
| 11 | Gemeente Rotterdam, decision of 2018 (gmb-2018-121555) and a 2015 report | underground bicycle parking on the south side of the station, entrance on the Stationsplein (Stationsplein 298), 5,190 places | 2026-11-05 |
| 12 | Nophadrain project page (Kruisplein garage); Rotterdam council letter (2025) | the Kruisplein is a green pedestrian boulevard encircled by rows of trees, on top of the 760-place garage; car-free since December 2024 | 2026-11-05 |
| 13 | Gemeente Rotterdam, plan *Proveniersplein* (NL.IMRO.0599.PB5047, 2013); Staatscourant 2013-32497; water board permits 2015–2016 | Proveniersplein on the north side of the station; new water dug on the square, two bridges, existing waterways joined | 2026-11-05 |
| 14 | Bestemmingsplan *Provenierswijk-Bentincklaan* (NL.IMRO.0599.BP1050); funda listing; Gemeente Rotterdam felling permit (gmb-2017-120401) | the Provenierssingel and the Spoorsingel form the south edge of the Provenierswijk; the Provenierssingel is tree-lined; the Spoorsingel has trees | 2026-11-05 |
| 15 | Route lists and timetables (tracestrack, Rijden de Treinen statistics, Eurostar timetable), OV in Nederland wiki as used for Utrecht Centraal | Intercity 1100 Den Haag Centraal – Eindhoven Centraal (Intercity 1171 a real member); Intercity direct series 900 Amsterdam – Breda; Eurostar 9316, 9328, 9340 and 9352 Rotterdam – Parijs-Noord; series 2800 Rotterdam – Utrecht | 2026-11-05 |
| 16 | OpenStreetMap contributors: API map download of the station area, 6 November 2026, read with a small script: public toilets (amenity=toilets with level, fee or charge, wheelchair, access) and check-in gates (barrier=turnstile) | the SANIFAIR toilets on level 1 of the station hall, the escalator up to them, the platform escalators, the track bearing (73.8°) | 2026-11-06 |
| 17 | NS, Toiletten (www.ns.nl, 6 November 2026): SANIFAIR toilets with staff at the large stations, EUR 1.10 a visit | the toilets at large stations are SANIFAIR, staffed and paid | 2026-11-06 |

## Facts

| Fact | Value | Source | Status |
|---|---|---|---|
| Platforms, left to right (south to north) | 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16 | 1, 2 | verified |
| Missing numbers | 1 (removed 2018); 5 and 10 are through tracks without platform | 1 | verified |
| Side of spoor 2 | south, the city side, along the station building | 1, 2, 3 | verified |
| Islands | 3/4, 6/7, 8/9, 11/12, 13/14, 15/16; track 2 has a side platform | 1 | derived: 7 platforms and 13 tracks leave only this pairing; VERIFY |
| Dead-end track | one of the thirteen platform tracks is a dead end; which one is not known | 1 | VERIFY |
| Sections | **a** = eastern half (bottom of the scene), **b** = western half (top) | 2 | likely, VERIFY |
| Transfer passage | one passage, 48–50 m wide along the tracks, under all tracks at street level (one level below the platforms), from the main hall to the north entrance | 1, 2, 4 | verified; its position along the platforms VERIFY |
| Access to the passage | west side: three escalators (two down, one up); east side: one up escalator and one fixed stair; lifts on every platform | 1, 2 | verified for "most platforms"; lift positions VERIFY |
| Other passages | the Provenierstunnel, a public cycle and pedestrian tunnel without access to the platforms | 4 | verified; not drawn |
| Top end (west-south-west) leads to | Schiedam Centrum, Delft, Den Haag, Leiden; the old line to Haarlem, Uitgeest and Amsterdam | 7 | verified (Sprinter to Uitgeest, Intercity to Den Haag) |
| Bottom end (east-north-east) leads to | Rotterdam Noord and Alexander to Gouda and Utrecht; the HSL to Schiphol and Amsterdam; the Willemsspoortunnel to Rotterdam Blaak, Dordrecht, Breda, and the HSL to Antwerpen, Brussel and Parijs | 1, 7, 15 | likely; the HSL to Schiphol at this end VERIFY |
| `north_deg` | 108: the tracks run at a bearing of about 72° / 252°, screen-up is bearing 252° | 8, 9 | estimated, VERIFY |
| Platform lengths | about 400 m; island 11/12 414 m, island 13/14 398 m | 6 | approximate |
| Platform roof | about 250 m × 155 m over all tracks | 5 | verified; not drawn |
| International trains | Eurostar to London from platform 2 (terminal with security); Eurostar to Paris usually also from 2; the European Sleeper only fits on 11 | 3, 6 | verified |

## Scale

- Along the tracks: 1 unit = 1 metre. Scene `y = 300 + w`, where `w` is metres
  along the tracks from the middle of the passage, positive towards the
  east-north-east. The scene runs from w = −300 (top) to w = +300 (bottom).
- Platform extents in w: 2–9 and 15/16 −200..+200, 11/12 −207..+207,
  13/14 −199..+199. Passage −24..+24. Main hall −54..+54. The a/b split is at
  the middle of the passage (w = 0).
- Across the tracks: the platform area is widened about **×2.5** (track
  spacing 4.5 m drawn as 10 units, islands of about 11 m drawn as 32 units,
  the side platform 2 drawn as 22 units). Track centres are 5 units from the
  platform edges and at least 10 units apart.
- Surroundings are true along the tracks and compressed across them, about
  ×0.3–0.8 (the Weena about ×0.3, the Groothandelsgebouw ×0.85).
- Along-track positions of the surroundings come from published coordinates
  (source 8) projected onto the track direction. The middle of the passage was
  placed 27 m east of the Wikipedia station coordinate, halfway between the
  Groothandelsgebouw and the Delftse Poort.

## Surroundings

69 shapes in 7 kinds as the checker counts them (22 block, 3 square, 7 road,
1 park, 2 water, 30 tree, 4 bike). Sources in brackets.

- City side (left), from the tracks outwards: the main hall with its pointed
  roof towards the city (10); the Stationsplein as an open square in front of
  it (10); bicycle racks at the entrance of the underground bicycle parking on
  the Stationsplein (11); the tram stop on the east side of the hall (10); the
  Groothandelsgebouw as one 220 m block west of the square (8, 9); the Delftse
  Poort as two tall blocks and a low block east of the square (8, 9); more
  blocks towards the Hofplein (east, below).
- The Weena as a wide road running parallel to the tracks south of the square (9).
- Beyond the Weena: the Kruisplein as a square with a green strip and two rows
  of trees (12), and city blocks on both sides of it.
- Proveniers side (right): the north entrance building (4); the Proveniersplein
  as a large square (13); the Provenierssingel as water along the tracks with a
  row of trees on its far bank (14); the new water on the square with its two
  bridges (13); the Spoorsingel leaving northwards with trees on both banks
  (14); the Provenierswijk as blocks beyond the water (14); the street along
  the Provenierssingel.
- Labels: Stationsplein, Weena, Kruisplein, Delftse Poort, Proveniersplein; on
  the station "Rotterdam Centraal", "stationshal", "noordingang" and "passage".
- No trees on the Stationsplein, along the Weena in front of the station or on
  the Proveniersplein itself: no source shows them.

## Toilets

One public toilet block at the station. This session could reach the
OpenStreetMap API: the toilet and the escalators were measured in a frame
along the real track bearing (73.8°, from OSM track 4), with the middle of the
passage halfway between the two rows of platform escalators, and mapped to
the scene with the "Scale" section (`y = 300 + w`; the main hall on the
left).

- `wc-hall`: the toilets on the first floor of the station hall, at the east
  end (SANIFAIR, OSM node 5811007188, level 1, the height of the platforms),
  w ≈ +50, about 12 m city-side of the escalators of platform 2; scene
  (104, 349). Reached by the escalator `es-wc` (OSM, w ≈ +47) from the hall
  floor: 34 s from the east side of the passage, 48 s from the middle of the
  hall, 30 s up. New level `hall-1` (position 0: the first floor is at
  platform height). Source 16, 17. paid: yes (OSM `fee=yes`; NS: SANIFAIR,
  €1.10); accessible: yes (OSM `wheelchair=yes`); outside_gates: no — the only
  turnstile in OSM stands about 17 m further towards the Stationsplein, on the
  hall floor. VERIFY the gate side.
- Not included: the paid toilets (`bagni della stazione`, OSM level −1) under
  the Stationsplein, about 130 m from track 2, and a public toilet about 300 m
  east of the station. They are not in the station.

## Decisions

- Rotation: platform numbers increase from south to north, so the scene is
  turned with the west-south-west end at the top. `north_deg` is 108, so the
  north arrow points right and slightly down. The planner's starting value (90)
  assumed tracks running exactly west–east.
- The build prompt put the Delftse Poort west and the Groothandelsgebouw east of
  the station. The coordinates (source 8) and the Weena house numbers (Delftse
  Poort Weena 505, Groothandelsgebouw Weena 723, numbers rising from the Hofplein
  westwards) show the opposite. The scene follows the sources: the
  Groothandelsgebouw west of the Stationsplein (top left), the Delftse Poort east
  of it (bottom left).
- Walking graph: every platform surface has one escalator node at the west
  side of the passage and one stairs node at the east side, as in source 1.
  Section b uses the escalators, section a the stairs. The passage has two rows
  of nodes, one at the foot of the escalators and one at the foot of the
  stairs, 36 m apart, so a trip down and up again costs the walk across the
  passage. Without this, a walk along one platform (8b to 8a) went down into
  the passage and up again.
- Walking times: 1.2 m/s on platforms; 30 s per escalator; 25 s per stair
  (SPEC: 20 s down, 30 s up; an edge has one time for both directions); 36 s
  across the passage. Along the passage the real distance is used at 1.0 m/s,
  but never faster than 2.15 scene units per second, because the scene is
  widened about ×2.5. That makes some passage walks 0.8–0.95 m/s: slow but fair
  for a busy passage, and the checker stays free of warnings. A script checked
  all 650 platform-to-platform routes: no route line on platform level crosses a
  track, and no passage line leaves the passage.
- Lifts are on every platform (source 2) but are not in the graph: their
  positions are unknown, and at 60–90 s they are never on the fastest route.
- The hall node (`hall`) and the north entrance node (`north`) are on the
  passage level. No platform-to-platform route uses them.
- The dead-end track is unknown, so all tracks are drawn as through tracks.
- Section rects `platform-Na` / `platform-Nb` let the shell highlight the half
  where the train stands. They are inset by 1 unit so their own shadows stay
  hidden under the platform rect (the same work-around as Utrecht Centraal).
- Island widths are all 32 units; the real islands differ a little.
- The passage lies under the platforms and is hidden by the track art, as in
  the template. The stairs marks, the "passage" label and the dashed route show
  where it is.
- Not drawn: the platform roof (no quiet class for an outline, see Shell
  issues), the Provenierstunnel (no platform access), the metro station under
  the Stationsplein, the bus stop west of the hall, the Eurostar terminal on
  platform 2, and the Hofplein (beyond the bottom of the scene).
- End labels: top "Schiedam, Delft, Den Haag"; bottom "Utrecht, Schiphol,
  Breda", one name for each of the three branches beyond the east end. Both fit
  on a 390 px phone.
- Sample data. Real train numbers: Sprinter 5027 to Dordrecht and Sprinter 4024
  to Uitgeest (source 7), Eurostar 9340 to Parijs-Noord (source 15). Plausible
  members of real series: Intercity 1133 from Den Haag Centraal and 1144 to Den
  Haag Centraal (series 1100), Intercity 2849 to and 2848 from Utrecht Centraal
  (series 2800), Intercity direct 940 to Amsterdam Centraal and 945 to Breda
  (series 900). Sprinter 2917 to Gouda Goverwelle has a made-up number: the real
  series was not found. Platforms follow the archive (source 7) where it shows
  them; Sprinter 5027 on 8a and Intercity 1144 on 9b are sample choices.
- Default transfer: Intercity 1133 from Den Haag Centraal at 8b to Intercity
  2849 to Utrecht Centraal at 13b: escalator down, through the passage,
  escalator up; about 4 min walking, 7 min available, comfortable. Tight
  transfer: Sprinter 5027 to Dordrecht at 8a in 4 min, about 3 min walking
  along the platform. It is on the same platform number as the arrival, so the
  shell does not pick it as the default "your train".
- The Eurostar runs via Brussel-Zuid to Parijs-Noord. The prompt asked for a
  Eurostar "towards Brussel-Zuid"; the record shows the real final destination.
- No departure to Eindhoven Centraal or Schiphol Airport: the arriving
  Intercity 1133 continues to Eindhoven (series 1100), and the Intercity direct
  940 to Amsterdam calls at Schiphol. A separate record would not be realistic.
- `scene.svg` and `station.json` were written by a small script that is not in
  the repository. Both files are plain: edit them by hand, and keep the node
  circles and `station.json` in step.

## VERIFY

- Island pairs 3/4, 6/7, 8/9, 11/12, 13/14, 15/16 (derived from 7 platforms,
  13 tracks and the gaps). Check the NS station map or OSM platform `ref` tags.
- Which platform track is the dead end, and at which end. Check the track plan
  on Wikipedia NL, OpenRailwayMap or ProRail.
- Section **a** is the eastern half (source 2 only). Check the A/B signs on a
  platform or the NS station map.
- Position of the passage along the platforms (drawn in the middle) and the
  platform ends (drawn ±200 m from it). Check OSM platform outlines or an
  aerial photo.
- Escalators on the west side and stairs on the east side on every platform,
  also on 2 (the source says "most platforms"). Check the NS station map.
- Lift positions. Check the NS station map.
- `north_deg` 108 (track bearing about 72°). Check the track geometry in OSM.
- The HSL to Schiphol and Amsterdam leaves at the east end. Check OpenRailwayMap.
- Groothandelsgebouw west and Delftse Poort east of the Stationsplein, against
  the build prompt. Check OSM building outlines.
- Tram stop on the east side of the hall: position and direction of the tracks
  are schematic. Check OSM or an aerial photo.
- Entrance of the bicycle parking on the west part of the Stationsplein:
  position is schematic. Check the municipality's bicycle parking map.
- Kruisplein position and its tree rows (new since December 2024). Check an
  aerial photo.
- Proveniersplein: the new water, the two bridges and the street along the
  Provenierssingel are schematic; no trees drawn on the square. Check an aerial
  photo.
- Provenierssingel along the tracks and Spoorsingel turning north from the
  Proveniersplein. Check the OSM water polygons.
- Delftse Poort footprint and the positions of its two towers. Check OSM
  building outlines.
- Train numbers marked plausible above, the made-up Sprinter 2917, and the
  sections of all sample trains. Check the NS timetable.
- Toilets `wc-hall` (SANIFAIR, first floor of the station hall): inside or
  outside the gates. OSM has a single turnstile about 17 m towards the
  Stationsplein; check on the NS station map or at the station.
- Toilets `wc-hall`: their position along the hall (OSM w ≈ +50, at the east
  end of the drawn hall, which was estimated, see Scale).

## Shell issues

- The checker measures walking speed in scene units. A station widened about
  ×2.5 across the tracks then warns for passage walks at a real 1.0 m/s. I
  raised those times instead (Utrecht Centraal did the same). Suggestion: let a
  station declare its across factor, or check only the along-track part.
- `buildShadows` also gives section rects (`platform-5a`) their own shadow.
  Worked around by insetting them by 1 unit. Suggestion: skip section rects.
- A passage below the platforms is almost completely hidden by the track art
  and the platform rects when the station uses the minimum widths. Only the
  route shows it. Suggestion: a quiet outline class that may be drawn above the
  platforms for passages below them and for roofs.
- There is no way to draw the platform roof quietly: `passage passage--above`
  is a semi-opaque fill that would wash out the platforms and the green
  highlight, and `fill="none"` is overridden by the class. Suggestion: an
  outline-only class.
- The default "your train" is the soonest departure on another platform
  number. A tight transfer that is not the default must therefore be on the
  same platform number, or later with a longer walk. Minor; a note in SPEC 8
  would help the next builder.
