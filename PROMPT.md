> **Status (November 2026):** this file is the original planning prompt and is kept for history.
> The product goal has moved on: Perronjoy now focuses on **transfers**. It shows the train you
> arrive with, the platform you must reach, and the walking route between them, for four
> stations. The current rules live in `SPEC.md`, the overview in `README.md`, and the build
> prompts per station in `prompts/`. Where this file and `SPEC.md` differ, `SPEC.md` wins.
> The visual direction described below (soft, bright, miniature, like the reference video) still applies.

# Prompt — watch the reference, then write the plan

You are a product planner. You write one plan file. You do not build the website in this step.

A later AI coder will build the site from your plan only. Write so that coder can work without guessing. If you are not sure, mark the item `VERIFY` and say how to check it. Do not invent facts and present them as real.

---

## 1. What you must do

1. Watch the full reference video in this folder:

   `reference-kyoto-joy-scroll.mp4`

   It is about 8.3 seconds, square (2000×2000), and silent of useful speech. The picture is a phone on a light gray background. Study the phone screen, not the gray margin.

2. Watch it more than once. Pause it. Note what moves, what stays still, and the order of the motion. If you can export frames, do that (about 2 frames per second is enough).

3. Write a file named `PLAN.md` in this same folder.

4. Do not create the website, the HTML, the CSS, or the images. `PLAN.md` is the only file you add.

---

## 2. What the product is

Working name: **Perronjoy**.

Perronjoy is a small public website. It shows a live-feeling platform map for the four busiest passenger railway stations in the Netherlands. The map must feel like the reference video: soft, bright, miniature, and a little fun. Trains move. One platform is clearly “yours”.

The site is a static site for **GitHub Pages**. It has no server, no login, and no secrets. A person opens it on a phone or on a desktop and understands the station in a few seconds.

The reference is a concept for Kyoto Station (Japan, Shinkansen). Perronjoy is the same *kind* of screen for Dutch stations. Do not copy Kyoto, the Shinkansen, cherry trees, Japanese train names, or Japanese platform numbers into the product.

This is not an official NS, ProRail, or station-operator product. Do not use their logos. Do not say the site is official. Do not copy their brand colors as the main palette. You may use public facts (station names, platform counts, train types such as Intercity and Sprinter) when you mark the source.

---

## 3. What you saw — write this first in the plan

Start `PLAN.md` with a section called **What the reference shows**.

Describe the video in concrete words a coder can build from. Cover every item below. If the video does not show an item, write “not shown”.

- Frame of the phone, and what sits outside the phone.
- Screen title, subtitle, and small controls (back, more).
- The two modes at the top (map and list) and which one is active.
- The map: viewpoint (top / isometric), how many tracks, which numbers, which track is highlighted, where the station label sits, the north mark, trees or buildings, fog, people marks.
- How trains look (shape, color, direction of the nose).
- The motion from the first moment to the last: which train leaves, which train arrives, which train stays, and whether the camera zooms or scrolls.
- The card under the map: title, the “4 PFs” control, each row (platform, train name, destination, minutes, the “your train” label).
- The bottom bar: the four items and which one is active.
- Colors: background, track, highlight, text, cards. Name them in plain words (for example “soft white”, “pale green”) and give approximate hex values only as a guide.
- Type: what is large, what is small, what is a label versus a value.
- Motion timing: what feels slow, what feels quick, what eases in or out.
- What makes it “a little fun” rather than a normal departures board. List the specific choices (miniature scale, moving trains, glow on your platform, soft edges, and any other choice you actually see).

Then add a short section **What we keep and what we change**.

Keep the interaction and the feeling. Change the place, the trains, the language, and the frame (the Dutch site is a real page, not a picture of a phone).

---

## 4. The four stations

The product covers the **four busiest passenger railway stations in the Netherlands**, by annual or average daily passengers.

In the plan:

1. Look up a current public ranking (NS annual report, ProRail, or CBS). Record the source name, the year, and the URL.
2. Use that top four. Do not swap a station out because another city is more famous.
3. If you cannot open a source, use this temporary set and mark it `VERIFY`:
   - Utrecht Centraal
   - Amsterdam Centraal
   - Rotterdam Centraal
   - Den Haag Centraal
   Say that Schiphol Airport must replace the fourth station if the cited ranking puts Schiphol in the top four.
