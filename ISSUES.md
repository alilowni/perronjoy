# Issues

Known problems, one line each: `- [area] problem`.
Areas: `shell`, `station:<id>`, `tools`, `docs`, `ci`.
Add new lines at the end. When an issue is fixed, strike it through and keep it:
`- ~~[shell] problem~~ (fixed in <commit or PR>)`.
Future features go in [IDEAS.md](IDEAS.md), not here.

- [tools] The checker measures walking speed in scene units, so a station widened across the tracks gets speed warnings at real walking speeds (Utrecht, Rotterdam and Amsterdam raised their tunnel times instead).
- [tools] The checker counts `road-line` shapes as `road` when it counts the surroundings, because its `\broad\b` pattern also matches `road-line`.
- [tools] `npm run shots` cannot capture the whole-station view, so that view is never checked in the screenshots.
- [shell] `buildShadows` also gives section rects (`platform-5a`) their own shadow; stations inset them by 1 unit to hide it.
- [shell] A passage below the platforms is hidden by the track art and the platform rects; only the route line shows where it is.
- [shell] There is no quiet outline class for a roof over the platforms (`passage passage--above` washes them out), so stations leave their roofs out.
- [shell] `buildSteps` words a step after the node just before it: after a waypoint it says "Loop naar …" instead of "Loop over het perron naar …".
- [shell] There is no way to mark a platform or a passage as closed (Amsterdam: platform 13/14 and the Oosttunnel in 2026).
- [shell] On a 390 px phone the end label box is 250 px wide, so a longer "Richting …" text ends in "…".
- [shell] Platform badges sit at 18 % and 82 % of the platform height, so a route marker on a platform node near those points covers the badge.
- [shell] `sprinklePeople` uses only numbered platform rects, so an extra platform surface (Amsterdam platform 2 east of the buffer stop) has no people.
- [shell] The whole-station view of a long, narrow station leaves wide empty margins on a desktop map.
- [docs] SPEC 5.2 says every track path runs the full height of the scene, but a dead-end track cannot (Amsterdam track 1, Utrecht tracks 1–4); the shell already handles shorter paths.
- [docs] SPEC 8 does not say that the tight sample transfer must use the arrival's platform number or leave after the default, because the default "your train" is the soonest departure on another number.
- [station:amsterdam-centraal] The Oosttunnel is closed for widening and left out of the walking graph; add it when it reopens (its lifts are expected back in June 2027).
- [station:amsterdam-centraal] Platform 13/14 has had no trains since 6 October 2026 and is not used in the sample data; check again in 2027.
