# Notes — Amsterdam Centraal

The contract is [docs/SPEC.md](../../../docs/SPEC.md). Plain English, one fact per line.

## Summary

Amsterdam Centraal is a through station on the Stationseiland in the IJ, with
six platforms and eleven platform tracks: the island 1/2 (track 1 is a dead end
entered from the west), the islands 4/5, 7/8, 10/11 and 13/14, and platform 15
alone along the IJ side. Tracks 3, 6, 9 and 12 run between the islands without
a platform. The platforms lie one level above the street; three passenger
tunnels run under all tracks at street level, from the Cuypers building on the
city side to the IJhal on the IJ side: the Westtunnel, the Middentunnel and the
Oosttunnel. Every platform has escalators and stairs into the Westtunnel and the
Middentunnel. The Oosttunnel is closed while it is widened (see VERIFY), so it
is drawn but not in the walking graph.

The tracks run at a bearing of 120.6° / 300.6° (west-north-west to
east-south-east), not exactly west–east. The scene is rotated so the platform
numbers run left to right: the **top** is the west-north-west end (Sloterdijk,
then Haarlem, Zaandam and Schiphol), the **bottom** the east-south-east end
(Amstel and Weesp: Utrecht, Almere, Hilversum), the **left** the city side
(south-south-west: Stationsplein, Damrak) and the **right** the IJ side.

The station is in the middle of a long rebuild (Programma Hoogfrequent Spoor,
2021–2030). The scene shows the layout of November 2026. Since 6 October 2026
no trains stop at platform 13/14; the sample data does not use it.

**How the facts were collected.** This session got network access to the
OpenStreetMap API, Wikipedia NL, ns.nl and prorail.nl. The geometry comes from
an OpenStreetMap download of the station area made on 5 November 2026 (the
platform outlines in it come from ProRail data). The NS station page is a script
app without readable data. Rijden de Treinen answers with a bot check, so its
train archive was read through search excerpts only. Facts that no source
confirms, and positions that had to be estimated, are marked **VERIFY**.

## Sources

