# Change R — Effortful-heuristic classification in voice-extraction-process.md

**Phase:** phase-5
**Status:** PENDING
**File:** `skills/authentic-digital-twin-content/references/voice-extraction-process.md`
**Type:** documentation / additive

## Goal

Add a `## Natural-vs-effortful heuristic classification` subsection to `voice-extraction-process.md` so that any new author's twin knows to classify heuristics at bootstrap time. The classification question — "which of this author's heuristics run against their personality profile?" — is the mechanism that produced Travis's five effortful heuristics. It belongs in the generic extraction guide, not only in Travis's substrate.

## Tasks

- [ ] Read `voice-extraction-process.md` in full to confirm insertion point (after extraction order table, before "What each document looks like at finished state")
- [ ] Write new section (~200 words):
  - Define natural heuristics (amplify dominant traits) vs. effortful heuristics (compensate for trait gaps)
  - State the classification question to ask for any author: cross-reference each documented heuristic against the personality framework's low-scoring or absent themes
  - Describe how to express output in document 11 (two-column table: heuristic → natural/effortful with one-line justification)
  - State downstream use: effortful heuristics → explicit enforcement list for Mode A step 4b; natural heuristics → implicit via substrate reading
  - Cite Travis's substrate as reference implementation: 5 effortful (heuristics 4, 7, 9, 11, 16 — bottom-tercile CliftonStrengths themes); 11 natural
- [ ] Verify no existing content modified

## Acceptance criteria

- New section present in `voice-extraction-process.md` between extraction-order block and "What each document looks like at finished state"
- Section explains the concept, the classification question, the document-11 output format, and the downstream use
- Travis's substrate cited as reference implementation with specific heuristic numbers and framework grounding
- Zero existing lines modified
