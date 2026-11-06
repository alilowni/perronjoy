# Perronjoy

Perronjoy is a small static website for people with a short transfer at a
Dutch railway station. It shows a realistic top-down view of the station and
its surroundings, the train you arrive with, the platform you must reach, the
walking route between them, and whether the time is enough.

- One search-and-select field for the arrival and one for the next train:
  tap for the full list, or type a platform ("5b", "spoor 5"), a train
  number ("31") or a place ("rotterdam"); the matching platform is outlined
  on the map.
- The public toilets of every station on the map, and "WC onderweg": a route
  via the toilet that costs the least walking, with a 3-minute stop in the
  verdict and notes for paid toilets, wheelchair toilets and toilets outside
  the gates. List mode lists the toilets with their walking times.
- Trains in quiet, NS-like liveries (NS yellow and blue; muted colours for
  Eurostar, ICE, NightJet and European Sleeper), and a few tiny neutral people
  walking slowly on the platforms.
- Dutch and English, remembered per browser.
- Light and dark theme, following the system until you choose.
- Smooth, calm motion that stops when the system asks for reduced motion.
- No build step, no tracking, no cookies, no API keys.

Perronjoy is not an official site of NS, ProRail or any station operator.
Version 1 uses sample data. The URL also takes plain platform numbers (see
[URL parameters](#url-parameters)).

**Docs:** [Station contract (SPEC)](docs/SPEC.md) ·
[Agent instructions](AGENTS.md) · [Build prompts](docs/prompts/README.md) ·
[Template station](site/stations/_template/) · [Known issues](ISSUES.md) ·
[Ideas](IDEAS.md)

## Stations

| id | Station | Prompt | Status |
|---|---|---|---|
| `utrecht-centraal` | Utrecht Centraal | [prompt](docs/prompts/utrecht-centraal.md) | ready |
| `amsterdam-centraal` | Amsterdam Centraal | [prompt](docs/prompts/amsterdam-centraal.md) | ready |
| `rotterdam-centraal` | Rotterdam Centraal | [prompt](docs/prompts/rotterdam-centraal.md) | ready |
| `schiphol-airport` | Schiphol Airport | [prompt](docs/prompts/schiphol-airport.md) | ready |

Each station is built on its own branch from its prompt. Every station follows
the same contract in [docs/SPEC.md](docs/SPEC.md).

## Quick start

Node 18 or newer. No install is needed to run the site or the checker.

```bash
npm run serve
```

Open `http://localhost:8000/`. Try the template station at
`http://localhost:8000/station.html?station=_template`.

```bash
npm run check
```

This checks every station folder against the contract. Add `-- <id>` for one station.

```bash
npm run smoke
```

This opens every finished station in headless Chromium and tests the route, the
moving train, both languages, both themes, list mode, the search fields, the
toilets and the WC route, the walking people and the train liveries. It needs
Playwright:

```bash
npm i -D playwright && npx playwright install chromium
```

Screenshots at phone and desktop size go to `tools/out/`:

```bash
npm run shots -- _template --theme dark --lang en
npm run shots -- _template --via wc                  # the route via a toilet
npm run shots -- _template --open to --search 4      # the search list, open
```

## URL parameters

```
station.html?station=utrecht-centraal&from=5b&to=12a&via=wc&lang=en&theme=dark&motion=off
```

| Parameter | Values | Meaning |
|---|---|---|
| `station` | a station id | which station to show |
| `from` | platform with optional section, or a sample record id | where you arrive |
| `to` | platform with optional section, a sample record id, or `none` | your next train; `none` means no next train |
| `via` | `wc` | route via a toilet ("WC onderweg"); with `to=none`, to the nearest toilet |
| `lang` | `nl` (default), `en` | language; stored in `localStorage` |
| `theme` | `light`, `dark` | force a theme for this visit; not stored |
| `motion` | `off` | no animations (also when the system asks for reduced motion) |

## Repository layout

```
site/                        the published website (GitHub Pages)
  index.html                 choose a station
  station.html               one page for every station, reads ?station=
  css/site.css               the only stylesheet: light and dark tokens, scene classes
  js/boot.js                 sets theme and language before the first paint
  js/i18n.js                 every Dutch and English string of the shell
  js/site.js                 scene, trains, route, panels, camera, clock
  stations/index.json        the station list on the home page
  stations/_template/        a fictional station that shows every rule
  stations/<id>/             station.json, scene.svg, NOTES.md
  404.html                   GitHub Pages fallback: sends unknown paths home
tools/
  check-station.mjs          contract checker (no dependencies)
  smoke.mjs                  browser smoke test (Playwright)
  screenshot.mjs             phone and desktop screenshots (Playwright)
  serve.mjs                  local static server
  lib/                       shared server and browser helpers
docs/
  SPEC.md                    the station contract
  prompts/                   one build prompt per station
  history/PROMPT.md          the original planning prompt
AGENTS.md, CLAUDE.md         instructions for coding agents
ISSUES.md                    known problems, one line each
IDEAS.md                     future features, one line per idea
.github/workflows/pages.yml  checks every pull request, publishes main
```

## Publish on GitHub Pages

The workflow checks every pull request and publishes `site/` on every push to
`main`. One-time setup: Settings → Pages → Build and deployment → Source:
**GitHub Actions**. The site then appears at `https://<user>.github.io/perronjoy/`.
Only `site/` is published; the docs and tools are not.

## Merging the four station branches

Each station branch changes only `site/stations/<id>/`, plus new lines in
`ISSUES.md`. The branches do not touch each other or the shell, so they merge
into `main` in any order. The only possible conflict is two branches adding
lines to `ISSUES.md`: keep all of them. The pull request check runs the
contract checker. After merging, run `npm test` once and update the status
column above.

## Later

Future features are collected in [IDEAS.md](IDEAS.md).

---

## Nederlands

Perronjoy is een kleine statische website voor reizigers met een korte
overstap op een Nederlands station. Je ziet het station van bovenaf met de
omgeving, de trein waarmee je aankomt, het spoor waar je heen moet, de
looproute en of je genoeg tijd hebt.

- Eén zoek-en-kiesveld voor je aankomst en één voor je volgende trein: zoek
  op spoor, treinnummer of plaats.
- De openbare toiletten van elk station op de kaart, en "WC onderweg": een
  route langs het toilet met de kortste looptijd, met 3 minuten toiletbezoek
  in het oordeel.
- Treinen in rustige kleuren die op die van NS lijken, en een paar kleine
  mensen die rustig over de perrons lopen.
- Nederlands en Engels. De keuze wordt onthouden.
- Licht en donker thema. Standaard volgt de site je systeem.
- Rustige, vloeiende animaties. Ze staan uit als je systeem om minder
  beweging vraagt.
- Geen buildstap, geen tracking, geen cookies, geen API-sleutels.

Perronjoy is geen officiële site van NS, ProRail of een stationsbeheerder.
Alle tijden zijn voorbeelddata.

Starten: `npm run serve` en open `http://localhost:8000/`. Controleren:
`npm run check`. De regels voor stations staan in [docs/SPEC.md](docs/SPEC.md)
(Engelstalig). Bekende problemen staan in [ISSUES.md](ISSUES.md), ideeën voor
later in [IDEAS.md](IDEAS.md) (beide Engelstalig).