4. For each station, write a one-page brief the coder can draw from:
   - Official name, city, and a one-line character of the building (roof, hall, or terminus). Mark uncertain lines `VERIFY`.
   - A real platform range to show first. The reference shows four platforms, not the whole station. Do the same. Pick a real group of about four adjacent platform numbers. Record the source. If you cannot verify the numbers, propose a group and mark it `VERIFY`.
   - Train types a visitor expects there (Intercity, Sprinter, and international only if that station really has them).
   - One small Dutch landmark or station detail that can sit in the miniature scene the way the trees sit in the reference. Keep it quiet. Do not turn the map into a postcard.

The home page lets the visitor pick one of these four. Each station has its own page with the same layout and its own scene.

---

## 5. The screens the coder must build

The reference is a phone only. Perronjoy must be excellent on a phone and on a desktop. Do not put a fake phone frame on the desktop. Do not stretch the phone layout until it looks empty.

### 5.1 Phone (design at 390 px wide)

Match the reference structure:

1. Top: station name, the line “Live platform status”, back, and a quiet more-button.
2. A switch: **Platform map** and **List**. Map is the default.
3. The map fills the width. Soft fog at the top and bottom. Trains sit on the tracks. One platform is highlighted.
4. A card overlaps the bottom of the map:
   - “Platform status”
   - A control that means “this group of platforms” (the reference says “4 PFs”). Tapping it moves to the next real group of platforms at that station, or the plan must say the first version has one group only and the control is visible but explains that.
   - Two rows: a normal departure, and the highlighted “your train”.
5. A bottom bar with four items. Name them for this product, in Dutch and in English. Suggested set, which you may adjust if you explain why:
   - Reizen / Journeys
   - Kaartjes / Tickets
   - Ontdek / Explore (this is the active item; it is the map)
   - Profiel / Profile

Journeys, Tickets, and Profile are not built in version 1. The plan must say what a tap does (a short, calm “later” state). Do not leave the tap with no result.

### 5.2 Desktop (design at 1280 px wide, and check 1440 px)

1. A simple top bar: the name Perronjoy, the four stations, and the language switch.
2. The map is the large area on one side.
3. The departure card is a real panel on the other side, not a sheet glued over the map.
4. The map / list switch stays. List mode replaces the map with a clean list. It does not open a new site.
5. The active station is obvious. Switching station keeps the same scroll position and the same mode.

### 5.3 States

Specify each state in the plan: what the visitor sees, and what moves.

- Default: next departure is “your train”, its platform glows, its row is marked.
- Visitor taps another row: that train becomes “your train”. The glow moves. The map does not jump.
- A train is at the platform.
- A train departs along the track and leaves the scene.
- A train arrives from outside the scene and stops.
- List mode.
- Map mode.
- A platform group with no departure in the next hour (empty copy, still beautiful).
- A delayed train (one clear mark, no alarm colors everywhere).
- Loading: the first version is static, so loading is only the first paint. Still say what the visitor sees if an image is slow.
- Narrow phone in landscape: the layout must not break. Say the rule (stack, or a reduced map).

### 5.4 Motion

Write a motion list the coder can implement with CSS or a small script.

- Trains move along the track, not in a straight line across the card.
- Motion is slow and smooth. One train moves at a time, or two if the reference does that.
- The highlight on “your train” is a soft pulse, not a flash.
- Station changes fade. They do not spin.
- Respect `prefers-reduced-motion`: show the same layout with trains already in place and no travel animation.
- No autoplay sound. No confetti. No shake.

---

## 6. Look

Write a short visual spec in the plan.

- Light, airy, miniature. White and pale gray first. One green for “your train” and its platform. Dark text for names and times.
- Rounded cards, soft shadow, lots of space. The reference is the target of “clean”.
- Dutch trains in the scene are simple: a short modern train, light body, a colored nose or door band that is **not** a copy of the NS logo or the NS yellow-blue mark. Pick an original accent and name it.
- People on platforms are tiny marks, as in the reference. No faces, no photos.
- The station building is a simple block with the station name on it, plus one verified local detail.
- Type: a neutral grotesque already common on Google Fonts or the system (for example a font such as Inter or the system UI font). Do not require a paid font.
- All text must be real words. No lorem ipsum. No fake train names that look like jokes.
- The page must look finished at 390 px and at 1280 px. Specify spacing, the map height, and the card width in both.

---

## 7. Language

Version 1 is Dutch and English.

- Dutch is the default.
- A switch sets English. The choice is remembered in `localStorage`.
- Every visible string lives in one dictionary. The plan lists the strings (navigation, map, list, empty, delay, “your train”, footer).
- Train destinations use the real Dutch station names in both languages (`Amsterdam Centraal`, not “Amsterdam Central”), except where English has a standard form you cite.
- Times use 24-hour `HH:MM` and Europe/Amsterdam.

---

