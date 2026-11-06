# AGENTS.md

Instructions for AI agents (and people) working in this repository.

## What this is

Perronjoy is a static website (GitHub Pages, no build step) that shows Dutch
railway stations from above, so a traveller with a short transfer sees where
they arrive and how to walk to their next train. Dutch and English. Light and
dark theme. Sample data only in version 1.

## Read first

1. [README.md](README.md): overview, commands, folder layout.
2. [docs/SPEC.md](docs/SPEC.md): the station contract. Binding for station work.
3. If you were given a station prompt: the matching file in
   [docs/prompts/](docs/prompts/README.md).
4. [ISSUES.md](ISSUES.md): known problems, one line each.
5. [IDEAS.md](IDEAS.md): future features, not part of the current work.

## Repository map

```
site/                    the published website, served as is
  index.html             home: choose a station
  station.html           one page for every station (?station=<id>)
  css/site.css           the only stylesheet: tokens, light + dark, scene classes
  js/boot.js             runs in <head>: theme, language attribute, motion flag
  js/i18n.js             every Dutch and English string of the shell
  js/site.js             scene, trains, route, panels, camera, clock
  stations/index.json    the station list for the home page
  stations/_template/    a fictional station that follows every rule
  stations/<id>/         station.json, scene.svg, NOTES.md
tools/                   Node scripts, no dependencies except optional Playwright
docs/                    SPEC, build prompts, history
ISSUES.md                known problems, one line each
IDEAS.md                 future features, one line per idea
```

## Commands

```bash
npm run serve                 # http://localhost:8000
npm run check                 # contract check of every station folder
npm run check -- <id>         # one station
npm run smoke -- <id>         # browser test (needs Playwright)
npm run shots -- <id> [--lang en] [--theme dark] [--from 5a --to 12b]
npm test                      # check + smoke for everything
```

No `npm install` is needed for `serve` and `check`. `smoke` and `shots` need
Playwright with Chromium (`npm i -D playwright && npx playwright install chromium`);
the Claude cloud environment already has it.

## Rules

- **Station work touches only `site/stations/<id>/`** (plus new lines in
  `ISSUES.md`). Shell, tools and docs are shared; four station branches change
  them at the same time would not merge. Report shell problems in the
  station's `NOTES.md` and in `ISSUES.md` instead.
- **Found an issue? Add it to [ISSUES.md](ISSUES.md)**: one line,
  `- [area] problem`, with area `shell`, `station:<id>`, `tools`, `docs` or
  `ci`. It is the only shared file a station branch may change (add lines
  only). When an issue is fixed, strike it through and keep it:
  `- ~~[shell] problem~~ (fixed in <commit or PR>)`.
- **Future features live only in [IDEAS.md](IDEAS.md)**, one line per idea
  under its heading. Do not write plans for later in other files; link to
  IDEAS.md instead.
- **Shell work** (CSS, JS, HTML, tools, docs) happens on its own branch, not
  on a station branch. Keep `docs/SPEC.md`, the template station and the
  checker in step with any contract change.
- Every visible string exists in Dutch and English. Shell strings live in
  `site/js/i18n.js`; station text uses `{"nl","en"}` and `data-en`.
- No colours outside `site/css/site.css`. Both themes must keep working.
- Animations change only `transform`, `opacity` or a dash offset, run on the
  shared ticker in `site.js`, and stop under reduced motion.
- No frameworks, no build step, no tracking, no cookies, no API keys.
- Never present a guessed fact as verified. Mark it `VERIFY` in `NOTES.md`.
- Before you push: `npm run check` prints 0 errors, and `npm run smoke`
  passes when Playwright is available. Look at the screenshots.
- Do not commit `tools/out/` or `node_modules/` (they are ignored).
