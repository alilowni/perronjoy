# Ideas

Future features for Perronjoy, one line per idea. This is the only place for
them: other files link here. Nothing here is planned or promised yet.
Known problems go in [ISSUES.md](ISSUES.md).

When an idea is built, strike it through and keep it, with where it was done:
`- ~~Route to the nearest toilet (WC).~~ (done in <PR or commit>)`.

## Live data

- Real NS API with live trains and platforms; it needs a small proxy for the key. The target data shape is in [SPEC section 8](docs/SPEC.md#8-sample-arrivals-and-departures), and the URL already takes plain platform numbers, so the stations need no change.

## Search

- ~~Search and select a platform by number; the matching platform comes up.~~ (done in 75c9f87: one search-and-select field for the arrival and for the next train)

## Accessibility (main feature)

- Older people and people with a disability are key users: let them choose the route type (walking, wheelchair, lift only) with tabs like Google Maps, because people know them.

## Facilities

- ~~Route to the nearest toilet (WC).~~ (done in 2f2882e, c34d619 and 70e888e: toilets in every station, WC markers, the "WC onderweg" route)

## Map and 3D

- A more 3D look, with zoom in and out (to be shaped later).

## People

- ~~Random people walking on the platforms: super minimal, simple neutral human shapes, no gender, never noisy.~~ (done in 4fee734)

## Look

- ~~A better colour palette, with trains closer to the real NS colours, without making the design noisy.~~ (done in 8b724cc: NS-like liveries for the trains)

## Feedback

- Let people send feedback or ideas by email, always with the same fixed subject (for example "[Perronjoy] Feedback"), so it never mixes with personal mail. No email address goes in the repository yet.

## Stations

- More stations if the project grows; Den Haag Centraal (a terminus) and Leiden Centraal are the first candidates. For a new station, copy the template, follow the SPEC and add the station to `site/stations/index.json`.

## Project

- A new project name.
- Cleaner, better engineered code and structure; the current code is a first version.