## 8. Information on the screen

Version 1 does **not** call a live API. GitHub Pages cannot hide a key, and the first goal is the picture and the motion.

The plan must define a file `data/stations.json` (the coder creates it later) with:

- The four stations.
- For each station: the platform group on screen, each platform number, and a short list of departures.
- For each departure: platform, train type, train number, destination, departure time, a “minutes until departure” value that the page computes from the time and “now”, a status (`on_time` or `delayed`), and a delay in minutes when delayed.
- A note on every record: this is **demo data**, shaped like real departures. The page shows a small line: “Voorbeelddata” / “Sample data”. Do not label it “live” in the legal sense. The subtitle may still say “Live platform status” only if the plan explains this as the name of the view (the picture updates with the clock) and the footer still says the times are sample data. Prefer an honest subtitle if the two would confuse a visitor. Choose one and explain the choice.

Also specify:

- How “minutes until departure” is computed in the browser from the sample clock. For the demo, times may be relative to page load (for example “departs in 2 min” and “departs in 6 min”) so the motion always has something to show. Say which approach you choose and why.
- “Your train” defaults to the soonest departure on screen.
- The JSON must be easy to replace later with a real feed. Name a later phase, not part of version 1, that could read a public departures source. Mark the source `VERIFY`. Do not design that client in detail.

---

## 9. How the site is built

The later coder ships a static site.

- Plain HTML, CSS, and a small amount of JavaScript. No required build step, so GitHub Pages can serve the folder as it is. A build tool is allowed only if the plan shows the exact Pages setup and the output folder.
- One shared stylesheet. One shared script. Station scenes can be SVG files, one per station.
- SVG is the default for the map, because it stays sharp and the trains can move along a path. The plan must say that. Canvas is allowed only if you explain why SVG is not enough.
- Pages:
  - `index.html` — choose a station.
  - one page per station, or one page that reads the station from the URL (`?station=` or a path). Pick one and say how GitHub Pages will route it.
- Paths must be relative, so the site works at `https://<user>.github.io/perronjoy/` and also when opened as a folder.
- No cookies. No analytics in version 1. No accounts.
- Footer: product name, “not an official railway site”, “sample data”, and the language switch if it is not in the header.

Performance:

- The first view should feel instant. Say a size budget (for example each station SVG under a limit you choose, total page under a limit you choose).
- Do not ship the reference video on the public site. It stays in this folder as a private reference.

---

## 10. What “done” means for the later coder

Put this checklist in the plan. Version 1 is done only when all of these are true:

1. The four stations are the cited top four, or the temporary set with `VERIFY` still visible in the plan.
2. Phone and desktop both match the layout rules in this prompt.
3. On each station, trains are on the tracks, one platform is highlighted, and at least one train moves along the track.
4. Tapping a departure moves the highlight.
5. Map and list both work.
6. Dutch and English both work, and the choice survives a refresh.
7. Reduced motion leaves a calm, still scene.
8. Sample data is labeled as sample data.
9. No official railway logo, no claim that the site is official, no API key.
10. The site is a static folder that GitHub Pages can publish. The plan includes the click-path: repository, branch, folder, and the URL shape.
11. A person who has never seen the video can tell, in one look, which platform their train uses.

---

## 11. Out of scope for version 1

Write these as out of scope so the coder does not add them:

- Ticket sales, accounts, profiles, and saved journeys.
- A real live departures feed.
- All platforms of the station at once.
- Other countries, other Dutch stations, buses, metros, and ferries.
- Native apps.
- A backend, a database, or a build that needs a secret.
- Sound, video backgrounds, and 3D engines.

---

## 12. Shape of `PLAN.md`

Use this order. Use short sentences. Use lists. A coder must be able to jump to a section.

1. How to use this plan (rules for the coder, including “do not expand the scope”).
2. What the reference shows.
3. What we keep and what we change.
4. Product summary (one page).
5. The four stations, with sources.
6. Screens: phone, desktop, and every state.
7. Motion.
8. Visual spec (color, type, spacing).
9. Languages and the string list.
10. Data file shape, with one JSON example for one station.
11. Technical approach and GitHub Pages steps.
12. File tree the coder will create.
13. Build order in small steps (each step has a visible result).
14. Done checklist.
15. Out of scope.
16. Open items marked `VERIFY`.

Do not add a second plan file. Do not add code.

When you describe a screen, describe it as a visitor would see it, then add the measurements. The goal is a site that feels as careful and as light as the reference, for Utrecht, Amsterdam, Rotterdam, and Den Haag — or for the real top four if the ranking differs — on a phone and on a desktop.