| # | Source | What it gave | Checked on |
|---|---|---|---|
| 1 | OpenStreetMap contributors: API map download of bbox 4.893,52.3755,4.910,52.3825 (data up to November 2026), read with a small script | track bearing; tracks named Spoor 1–15 and their order (12, the east part of 11, and 13 and 14 tagged disused); the buffer stop of track 1; platform polygons with refs 1, 2a/2b … 15a/15b and level 1; footways named Westtunnel, Middentunnel, Oosttunnel, IJ-passage, IJ-hal, Cuyperspassage; positions of steps, escalators and lifts; building parts Cuypersgebouw, Koningspaviljoen, De Oost, roofs Zuidkap, Middenkap, Noordkap and Overkapping IJsei; water (IJ, Open Havenfront, Westertoegang, Oostertoegang, Singel, Damrak); Stationsplein; streets; tram tracks; trees (`natural=tree`); bicycle parkings Stationsplein (7000) and IJboulevard (4000); ferry terminals; Sint-Nicolaasbasiliek, Havengebouw, Zilveren Toren, DoubleTree | 2026-11-05 |
| 2 | Wikipedia NL, *Station Amsterdam Centraal* (page source) | six platforms reached by three tunnels under 15 tracks, 11 of them platform tracks; "aan de perrons liggen respectievelijk sporen 1/2, 4/5, 7/8, 10/11, 13/14 en 15"; track 1 a dead end (*kopspoor*); a planned track 16 was never built; Westtunnel widened 1998–2000 with escalators towards the west side, lifts 2006 (4–14) and 2011 (15), city entrance closed 25 September 2023 – 2 June 2025, then a lift to the first platform as well; Middentunnel reopened 20 December 2013 with escalators only on the west side and stairs on the east side, access to 15 since 2014; Oosttunnel closed on the IJ side since June 2024 and completely since September 2024 (at times partly open), to be widened; IJ-passage public, without access to the platforms; Amstelpassage closed in 2023, new Eurostar terminal there since 10 February 2025 with access to track 15 since 23 April 2025; middle tracks 3, 6, 9 and 12 to be removed; west side: Haarlem, Zaandam and Schiphol, all via Sloterdijk; east side: Amstel, Weesp and the Watergraafsmeer yard; every through platform track used in two halves; bicycle parkings; Prins Hendrikkade closed to cars in front of the station and the Open Havenfront enlarged | 2026-11-05 |
| 3 | Wikipedia NL, templates *Tabelrij treinserie …* (timetable 2026) | routes of the series that call at Amsterdam Centraal: ICE 100/120 (Frankfurt, Basel) and 140 (Berlin), European Sleeper 450, NightJet 400/420, IC 1500 (Deventer), 2100 (Den Haag Centraal), 2200/2300 (Vlissingen), 2600 (Almere Centrum), 2700, 2900, 3000, 3900 (through trains Utrecht–Alkmaar/Enkhuizen/Den Helder), Sprinter 4000 (Uitgeest–Rotterdam via Gouda), 4600 (Almere Oostvaarders), 4800 (Hoorn via Haarlem), 5400 (Zandvoort aan Zee), 5800, 7300, 7400, Airport Sprinter 8100–8400 (Hoofddorp via Schiphol), Eurostar 9100 (London), 9300 (Paris); Intercity direct 900 from Amsterdam Centraal discontinued in 2025 | 2026-11-05 |
| 4 | ProRail news, 24 September and 6 October 2026; 29 December 2025; project pages *Bouwen op een eiland* | spoor 11a back in use since 6 October 2026, 5:00, first train towards Schiphol Airport; spoor 14a out of use; no trains along the platform of 13 and 14 from 6 October, which is widened and extended over the new bridge, with new stairs and escalators; the Airport Sprinter stops at 11a; the Oosttunnel is made three times as wide, with a new bicycle parking beside it | 2026-11-05 |
| 5 | Rijden de Treinen train archive (search excerpts only) | ICE 120 arrived at 5a (7 February 2026); ICE 123 to Frankfurt (M) Hbf left from platform 4 (9 April 2026); Eurostar 9310, 9322 and 9334 to Paris-Nord left from 15 and 15a (18 July 2026); Sprinter 5406 runs Zandvoort aan Zee – Amsterdam Centraal; Zandvoort Sprinters used 1 and 2a/2b (2023) | 2026-11-05 |
| 6 | ShowMeTheJourney and Seat61 station guides (search excerpts) | the Westtunnel serves the a ends of 2–15 and platform 1, the Oosttunnel the b ends of 2–10; a is the north-west (west) end, b the south-east end; all platforms except 1 have a and b | 2026-11-05 |
| 7 | Treinreiziger, NL Times, SpoorPro, treinposities.nl (search excerpts) | Westtunnel reopened on 2 June 2025; demolition of part of the eastern passenger tunnel from 25 August 2025; lifts in the Oosttunnel out of service, expected back in June 2027 | 2026-11-05 |

## Facts

