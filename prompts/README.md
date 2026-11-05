# Build prompts

One prompt per station. Give each prompt to one agent, on its own branch.
The four prompts share the same rules (sections 1–3, 7 and 8 are identical).
Only section 4–6 differ: the facts, the scene and the sample data of that station.

| prompt | station | folder it may edit |
|---|---|---|
| `utrecht-centraal.md` | Utrecht Centraal | `site/stations/utrecht-centraal/` |
| `amsterdam-centraal.md` | Amsterdam Centraal | `site/stations/amsterdam-centraal/` |
| `rotterdam-centraal.md` | Rotterdam Centraal | `site/stations/rotterdam-centraal/` |
| `schiphol-airport.md` | Schiphol Airport | `site/stations/schiphol-airport/` |

Why these four: Utrecht and Amsterdam were asked for. Rotterdam Centraal is the
third busiest station and a different layout type (platforms above one wide
passage). Schiphol Airport is the station where most travellers do not know
the Netherlands, and it is an underground station with island platforms under
one hall, which tests the contract in yet another way. Den Haag Centraal (a
terminus) and Leiden Centraal are good next candidates.

How to use a prompt:

1. Start an agent on a fresh branch from `main` (for example `station/utrecht-centraal`).
2. Paste the whole prompt file as the first message.
3. When the agent is done, run `node tools/check-station.mjs <id>` on the branch and look at
   the screenshots it reports. Merge into `main`. The branches do not conflict, because each
   one only changes its own station folder.
