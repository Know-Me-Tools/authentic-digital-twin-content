# Change U — Generic-pattern framing in SKILL.md steps 4b and 8

**Phase:** phase-5
**Status:** PENDING
**File:** `skills/authentic-digital-twin-content/SKILL.md`
**Type:** documentation / targeted body edit
**Depends on:** Change T (shadow-pattern-detector.md must exist)

## Goal

Add one sentence to SKILL.md step 4b and one sentence to step 8 making each step a generic-pattern entry point — directing new-author builders to the appropriate reference file rather than treating Travis's instantiation as the only form.

## Tasks

- [ ] Read SKILL.md steps 4b and 8 in context to locate exact insertion points
- [ ] In step 4b: after the line "The 11 natural heuristics (1, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15) are applied implicitly via substrate reading — no explicit enforcement needed.", add:
  `For new author substrates, see the natural-vs-effortful classification guidance in \`references/voice-extraction-process.md\`.`
- [ ] In step 8: after the line "Skip this step for Tier 2 and Tier 3 surfaces.", add:
  `For the escalation protocol and expanded detection signals, see \`references/shadow-pattern-detector.md\`.`
- [ ] Verify description field unchanged at 928/1024 chars (these are body additions only)

## Acceptance criteria

- Step 4b includes one-sentence reference to `references/voice-extraction-process.md` after the natural-heuristics note
- Step 8 includes one-sentence reference to `references/shadow-pattern-detector.md` after the Tier scope line
- Description field: 928 chars (unchanged)
- No other SKILL.md content modified
