# Notes — Utrecht Centraal

The contract is [docs/SPEC.md](../../../docs/SPEC.md). Plain English, one fact per line.

## Summary

Utrecht Centraal is a through station with eight island platforms and sixteen
platform tracks: 1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 15, 18, 19, 20, 21. Tracks
1–4 are dead ends (*kopsporen*) entered from the north. One large station hall
(opened December 2016) lies **above** the tracks and is the only transfer route:
every island has escalators, stairs and a lift up into it. The hall runs from
Stationsplein Oost and Hoog Catharijne on the city side to the Stadsplateau and
Jaarbeursplein on the Jaarbeurs side.

The scene is rotated so the platform numbers run left to right: the **top** is
the south-south-east end ('s-Hertogenbosch, Arnhem), the **bottom** the
north-north-west end (Amsterdam, Gouda, Zwolle), the **left** the city side and
the **right** the Jaarbeurs side.

**How the facts were collected.** The build environment could not open the NS
station page, the NS station map, live OpenStreetMap, Wikipedia or aerial photos
(the network policy blocked those hosts). The geometry comes from an
OpenStreetMap extract of Utrecht dated October 2015, which is on GitHub as test
data of the Valhalla project. Everything that changed since 2015 was checked
against web search excerpts of the sources below. Facts that only the 2015 data
shows, or that no source confirms, are marked **VERIFY**.

## Sources

| # | Source | What it gave | Checked on |
|---|---|---|---|
| 1 | OpenStreetMap contributors: `utrecht_netherlands.osm.pbf` (Valhalla test data, newest edit 30 Oct 2015), read with pyosmium | track bearing, track and platform order, platform polygons and refs, hall outline (layer 1), stair positions, Moreelsebrug alignment, buildings, water, Moreelsepark, trees, rail lines beyond both ends | 2026-11-05 |
| 2 | Wikipedia NL, *Geschiedenis van station Utrecht Centraal* (search excerpts) | 1986: kopsporen 1 and 2 on the city side; 1989: lifts on every platform, escalators to "de noordelijke a-helften van de perrons"; new hall kept most escalators in place | 2026-11-05 |
| 3 | Wikipedia NL, *Station Utrecht Centraal* (Wikiwand excerpt) | eight platforms, sixteen platform tracks, four of them dead ends; kopsporen 1–3 under the Paviljoen | 2026-11-05 |
| 4 | klassiekebeveiliging.nl and Somda Railwiki (search excerpts) | track 4 a dead end since March 2016, buffer stop at its southern end; tracks 20/21 and their platform opened in 2015 | 2026-11-05 |
| 5 | ProRail news; Treinenweb (2024 and Feb–Mar 2026) | track 5 moved and the platform along it widened, especially under the hall; track 4 shortened at the south; platform 3/4 lengthened to the north; ProRail *perron* numbers (perron 2 = tracks 3/4, perron 3 = track 5) | 2026-11-05 |
| 6 | Rijden de Treinen, train archive for Utrecht Centraal 2022–2026 (search excerpts) | ICE to Frankfurt on 19; Sprinters to Zwolle on 4, Leiden Centraal on 20, Tiel on 21; Sprinter 7426 to Uitgeest on 14; IC 3118 to Den Haag Centraal and IC 3026 to Den Helder on 5; Intercities to Rotterdam mostly on 11/12 | 2026-11-05 |
| 7 | OV in Nederland wiki, 2026 timetable pages (search excerpts) | train series 2800 (Utrecht–Rotterdam), 3500 (Venlo–Dordrecht via Schiphol), 5600 (Utrecht–Zwolle), 500 (Den Haag–Groningen); Amsterdam-bound Intercities on 5 and 7 | 2026-11-05 |
| 8 | DUIC (2016, 2025) | Moreelsebrug opened 2016, about 275–295 m long and 10 m wide; stairs from the bridge to the platforms approved, expected 2027–2028 | 2026-11-05 |
| 9 | Gemeente Utrecht, *De singel is rond*; DutchNews (September 2020) | Catharijnesingel is water again along Hoog Catharijne | 2026-11-05 |
| 10 | Gemeente Utrecht press release (August 2019); DUIC | Stationsplein bicycle parking: 12,500 places, three levels under Stationsplein Oost | 2026-11-05 |
| 11 | Gemeente Utrecht; DUIC (2018) | Jaarbeursplein renewed and car-free in 2018 with about 40 trees; about 100 new trees on the Croeselaan | 2026-11-05 |
| 12 | SpoorPro (March 2025) | a stair entrance from the Moreelsebrug is planned, not built | 2026-11-05 |
| 13 | OpenStreetMap contributors: API map download of the station area, 6 November 2026, read with a small script: public toilets (amenity=toilets with level, fee or charge, wheelchair, access) and check-in gates (barrier=turnstile) | the SANIFAIR toilets in the station hall (level 1, fee, wheelchair) and the gate lines across the hall; the toilets in Hoog Catharijne | 2026-11-06 |
| 14 | NS, Toiletten (www.ns.nl, 6 November 2026): SANIFAIR toilets with staff at the large stations, EUR 1.10 a visit | the toilets at large stations are SANIFAIR, staffed and paid | 2026-11-06 |

## Facts

| Fact | Value | Source | Status |
|---|---|---|---|
| Platforms, left to right (east to west) | 1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 14, 15, 18, 19, 20, 21 | 1, 3 | verified |
| Missing numbers | 6, 10, 13, 16, 17 have no platform; track 10 is a through track without a platform between 9 and 11 | 1 | verified (track 10: VERIFY) |
| Side of spoor 1 | city side (Hoog Catharijne, east); spoor 21 on the Jaarbeurs side (west) | 1, 2 | verified |
| Islands | 1/2, 3/4, 5/7, 8/9, 11/12, 14/15, 18/19, 20/21 | 1, 5 | verified |
| Dead-end tracks | 1, 2, 3 and 4, all entered from the north; 1–3 end at a short cross platform north of the hall | 1, 3, 4, 5 | verified; buffer positions VERIFY |
| Sections | **a** = northern half (bottom of the scene), **b** = southern half | 2 | likely, VERIFY |
| Transfer passage | the station hall, **above** the tracks (level +1), about 90 m along the tracks, from east of track 1 to west of track 21 | 1, 2 | verified |
| Access to the hall | each through island: escalators, stairs and lift at the north and at the south edge of the hall; tracks 1–4 from the cross platform at their ends | 1, 2 | likely, VERIFY |
| Other passages | none open for transfers; the Moreelsebrug has no access to the platforms yet | 8, 12 | verified |
| Top end (south-south-east) leads to | Utrecht Vaartsche Rijn, 's-Hertogenbosch, Eindhoven; via Lunetten and Driebergen-Zeist to Arnhem and Nijmegen | 1 | verified |
| Bottom end (north-north-west) leads to | Amsterdam; west via Leidsche Rijn to Woerden, Gouda, Rotterdam, Den Haag, Leiden; north-east via Overvecht to Hilversum, Amersfoort, Zwolle, Baarn, Maliebaan | 1 | verified |
| `north_deg` | 210 (the tracks run at bearing 150°/330°; screen-up is bearing 150°) | 1 | verified |
| Platform lengths | through islands about 350–460 m, bays about 250–285 m | 1, 5 | approximate |
| Recent change | platform along track 5 widened and track 5 moved (20 Feb – 2 Mar 2026); island 5/7 is drawn as the widest | 5 | verified |

## Scale

- Along the tracks: 1 unit = 1 metre. Scene `y = 300 − v`, where `v` is metres
  along the tracks from the middle of the station hall, positive towards the
  south-south-east. The scene runs from v = +300 (top) to v = −400 (bottom).
- Across the tracks: the platform area is widened about **×2.5** (island centres
  21–25 m apart in reality, 52–62 units in the scene). Platform rects are 16–19
  units wide, track centrelines at least 10 units apart.
- Surroundings are compressed across the tracks, about **×0.3** (some 330 m on
  each side drawn in about 100 units), and true along the tracks.
- Platform extents in v (north end .. south end): 1/2 −322..−74, 3 −340..−74,
  4 −340..−56, 5/7 −250..195, 8/9 −225..197, 11/12 −212..244, 14/15 −212..238,
  18/19 −230..232, 20/21 −120..236. Hall: v −54..37.

## Surroundings

70 shapes in 7 kinds (block, square, road, park, water, tree, bike). Source 1
unless noted.

- City side (left), from the tracks outwards: Stationsplein Oost as a square
  with bicycle racks at the underground bicycle parking (10); the Stationstraverse
  from the hall into Hoog Catharijne; Hoog Catharijne as three blocks
  (Godebaldkwartier, Radboudkwartier, Gildenkwartier) directly against the
  station; the Catharijnesingel as water (restored 2020, 9) with trees on its far
  bank (Willemsplantsoen).
- City side, south of the hall: the bus and tram square Centrumzijde with the
  tram line to the Uithof; HGB IV and Moreelsepark 2 as blocks; the Moreelsepark
  street and Laan van Puntenburg; Moreelsepark as a park with its trees.
- Jaarbeurs side (right): the Stadsplateau at the west exit of the hall; the
  Beatrix Theater; Jaarbeursplein as a square with trees (11); the Stadskantoor
  and the WTC as tall blocks; bicycle racks of the Jaarbeursplein parking; the
  Jaarbeurszijde bus square; the Rabobank offices (one tall) with the Kruisvaart
  and a pond; the Croeselaan with tree rows (11); the Jaarbeurs halls beyond it;
  the NH hotel and Sypesteyn; Westplein.
- North end (bottom): the Leidse Rijn on both sides, trees on the Van
  Sijpesteijnkade, the Smakkelaarsburcht, houses on the Leidseweg.
- Above the tracks: the Moreelsebrug (8) at the southern platform ends, drawn
  as a `passage passage--above` band. It is not in the walking graph.
- Labels: Hoog Catharijne, Stationsplein Oost, Catharijnesingel, Moreelsebrug,
  Jaarbeursplein; on the hall "Utrecht Centraal" and "Stationshal".
- No trees on Stationsplein Oost, the bus square or the station area: no source
  shows them.

## Toilets

One public toilet block at the station. Positions from source 13, mapped
with the "Scale" section: along the tracks from the OSM outline of the
station hall (v −57..34 in OSM, −54..37 in the scene), across the tracks
beyond track 21 ×0.6.

- `wc-hall`: the toilets in the station hall, on the Jaarbeurs side (SANIFAIR,
  OSM node 2449612568, address Stationshal 11C), level `hall`, scene (522, 276),
  16 s from the escalators of 20/21. Source 13, 14. paid: yes (OSM `fee=yes`;
  NS: SANIFAIR, €1.10); accessible: yes (OSM `wheelchair=yes`,
  `toilets:wheelchair=yes`); outside_gates: no — the OSM gate line on the
  Jaarbeurs side runs about 7 m further out, so the toilets lie inside the
  gates. VERIFY the gate side.
- Not included: the toilets in Hoog Catharijne (2theloo in car park P5,
  One Hundred Restrooms in the Godebaldkwartier). They are in the shopping
  centre, not in the station.

## Decisions

- Rotation: platform numbers run left to right, so the scene is turned about
  180°: screen-up is bearing 150°, `north_deg` 210 (the north arrow points down
  and a little to the left).
- Tracks 1–4 are dead ends. Their track paths start at the buffer stop and run
  to the bottom edge, not the full height (SPEC 5.2 cannot apply to a dead end).
  Every train on 1–4 comes from and goes to the bottom.
- A short unnumbered `platform` rect is the cross platform (*kopperron*) that
  joins islands 1/2 and 3/4 at the buffer stops; the 2015 data has this area.
  Waypoints `kp1` and `kp` keep routes on platform surfaces around the track ends.
- Hall model: each through island has an escalator node at the north and at the
  south edge of the hall, where the 2015 data has stairs (the middle stairs of
  2015 are left out); a hall node sits at the top of each. Hall nodes are
  chained along each row, and every north node links straight to every south
  node, because people cross the hall diagonally. Tracks 1–4 share one
  escalator node at the southern tip of island 3/4.
- Walking times: 1.2 m/s on platforms, 1.0 m/s in the hall, 30 s per escalator.
  Where the scene is widened, the time is raised so that the drawn speed stays at
  or under 2.1 units/s. In the hall that means about 0.75–0.85 m/s, which is
  slow but fair for the busiest hall in the country, and keeps the checker free
  of warnings. A script checked all 992 platform-to-platform routes: no route
  line on platform level crosses a track, and no hall line leaves the hall.
- Sections: through platforms split at the middle of the hall (v −8), dead-end
  platforms at their middle. Section rects `platform-Na` / `platform-Nb` let the
  shell highlight the half where the train stands; they are inset by 1 unit so
  their own shadows stay hidden under the platform rect.
- Island widths: 32 units, except 5/7 (38, the widest, widened again in 2026),
  14/15 and 18/19 (34).
- Track 10 (no platform) is `track-x-10`. All tracks are drawn straight; in
  reality they converge beyond the platform ends.
- Not drawn: the Paviljoen and the Noordgebouw over and beside tracks 1–3 (they
  would hide those platforms), the Katreinetoren, the separate bus stops, trees
  along the restored Catharijnesingel (not confirmed).
- Bottom end label "Amsterdam, Gouda, Zwolle": the three branches at the north
  end. "Amersfoort" made the label too long for a 390 px phone.
- Sample data. Platforms follow the archive where it shows them (source 6). Real
  numbers: IC 3118 to Den Haag Centraal (5), Sprinter 7426 to Uitgeest (14),
  IC 3026 from Nijmegen (5). The other numbers are plausible members of the real
  series: 2800 Rotterdam–Utrecht, 5600 Utrecht–Zwolle, 500 Den Haag–Groningen,
  3500 Venlo–Dordrecht, 3000 and 3100 (Intercities to and from Nijmegen), ICE 12x
  Amsterdam–Frankfurt. Destinations follow the prompt, with two changes: Leiden
  Centraal is a Sprinter (the real service on 20), and the Intercity towards
  Zwolle is the IC 500 to Groningen. Some trains run beyond the destination shown.
- Default transfer: IC 2847 from Rotterdam Centraal at 11a to Sprinter 5641 to
  Zwolle (via Amersfoort) at 4b: about 4 min walking, 8 min available,
  comfortable. Tight transfer: IC 3145 to Arnhem Centraal at 11b in 5 min,
  about 4 min walking along the platform. A tight transfer through the hall
  would have to leave sooner than the default, and the shell would then pick it
  as the default.
- `scene.svg` and `station.json` were written by a small script that is not in
  the repository. Both files are plain: edit them by hand, and keep the node
  circles and `station.json` in step.

## VERIFY

- Section **a** is the northern half: the source describes the 1989 station.
  Check the A/B signs on a platform or the NS station map.
- Escalators at the north and south edge of the hall on every island (2015
  positions). Check the NS station map or current OpenStreetMap.
- Island 1/2 reaches the hall over the cross platform and the escalators on
  island 3/4; it may have its own stairs (Paviljoen). Check on site or on the NS
  station map.
- Buffer stops: tracks 1–3 about 84 m north of the hall centre, track 4 about
  60 m after the 2024–2026 works. Check a recent aerial photo or current
  OpenStreetMap.
- North ends of islands 18/19 (v −230) and 20/21 (v −120), and the lengthened
  north end of 3/4 (v −340). Check current OpenStreetMap platform outlines.
- Track 10 is still a through track without a platform. Check current
  OpenStreetMap.
- Hall outline taken from the 2015 data, a year before the hall opened. Check
  current OpenStreetMap.
- Tram stop and bus area Centrumzijde, drawn south of the hall on the city side.
  Check current OpenStreetMap.
- Entrance of the Stationsplein bicycle parking on Stationsplein Oost: position
  is schematic. Check the municipality's bicycle parking map.
- Trees on the Jaarbeursplein (about 40 planted in 2018): positions are
  schematic. Check an aerial photo.
- Leidse Rijn on the city side (Smakkelaarsveld) drawn as open water. Check an
  aerial photo.
- Sections of the sample trains, and train numbers not listed as real above:
  plausible only.
- Toilets `wc-hall` (SANIFAIR, station hall): whether they are inside or
  outside the gates. OSM puts the Jaarbeurs gate line about 7 m further out;
  check on the NS station map or at the station.

## Shell issues

- The checker measures walking speed in scene units. A station widened about
  ×2.5 across the tracks then warns for every hall walk at a real 1.0 m/s. I
  raised those times instead. Suggestion: let a station declare its across
  factor, or check only the along-track part of a walk.
- On a 390 px phone an end label fits about 26 characters after "Richting ";
  longer texts end in "…". Suggestion: allow two lines or a smaller font on
  narrow screens.
- `buildSteps` words a step after the node just before it. When that node is a
  waypoint, the text is "Loop naar de roltrappen" instead of "Loop over het
  perron naar de roltrappen". Minor. Suggestion: look back to the last node that
  is not a waypoint.
- `buildShadows` also gives section rects (`platform-5a`) their own shadow.
  Worked around by insetting them by 1 unit. Suggestion: skip section rects.
- SPEC 5.2 says every track path runs the full height of the scene; a dead-end
  track cannot. The shell handles a shorter path fine (trains enter from the
  open end). The SPEC could say so.
