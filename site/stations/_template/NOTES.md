# Notes — Voorbeeldstation (template)

This is the model for every station's `NOTES.md`. Copy the headings. Write in
plain English. The contract is [docs/SPEC.md](../../../docs/SPEC.md).

## Summary

A small fictional through station with four platforms on three platform
surfaces (1, the island 2/3, and 4) and one tunnel under the tracks.

## Sources

| # | Source | What it gave | Checked on |
|---|---|---|---|
| 1 | Fictional | everything | — |

## Facts

| Fact | Value | Source | Status |
|---|---|---|---|
| Platforms, left to right | 1, 2, 3, 4 | 1 | verified |
| Islands | 2/3 | 1 | verified |
| Sections | 1a, 1b | 1 | verified |
| Transfer passage | one tunnel, middle, below the platforms | 1 | verified |
| Top end leads to | the north | 1 | verified |
| Bottom end leads to | the south | 1 | verified |
| `north_deg` | 0 | 1 | verified |

## Scale

- Along the tracks: 1 unit = 1 metre. Platforms are 300 m.
- Across the tracks: widths ×1.5 for legibility.

## Surroundings

- City side (left): canal (Singel), Stationsplein with bike parking, five city blocks.
- Far side (right): a road, a park (Stadspark), four city blocks.

## Toilets

One line per public toilet: id, where, level, source, `paid`, `accessible`,
`outside_gates`, and VERIFY on anything a source does not confirm.

- `wc-hall`: the toilets in the station hall, by the entrance on the
  Stationsplein; level `tunnel` (the hall floor). Source 1. paid: yes;
  accessible: yes (wheelchair toilet); outside_gates: yes (the hall lies
  outside the gates). Verified (fictional).

## Decisions

- The stairs sit in the middle of each platform because the tunnel is there.
- The toilet node sits in the hall, clear of the hall labels and the badges;
  the shell draws its WC marker.

## VERIFY

- None. (In a real station: one line per item, with how to check it.)

## Shell issues

- None.
