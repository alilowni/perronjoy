# Build prompts

One prompt per station. Give each prompt to one agent, on its own branch.
All four prompts share the same rules: sections 1–3, 8 and 9 are identical.
Sections 4–7 differ: the facts, the scene, the surroundings and the sample
data of that station. The contract they all follow is [docs/SPEC.md](../SPEC.md).

| Prompt | Station | Folder it may edit | Suggested branch |
|---|---|---|---|
| [utrecht-centraal.md](utrecht-centraal.md) | Utrecht Centraal | `site/stations/utrecht-centraal/` | `station/utrecht-centraal` |
| [amsterdam-centraal.md](amsterdam-centraal.md) | Amsterdam Centraal | `site/stations/amsterdam-centraal/` | `station/amsterdam-centraal` |
| [rotterdam-centraal.md](rotterdam-centraal.md) | Rotterdam Centraal | `site/stations/rotterdam-centraal/` | `station/rotterdam-centraal` |
| [schiphol-airport.md](schiphol-airport.md) | Schiphol Airport | `site/stations/schiphol-airport/` | `station/schiphol-airport` |

## Why these four

Utrecht Centraal and Amsterdam Centraal were asked for. Rotterdam Centraal is
the third busiest station and has a different layout: platforms above one
wide passage. Schiphol Airport is the station where most travellers do not
know the country, and it is underground with island platforms under one hall.
Together they test the contract in four different ways. Den Haag Centraal (a
terminus) and Leiden Centraal are good next candidates.

## How to use a prompt

1. Start an agent on a fresh branch from `main`.
2. Paste the whole prompt file as the first message.
3. When the agent is done, run `npm run check -- <id>` and
   `npm run smoke -- <id>` on the branch, and look at the screenshots.
4. Open a pull request. The pull request check runs the contract checker.
   Merge into `main`. The branches do not conflict, because each one only
   changes its own station folder.
5. After merging, update the status column in the [README](../../README.md).