| Fact | Value | Source | Status |
|---|---|---|---|
| Platforms, left to right (city side to IJ side) | 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 15 | 1, 2 | verified |
| Islands | 1/2, 4/5, 7/8, 10/11, 13/14; 15 alone along the IJ side | 1, 2 | verified |
| Tracks without platform | 3, 6, 9, 12 (12 tagged disused in OSM; the rebuild removes all four) | 1, 2 | verified; current state of 12 VERIFY |
| Track 1 | dead end entered from the west; buffer stop about 160 m west of the Middentunnel; east of it the platform of track 2 widens to the Cuypers building | 1, 2 | verified |
| Sections | **a** = west half (top of the scene), **b** = east half; the split is at the Middentunnel for every platform; platform 1 has no sections | 1, 6 | verified (OSM refs); platform 1 VERIFY |
| Transfer passages | Westtunnel about 82 m west of the Middentunnel, Middentunnel (18 m wide), Oosttunnel about 75 m east of it; all below the platforms, at street level | 1, 2 | verified |
| Access, Westtunnel | per island: escalators on the west side (rising to the west), fixed stairs on the east side, a lift; since June 2025 also a lift to 1/2 | 1, 2 | verified |
| Access, Middentunnel | per island: escalators on the west side, fixed stairs on the east side | 1, 2 | verified |
| Oosttunnel | stairs and lifts to every platform; closed for widening (see VERIFY) | 1, 2, 7 | likely, VERIFY |
| Other passages | IJ-passage (between the Westtunnel and the Middentunnel) and Cuyperspassage (far west, pedestrians and cyclists): no access to the platforms | 1, 2 | verified; not drawn, not in the graph |
| Platform 13/14 | no trains since 6 October 2026; rebuilt for the rest of 2026 and early 2027 | 4 | verified |
| Track 11a | back in use since 6 October 2026 (Airport Sprinter) | 4 | verified; 11b VERIFY |
| Top end (west-north-west) leads to | Sloterdijk, then Haarlem, Zaandam (Alkmaar, Hoorn, Den Helder) and Schiphol (HSL to Rotterdam, Brussels, Paris) | 2, 3 | verified |
| Bottom end (east-south-east) leads to | Amstel (Utrecht, Arnhem, Germany), Weesp (Almere, Hilversum, Amersfoort, Deventer, Berlin) and the Watergraafsmeer yard | 2, 3 | verified |
| `north_deg` | 59: screen-up is bearing 300.6°, so north lies 59° clockwise | 1 | verified |
| Platform lengths (OSM outlines) | 1: 270 m; 2: 690 m; 4/5 and 7/8: 530–565 m; 10–14: 640–660 m; 15: 625 m; a sections 270–440 m, b sections 235–255 m | 1 | approximate |
| City side | Cuypers building with the station hall, De Oost, Stationsplein with trams, Open Havenfront, Prins Hendrikkade, Damrak | 1, 2 | verified |
| IJ side | IJhal under the bus station, De Ruijterkade, IJboulevard over the IJboulevard bicycle parking, ferries on the IJ | 1, 2 | verified |
| International trains | Eurostar to Paris-Nord from 15a (2026); Eurostar to London through the terminal with access to 15; ICE to Frankfurt from 4 | 2, 5 | verified for the dates in source 5 |

## Scale

- Along the tracks: 1 unit = 1 metre. Scene `y = 500 + u`, where `u` is metres
  along the tracks from 52.3789 N 4.9003 E, positive towards the east-south-east.
  The scene runs from u = −500 (top) to u = +360 (bottom).
- Platform extents in u (west end .. east end): 1 −420..−152; 2 −420..272;
  4 −283..272; 5 −259..272; 7 −260..272; 8 −293..272; 10, 11 and 13 −387..272;
  14 −387..254; 15 −368..257. The a/b split is at u = 18.
- Tunnels in u: Westtunnel −76..−57, Middentunnel 6..24, Oosttunnel 84..96.
  Tops of the escalators and stairs: Westtunnel about −87 and −47, Middentunnel
  about −8 and +40 (exact values per island from source 1).
- Across the tracks: the platform area is widened about **×3.1**. Real track
  spacing between the islands is 3.8–4.1 m (drawn 10 units) and an island is
  11–13 m between its tracks (drawn 42 units: two 16-unit platform rects and
  5 units to each track centre). Track 1 to the outer edge of platform 15 is
  about 103 m real and 325 units in the scene. Platform 15 is drawn 20 wide.
- Surroundings are true along the tracks and compressed across them: the
  station buildings about ×0.9, the Stationsplein ×0.45, the Open Havenfront,
  the Prins Hendrikkade and the city blocks ×0.3–0.4, the IJhal ×0.6, the
  IJboulevard ×0.45 and the IJ ×0.4.
- All tracks are drawn straight; in reality they curve and converge beyond the
  platform ends (to the north-east at the east end).

