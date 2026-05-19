# Change S — Re-test cadence protocol in voice-extraction-process.md

**Phase:** phase-5
**Status:** PENDING
**Files:** `skills/authentic-digital-twin-content/references/voice-extraction-process.md`, `skills/authentic-digital-twin-content/docs/digital-twin-travis/STATE.md`
**Type:** documentation / additive + one-line STATE.md update

## Goal

Extend the "Re-extraction triggers" section of `voice-extraction-process.md` with a specific `### Personality-framework re-test cadence` subsection that defines what "material shift" means for categorical (CliftonStrengths) and probabilistic (SoulTrace) assessments, which documents update per shift type, and when to re-run the effortful-heuristic classification. Resolves STATE.md OQ5.

## Tasks

- [ ] As part of the same edit session as Change R, append the new subsection to `## Re-extraction triggers` in `voice-extraction-process.md`
- [ ] Subsection content (~250 words):
  - **CliftonStrengths (categorical/ranked):** Material shift = any theme crosses the natural-vs-effortful boundary (effortful theme enters top-15, or natural theme drops below #20). Minor rank shifts within same zone = update doc 01 table only. Boundary crossing = update docs 01, 04, 10, 11; re-run effortful-heuristic classification in doc 11.
  - **SoulTrace (probabilistic):** Material shift = primary archetype changes OR any color dimension moves ≥10 percentage points. Update docs 01, 07, 10, 11. Stability across passes (same archetype, same color distribution) is durable-substrate signal — note it explicitly as substrate confidence.
  - **Partial vs. full re-extraction:** Partial (only affected docs) is sufficient when shift is limited to one framework. Full 11-document re-run warranted when multiple frameworks shift simultaneously OR author self-reports substrate "no longer feels right."
  - **Effortful-heuristic re-classification trigger:** Always re-run the classification in doc 11 when the bottom-theme cluster changes, regardless of whether the primary archetype changes.
- [ ] Update STATE.md: find OQ5 line and change to `5. **Re-test cadence:** RESOLVED — see references/voice-extraction-process.md, Re-test Cadence Protocol section.`

## Acceptance criteria

- New `### Personality-framework re-test cadence` subsection present inside `## Re-extraction triggers`
- CliftonStrengths protocol specifies: rank-zone boundary as threshold; affected docs (01, 04, 10, 11); re-classification trigger
- SoulTrace protocol specifies: ≥10-point color shift or archetype change; affected docs; stability-as-signal note
- Partial vs. full re-extraction decision rule present
- STATE.md OQ5 updated to RESOLVED with reference to voice-extraction-process.md
