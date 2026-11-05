# Perronjoy

Perronjoy is a small static website for people with a short transfer at a
Dutch railway station. It shows a realistic top-down view of the station, the
train you arrive with, the platform you must reach, the walking route between
them, and whether the time is enough.

It is not an official site of NS, ProRail or any station operator. Version 1
uses sample data. The URL already takes platform numbers, so a later version
can read a live feed (for example the NS API) without changing the stations.

## Stations

| id | station | status |
|---|---|---|
| `utrecht-centraal` | Utrecht Centraal | placeholder |
| `amsterdam-centraal` | Amsterdam Centraal | placeholder |
| `rotterdam-centraal` | Rotterdam Centraal | placeholder |
| `schiphol-airport` | Schiphol Airport | placeholder |

Each station is built on its own branch from the prompt in `prompts/`. The
rules every station follows are in `SPEC.md`.

## Run it locally

No build step. Serve the `site/` folder with any static server:

```bash
python3 -m http.server 8000 --directory site
```

Then open `http://localhost:8000/`. The page loads JSON and SVG with `fetch`,
so it needs a server. Opening `index.html` directly from the file system does
not work in most browsers.

URL shape of a station page:

```
station.html?station=utrecht-centraal&from=5b&to=12a&lang=en
```

`from` and `to` take a platform (with optional section) or a sample record id.
`lang` is `nl` (default) or `en`; the choice is remembered in `localStorage`.
Add `motion=off` to skip animations.

## Folder layout

```
site/                      the published website (GitHub Pages)
  index.html               choose a station
  station.html             one page for every station, reads ?station=
  css/site.css             the one stylesheet, including scene colours
  js/i18n.js               all Dutch and English strings of the shell
  js/site.js               the one script: scene, trains, route, panels
  stations/index.json      the list of stations on the home page
  stations/_template/      a small fictional station that shows every rule
  stations/<id>/           station.json, scene.svg, NOTES.md per station
tools/check-station.mjs    validates a station folder against SPEC.md
tools/screenshot.mjs       renders phone and desktop screenshots (Playwright)
prompts/                   one build prompt per station
SPEC.md                    the station contract
PROMPT.md                  the original planning prompt (historical)
reference-kyoto-joy-scroll.mp4   private visual reference, not published
```

## Tools

```bash
node tools/check-station.mjs utrecht-centraal     # one station
node tools/check-station.mjs --all                # every folder
node tools/screenshot.mjs _template               # PNGs in tools/out/
node tools/screenshot.mjs _template --lang en --from 4 --to 1a
```

The screenshot tool needs Playwright with Chromium. If it is not installed:

```bash
npm i -D playwright && npx playwright install chromium
```

## Publish on GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the `site/` folder on
every push to `main`. One-time setup in the repository: Settings → Pages →
Build and deployment → Source: **GitHub Actions**. The site then appears at
`https://<user>.github.io/perronjoy/`. The reference video stays outside
`site/` and is never published.

## Merging the four station branches

Each branch changes only `site/stations/<id>/`. They do not touch each other
or the shell, so they merge into `main` in any order without conflicts. After
merging, run `node tools/check-station.mjs --all` once.

## Later

- Live platforms and times from a public departures source (the NS API needs a
  key, so this needs a small proxy or a client-side key with a quota; decide
  then). The data shape in `SPEC.md` section 8 is the target shape.
- More stations: copy the template, follow `SPEC.md`, add one line to
  `site/stations/index.json`.