## Surroundings

79 shapes in 7 kinds as the checker counts them (23 block, 3 square, 9 road
counting the tram line, 1 park, 6 water, 30 tree, 7 bike). All positions from source 1 unless noted.

- City side (left), from the tracks outwards: the Cuypers building with the
  station hall (label "Amsterdam Centraal") and De Oost east of it, both station
  buildings; west of them the ibis hotel, the Zilveren Toren and a smaller
  building between track 1 and the water; the Stationsplein as a square with the
  tram tracks along its south side, its trees (a short row in the west, one big
  monumental tree, a row in the east) and three bicycle rows that stand for the
  Fietsenstalling Stationsplein under the water; the Open Havenfront as water
  along the whole front, with its west basin next to the tracks and the
  Sint Nicolaasbrug across it; the Prins Hendrikkade with a row of trees on its
  quay; the Damrak (street and water) leaving south; city blocks; the
  Sint-Nicolaasbasiliek as a tall block south of the Prins Hendrikkade (south-east
  of the station).
- West end (top): the Westertoegang, the water that passes under the tracks;
  the Singel with trees on its bank; the Droogbak building and its small garden
  with trees; blocks of the Haarlemmerbuurt; on the IJ side the Havengebouw and
  three trees.
- IJ side (right): the IJhal under the bus station, as a station building with
  the IJsei roof, with the names of the three tunnels where they come out; the
  bus ramp of the De Ruijterkade west of it and the IJtram terminus east of it;
  the De Ruijterkade along the whole side; the IJboulevard deck in the IJ with
  bicycle rows at its two entrances (the IJboulevard bicycle parking is under
  the deck); the IJ as wide water with the ferry landings at the Pontplein and
  the IJplein ferry landing at the east.
- East end (bottom): the Oostertoegang, the water under the eastern railway
  bridges; the Oostertoegang street; the DoubleTree hotel as a tall block; two
  trees on the De Ruijterkade.
- Labels: Stationsplein, Prins Hendrikkade, Damrak, Sint-Nicolaasbasiliek, IJ;
  on the station "Amsterdam Centraal", "stationshal", "IJhal", "westtunnel",
  "middentunnel" and "oosttunnel / gesloten".
- No trees on the IJ side behind the station, on the IJboulevard or on the
  Pontplein: source 1 has none there.

## Decisions

- Rotation: platform numbers increase from the city side to the IJ side, so the
  west-north-west end is at the top. `north_deg` is 59. The planner's value (90)
  assumed tracks running exactly west–east.
- Ends: the top label is "Schiphol, Haarlem, Alkmaar". "Haarlem, Zaandam,
  Schiphol" is 251 px wide on a 390 px phone and the label box takes 250 px, so
  it ended in "…". Alkmaar stands for the Zaandam branch. The bottom label is
  "Utrecht, Almere, Hilversum" (241 px).
- Levels: `platform` (0) and `tunnel` (−1). In reality the tunnels are at street
  level and the platforms one floor up; for the traveller the tunnel is below.
- Walking graph: per island four nodes on the platform at the top of the real
  escalators and stairs (Westtunnel escalators, Westtunnel stairs, Middentunnel
  escalators, Middentunnel stairs), each going down to a node in its tunnel under
  the island. The tunnel nodes are chained across all islands. The tunnels are
  not connected to each other: inside the gates no cross passage exists, and
  every platform can be reached from either tunnel.
- The stairs nodes hang off a chain of waypoints along the island centre line,
  and the two platform numbers of an island meet at a waypoint at the height of
  their platform nodes. This keeps the step list short: a walk along a platform
  past other stairs is one step ("Loop naar spoor 7b"), never "walk to the
  stairs, walk to the escalators, …". A script checked all 420
  platform-to-platform routes: no line on platform level leaves the platform
  surfaces, no tunnel line leaves the tunnels, and no step names another
  platform before the end.
