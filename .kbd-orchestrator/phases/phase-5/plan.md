# Plan — phase-5

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Travis-independent skill improvements — generalize the shadow-pattern and effortful-heuristic patterns for new-author use, add re-test cadence protocol, and define shadow-pattern escalation protocol.
**Change backend:** native KBD (no OpenSpec detected)
**Evolver bridge:** none
**Date:** 2026-05-19
**Source:** `.kbd-orchestrator/phases/phase-5/assessment.md`

---

## Open question resolutions

| OQ | Question | Resolution |
|---|---|---|
| OQ1 | Should R and S be a single edit or two? | Single atomic edit to `voice-extraction-process.md` for both R and S — same file, same session, less merge risk. Both changes are additive (new sections); a single edit ensures consistent cross-references between the two sections. |
| OQ2 | Should shadow-pattern-detector.md include the full extraction or only escalation protocol? | Compact summary in SKILL.md step 8 stays inline (it's the operator-facing checklist). The new `shadow-pattern-detector.md` holds: (a) the four patterns with expanded detection signals (richer than the SKILL.md table), (b) the escalation protocol. This keeps SKILL.md actionable and the reference file authoritative. |
| OQ3 | Should STATE.md OQ5 be marked resolved after Change S? | Yes. Change S writes the re-test cadence protocol. OQ5 in STATE.md will be updated to `RESOLVED — see references/voice-extraction-process.md Re-test Cadence Protocol` as part of Change S. |
| OQ4 | Should Change U add generic-pattern framing to Modes B and C as well? | No. Modes B and C do not have effortful-heuristic or shadow-pattern steps. Only Mode A steps 4b and 8 need the generic-pattern note. |

---

## Ordered changes

### Change R — Effortful-heuristic classification in `voice-extraction-process.md`

**Goal:** Generalize the natural-vs-effortful heuristic classification pattern so that any new author's twin knows to classify heuristics at bootstrap time — not just Travis's.

**What changes:**
- Add a new subsection to `references/voice-extraction-process.md` after the extraction order table
- Section title: `## Natural-vs-effortful heuristic classification`
- Content: explanation of the concept, the classification question to ask for any author, how to express the output in document 11, how the output drives Mode A step 4b enforcement, Travis's substrate as the reference implementation (5 effortful / 11 natural, grounded in CliftonStrengths bottom themes)

**File:** `skills/authentic-digital-twin-content/references/voice-extraction-process.md`
**Constraint:** Additive only — no modification to existing sections.
**Recommended agent:** claude-code (document edit)
**SKILL.md description impact:** None.

**Tasks:**
- [ ] Read current `voice-extraction-process.md` in full
- [ ] Insert new section after the extraction order/dependencies block (before "What each document looks like at finished state")
- [ ] Section ~200 words; Travis substrate cited as reference implementation
- [ ] Verify no existing content modified

---

### Change S — Re-test cadence protocol in `voice-extraction-process.md`

**Goal:** Specify what "material shift" means for CliftonStrengths and SoulTrace assessments, which substrate documents update per shift type, and when to re-run the effortful-heuristic classification. Resolves STATE.md OQ5.

**What changes:**
- Extend the existing `## Re-extraction triggers` section in `references/voice-extraction-process.md`
- Add a new subsection: `### Personality-framework re-test cadence`
- Content: categorical-assessment protocol (CliftonStrengths — rank-zone boundary crossings, which docs update), probabilistic-assessment protocol (SoulTrace — color-dimension threshold, archetype change), partial vs. full re-extraction criteria, effortful-heuristic re-classification trigger
- Update STATE.md OQ5 to RESOLVED

**Files:** `skills/authentic-digital-twin-content/references/voice-extraction-process.md`, `skills/authentic-digital-twin-content/docs/digital-twin-travis/STATE.md`
**Constraint:** Additive to voice-extraction-process.md. STATE.md OQ5 line update only.
**Recommended agent:** claude-code (document edit, same session as Change R — single atomic edit to voice-extraction-process.md)
**SKILL.md description impact:** None.

**Tasks:**
- [ ] As part of the same edit session as Change R, append the new subsection to `## Re-extraction triggers`
- [ ] Subsection ~250 words; cover CliftonStrengths rank-zone boundary, SoulTrace ≥10-point color shift, partial vs. full re-extraction decision rule, effortful-heuristic re-classification trigger
- [ ] Update STATE.md line for OQ5: change `5. **Re-test cadence:**...` to `5. **Re-test cadence:** RESOLVED — see references/voice-extraction-process.md, Re-test Cadence Protocol section.`

---

### Change T — Create `references/shadow-pattern-detector.md`

**Goal:** Move the shadow-pattern detection signals to a dedicated reference file, add an escalation protocol, and frame the pattern generically for new-author use. Establishes the file that Change U will reference.

**What changes:**
- Create `skills/authentic-digital-twin-content/references/shadow-pattern-detector.md`
- Content sections:
  1. **Overview** — what the shadow-pattern detector is, why it exists (soft-warn, not hard-gate), Tier 1 scope constraint
  2. **Four Operator shadow patterns** — expanded detection signals (richer than the compact SKILL.md table); one subsection per pattern with: name, what it is structurally, detection signal, example of a false positive to watch for
  3. **Escalation protocol** — observation threshold (20+ Tier 1 outputs), false-positive rate cap (>30% = do not escalate), escalation threshold (≤15% FPR on 20+ observations = eligible), per-pattern independent evaluation, author confirmation gate (3 representative instances reviewed)
  4. **Generic design note** — any twin should consider adapting shadow-pattern detection to its author's personality failure modes; Travis's four patterns are the reference implementation for the Operator archetype

**File:** `skills/authentic-digital-twin-content/references/shadow-pattern-detector.md` (new)
**Constraint:** SKILL.md step 8 inline table stays in place; new file does not replace it.
**Recommended agent:** claude-code (new file)
**SKILL.md description impact:** None (file pointer addition handled in Change U).

**Tasks:**
- [ ] Create `references/shadow-pattern-detector.md` with four sections above
- [ ] Expanded detection signals must include a false-positive watch-for note per pattern
- [ ] Escalation protocol must specify: threshold, rate caps, per-pattern independence, author confirmation gate
- [ ] Generic design note must frame Travis's instantiation as the Operator archetype reference implementation

---

### Change U — Generic-pattern framing in SKILL.md steps 4b and 8

**Goal:** Make SKILL.md steps 4b and 8 entry points for new-author adaptation, not Travis-only instructions. One sentence per step directing to the appropriate reference file.

**What changes:**
- In `SKILL.md` step 4b: after the natural-heuristics note ("The 11 natural heuristics… are applied implicitly via substrate reading — no explicit enforcement needed."), add one sentence: `For new author substrates, see the natural-vs-effortful classification guidance in references/voice-extraction-process.md.`
- In `SKILL.md` step 8: after the Tier 1 scope constraint line ("Skip this step for Tier 2 and Tier 3 surfaces."), add one sentence: `For escalation protocol and expanded detection signals, see references/shadow-pattern-detector.md.`

**File:** `skills/authentic-digital-twin-content/SKILL.md`
**Constraint:** Description field must remain ≤ 1024 chars (currently 928 — body additions do not affect the description field). Two sentences added to body only.
**Recommended agent:** claude-code (targeted edit)
**SKILL.md description impact:** None (body change only).
**Depends on:** Change T (shadow-pattern-detector.md must exist before U references it).

**Tasks:**
- [ ] Read SKILL.md steps 4b and 8 in context
- [ ] Add one sentence to step 4b after natural-heuristics note
- [ ] Add one sentence to step 8 after Tier scope line
- [ ] Verify description field unchanged at 928/1024 chars

---

## Execution order and parallelism

```
R + S (single atomic edit to voice-extraction-process.md + STATE.md OQ5 update)
       ↓ complete
T (create shadow-pattern-detector.md — independent of R/S, can run concurrently with R+S)
       ↓ complete
U (SKILL.md body additions — depends on T)
       ↓ complete
Phase complete
```

**R and S are a single edit session** — same file (`voice-extraction-process.md`), with the STATE.md OQ5 line update as a second file in the same change. No parallelism risk.

**T runs concurrently with R+S** — different files, no dependency.

**U runs after T** — SKILL.md must reference `shadow-pattern-detector.md` which T creates.

---

## QA gate

Per the execute protocol, QA gate (artifact-refiner) is skipped for:
- Changes that modify fewer than 3 files
- Documentation-only changes

All four changes are documentation/prompt-engineering only (no code). QA gate skipped for all.

---

## Constraints carried forward

| Constraint | Value | Source |
|---|---|---|
| SKILL.md description ≤ 1024 chars | 928 chars currently; no description changes planned | Phase-4 reflection |
| No SKILL.md inline extraction of step 8 table | Table stays inline; shadow-pattern-detector.md adds supplementary content | OQ2 resolution |
| STATE.md OQ5 marked RESOLVED | Change S includes the STATE.md update | OQ3 resolution |