- Walking times: 1.2 m/s on platforms; 30 s per escalator; 25 s per stair (SPEC:
  20 s down, 30 s up; one edge has one time); 1 s from the platform line to the
  head of a stair. In the tunnels the real distance between island centres is
  used at 1.0 m/s, but never faster than 2.15 scene units per second, because
  the scene is widened ×3.1. That makes a crossing 22–31 s for 16–20 m: slow,
  but the tunnels of Amsterdam Centraal are crowded, and the checker stays free
  of warnings (Utrecht Centraal and Rotterdam Centraal did the same).
- Lifts are in the Westtunnel (all platforms) and the Oosttunnel but are not in
  the graph: at 60–90 s they are never on the fastest route.
- The Oosttunnel is drawn as a passage with the label "oosttunnel / gesloten"
  and its stairs, but it has no nodes. When it reopens, add nodes like the
  Middentunnel's (stairs at about u 92–98) and remove "gesloten".
- Platform 13/14 is drawn and in the graph with its normal stairs, because it
  is part of the station; no sample train uses it while it is closed.
- Platform 2 widens east of the buffer stop of track 1. A platform rect cannot
  have that shape, so the wide part is an unnumbered `platform` rect, and the
  section rect `platform-2b` covers both parts, so the green highlight for 2b
  fills the whole width. `platform-2a` covers only the narrow part, where trains
  on 2a stand.
- Section rects are inset by 1 unit so their own shadows stay hidden under the
  platform rect (as at Utrecht Centraal and Rotterdam Centraal).
- Platform nodes: in the middle of each section. The two numbers of an island
  share the height of their nodes (the average of both section middles). The b
  nodes sit 5–15 m west of the section middle so the route markers do not cover
  the platform badges at 82 % of the platform height.
- Tracks 3, 6, 9 and 12 are drawn as `track-x-…` over the whole height. Track 1
  ends at its buffer stop. Trains on 1 come from and go to the top.
- Not drawn: the station roofs over the tracks (they would wash out the
  platforms), the bus station deck on top of the IJhal (it is the IJhal's roof),
  the IJ-passage and the Cuyperspassage (no access to the platforms, and hidden
  under the tracks), the metro, the Fietsflat (closed in 2023; demolition
  decided in 2025), the ibis building over tracks 1–4.
- Sample data. Real train numbers: ICE 120 from Frankfurt (Main) Hbf at 5a,
  ICE 123 to Frankfurt (Main) Hbf at platform 4 (drawn on 4b), Eurostar 9322 to
  Parijs-Noord at 15a, Sprinter 5406 from Zandvoort aan Zee (source 5). The other
  numbers are plausible members of real series (source 3): Intercity 3047 from
  Nijmegen via Utrecht Centraal (series 3000), Sprinter 4041 to Rotterdam
  Centraal via Gouda (4000), Sprinter 5437 to Zandvoort aan Zee (5400),
  Intercity 2149 to Den Haag Centraal (2100), Sprinter 8139 to Hoofddorp via
  Schiphol Airport (Airport Sprinter 8100), Intercity 1547 to Deventer (1500),
  Intercity 2950 to Enkhuizen (2900), Sprinter 4651 to Almere Oostvaarders
  (4600), Intercity 2241 to Vlissingen via Den Haag HS and Rotterdam (2200).
- The prompt asked for departures towards Enschede, Groningen and Lelystad
  Centrum. In the 2026 timetable no daytime train from Amsterdam Centraal runs
  there (source 3; the Intercity to Enschede, for example, runs from Schiphol via
  Amsterdam Zuid), so the records use real services instead: Deventer (towards Enschede), Almere Oostvaarders and Vlissingen.
  The Intercity towards Schiphol Airport no longer starts here (Intercity direct
  discontinued in 2025), so the Schiphol train is the Airport Sprinter on 11a,
  which ProRail names as the user of 11a.
- Platforms of the other sample trains are sample choices and avoid 13/14.
- Default transfer: Intercity 3047 from Nijmegen at 7a (from the east) to
  Sprinter 5437 to Zandvoort aan Zee at 2a: escalator down into the Westtunnel,
  through it, escalator up to 1/2, along the platform; about 4.3 min walking
  (shown as 5 min), 9 min available, comfortable. Tight transfer: Sprinter 4041
  to Rotterdam Centraal at 7b in 5 min, about 4 min walking along the platform.
  It is on the same platform number as the arrival, so the shell does not pick
  it as the default "your train".
- `scene.svg` and `station.json` were written by a small script that is not in
  the repository. Both files are plain: edit them by hand, and keep the node
  circles and `station.json` in step.

## VERIFY

- The Oosttunnel is closed in November 2026 (closed since September 2024,
  demolition from August 2025, lifts expected back June 2027). Check the NS
  travel information or the signs at the station; when it is open, add it to
  the graph.
- Platform 13/14 stays closed until early 2027 (ProRail). Check ProRail news
  before using it in sample data.
- Track 11b: OSM tags the east part of track 11 disused; ProRail only names 11a
  as back in use. Check the NS travel information or current OSM.
- Tracks 3, 6, 9 and 12 still lie between the islands (OSM: 12 disused; the
  rebuild removes all four). Check OpenRailwayMap or a recent aerial photo.
- Platform outlines and lengths come from OSM, which uses ProRail data of 2014;
  the rebuild widens and lengthens platforms. Check current OSM or an aerial photo.
- Platform 1 has no a/b sections (OSM, ShowMeTheJourney; Seat61 mentions 1a and
  1b). Check the signs on platform 1.
- Positions of the stairs and escalators per island (OSM; at 13/14 they are
  being renewed). Check the NS station map.
- Platforms of the sample trains other than those listed as real in Decisions,
  and the sections of ICE 123 (4b) and the Zandvoort Sprinters (1, 2a). Check
  the NS travel planner for a day in November 2026.
- Train numbers marked plausible in Decisions. Check the NS timetable.
- Surroundings drawn schematically: the outline of the Open Havenfront west
  basin, the tram tracks on the Stationsplein, the bus ramp west of the IJhal,
  the IJtram terminus east of it, the IJboulevard deck. Check current OSM or an
  aerial photo.

## Shell issues

- The checker measures walking speed in scene units. A station widened ×3.1
  across the tracks then warns for every tunnel walk at a real 1.0 m/s. I raised
  those times instead (as Utrecht Centraal and Rotterdam Centraal did).
  Suggestion: let a station declare its across factor, or check only the
  along-track part of a walk.
- `buildShadows` also gives section rects (`platform-5a`) their own shadow.
  Worked around by insetting them by 1 unit. Suggestion: skip section rects.
- A passage below the platforms is almost completely hidden by the track art
  and the platform rects; only the route shows it. I named the tunnels on the
  IJhal where they come out. Suggestion: a quiet outline class that may be drawn
  above the platforms for passages below them.
- `buildSteps` words a step after the node just before it. When that node is a
  waypoint, the text is "Loop naar de roltrappen …" instead of "Loop over het
  perron naar de roltrappen …". With the waypoint chains this is the normal case
  here. Suggestion: look back to the last node that is not a waypoint.
- There is no way to mark a platform or a passage as closed (platform 13/14 and
  the Oosttunnel now). Suggestion: a `closed` flag in `station.json` that greys
  the platform, keeps it out of the route search and shows a note in the list.
- On a 390 px phone an end label box is 250 px wide; "Haarlem, Zaandam,
  Schiphol" (251 px) ended in "…". Suggestion: allow two lines or a smaller font
  on narrow screens.
- A platform that is not a rectangle (platform 2 east of the buffer stop) needs
  an extra unnumbered platform rect. `sprinklePeople` only uses numbered platform
  rects, so the wide part stays empty. Minor.
- The default "your train" is the soonest departure on another platform number,
  so a tight transfer that is not the default must be on the same number or
  later with a longer walk (as noted for Rotterdam Centraal).
