# Assessment — phase-5

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Travis-independent skill improvements — generalize the shadow-pattern and effortful-heuristic patterns for new-author use, add re-test cadence protocol, and evaluate shadow-pattern escalation.
**Date:** 2026-05-19
**Source:** `.kbd-orchestrator/phases/phase-4/reflection.md` (recommended scope), STATE.md OQ5, SKILL.md current state, `references/voice-extraction-process.md` current state

---

## Phase-5 Context

Phase-5 is the continuation of feature work that requires no Travis input. It was scoped in the phase-4 reflection as the next Travis-independent phase. Phase-3b (substrate hardening) remains blocked on Travis input and will resume when he supplies samples or review verdicts.

**No blockers.** All four proposed changes can be executed now.

---

## Current State Inventory

### SKILL.md (236 lines, description 928/1024 chars)

Mode A now has 8 steps (including 4b). The effortful-heuristic table (step 4b) and shadow-pattern detector (step 8) are both inline in SKILL.md. The detection signals are approximately 20 lines of content inside step 8.

**Relevant facts:**
- 928/1024 chars in description — 96 chars of headroom
- 236 lines total — not yet at the extraction threshold for shadow-pattern signals (the phase-4 reflection estimated extraction would be warranted "as the skill grows")
- Step 4b effortful-heuristic table is 7 lines — compact; no extraction needed
- Step 8 shadow-pattern table is ~20 lines — borderline; extraction to `references/shadow-pattern-detector.md` would modularize it but is not urgent

### `references/voice-extraction-process.md` (150 lines)

Contains: required inputs table, eleven extraction documents, extraction order and dependency chain, finished-state examples, stylometric reliability gates (1, 2, 3), good-extraction properties, persistence notes, re-extraction triggers.

**Gap:** No section on the natural-vs-effortful heuristic classification pattern. The voice-extraction-process is the guide for bootstrapping a new author's substrate — it tells the skill how to build `11-decision-heuristics.md` (extraction order entry: "depends on 02, 03, 04"). But it does not tell the skill to ask, for any author: "which of their documented heuristics run against their personality profile?" That question is the mechanism that produced the five effortful heuristics for Travis. It is generalizable to any author. It belongs in the voice-extraction-process guide, not only in Travis's substrate.

### Shadow-pattern detector — escalation status

The phase-4 reflection stated: "This phase establishes the detection mechanism; a future phase can escalate to hard gate once false-positive rate is characterized." Since phase-4, no actual generated content has been run through the detector. The false-positive characterization has not begun. The escalation question ("do any of the four patterns warrant a hard gate?") cannot be answered without data from actual use. The correct response at this phase is to specify the escalation protocol — the decision framework for when a pattern moves from soft-warn to hard-gate — so that when use data accumulates, the evaluation can be run against a defined standard.

### STATE.md OQ5 — Re-test cadence

The open question is: "How should the digital twin update when Travis retakes either assessment? CliftonStrengths is generally stable but ranks can shift; SoulTrace is adaptive Bayesian and converges differently each pass."

This question has never been answered in any phase. The `voice-extraction-process.md` has a "Re-extraction triggers" section that lists conditions for re-extracting (material personality assessment shift, new register, off-voice content flagged, 6–12 months elapsed). But it does not specify:
- What "shifts materially" means for CliftonStrengths (how many rank positions, which themes)
- What "shifts materially" means for SoulTrace (which archetypes, which color dimensions, what threshold)
- Which substrate documents update when which assessment changes
- Whether partial re-extraction (only the affected documents) is sufficient or whether the full 11-document chain needs re-run

This protocol belongs in `references/voice-extraction-process.md` under the "Re-extraction triggers" section, extending it with specificity.

---

## Gap Analysis

### Gap 1 — `voice-extraction-process.md` lacks natural-vs-effortful heuristic classification guidance

**What's missing:** When bootstrapping a new author's substrate and writing document 11 (decision-heuristics), the skill needs to ask which heuristics are natural (amplifying the author's dominant traits) and which are effortful (compensating for trait gaps). This classification is what tells Mode A which heuristics to enforce explicitly at step 4b versus which to apply implicitly via substrate reading.

The Travis case is: 5 effortful (heuristics 4, 7, 9, 11, 16 — those running against bottom-tercile CliftonStrengths themes Empathy #34, Deliberative #33, Discipline #26, Developer #32), 11 natural (the rest). But the classification method — cross-referencing heuristics against the personality framework's low-scoring or absent themes — is not documented anywhere in the skill's reference materials. It lives only in the Travis substrate itself.

**Impact:** Any new author bootstrapped with the skill will get document 11 (decision heuristics) written, but the extractor will not know to classify heuristics as natural vs. effortful. The twin will generate without step-4b-style explicit enforcement, producing voice output that is missing the counter-default behaviors that distinguish the twin from the author's default behavior.

**Where it goes:** New subsection in `voice-extraction-process.md` after the extraction order table, titled "Natural-vs-effortful heuristic classification" (or similar). ~200 words explaining the concept, the classification question to ask, and how to express the classification in document 11.

---

### Gap 2 — `voice-extraction-process.md` lacks re-test cadence specificity

**What's missing:** The "Re-extraction triggers" section in `voice-extraction-process.md` names the trigger condition ("author retakes a personality assessment and results shift materially") without defining:
- What counts as material shift for categorical assessments (CliftonStrengths: ranked themes)
- What counts as material shift for probabilistic assessments (SoulTrace: color-dimension probabilities)
- Which documents update when top-themes shift vs. when bottom-themes shift vs. when mid-themes shift
- Whether the effortful-heuristic classification in document 11 needs to be re-run after a personality shift

**Impact:** When Travis retakes CliftonStrengths or SoulTrace (expected every 1–3 years, or after a major life change), the skill maintainer has no defined protocol. They face an unguided re-extraction with no clarity on scope.

**Where it goes:** Extended "Re-extraction triggers" section in `voice-extraction-process.md`, with a subsection specifically for personality-framework re-tests. ~250 words.

---

### Gap 3 — Shadow-pattern escalation protocol is undefined

**What's missing:** The phase-4 design decision was: soft warn now, hard gate after false-positive characterization. But "characterize the false-positive rate" is not a protocol — it's an intention. No criteria exist for:
- How many soft-warn instances to observe before evaluating escalation
- What false-positive rate threshold would block escalation (keep soft-warn)
- What false-positive rate threshold would permit escalation to hard gate
- Which of the four patterns are most vs. least likely to warrant escalation (the four have different detection specificity)
- How to distinguish "shadow pattern confirmed" from "shadow pattern false-positive" in practice

**Impact:** Without an escalation protocol, the soft-warn remains soft-warn indefinitely regardless of what the data shows. Conversely, escalation without a protocol risks escalating on insufficient data.

**Where it goes:** New `references/shadow-pattern-detector.md` document. This document serves double duty: it extracts the detection signals from SKILL.md (so SKILL.md stays compact as it grows) and adds the escalation protocol.

**Note on SKILL.md extraction:** At 236 lines and step 8 at ~20 inline lines, extraction is not urgent now. But creating `shadow-pattern-detector.md` now, even if SKILL.md step 8 keeps a compact summary inline, establishes the file pointer and escalation protocol before the skill grows further. A future phase can do the full inline-to-file migration.

---

### Gap 4 — Shadow-pattern escalation and effortful-heuristic classification are documented as Travis-specific; neither is framed as a generic skill pattern

**What's missing:** Both the effortful-heuristic step (4b) and the shadow-pattern check (step 8) are phrased in terms of Travis's specific substrate. Step 4b names five specific heuristics. Step 8 names four specific Operator shadow patterns. But the underlying design decisions are generic:

- Any author has some heuristics that run against their natural personality profile — those need explicit enforcement
- Any author with a documented personality type has documented shadow/failure patterns — those warrant detection in generated content

The Travis-specific instantiations are correct for Travis. The generic design pattern — that twin skills should include an effortful-heuristic enforcement step and a shadow-pattern check step — is not documented anywhere. A skill builder bootstrapping a new author's twin would not know these steps should be adapted for their author.

**Impact:** This is a documentation gap more than a code gap. The skill is correct for Travis. A new author's twin built using the skill as a template would need to know to adapt steps 4b and 8 to their author's personality profile and shadow patterns.

**Where it goes:** Both `voice-extraction-process.md` (which covers bootstrap mode) and `shadow-pattern-detector.md` (which covers the detector) should frame their content as generic patterns, with Travis as the reference implementation.

---

## Proposed Changes for Phase-5

### Change R — Add natural-vs-effortful heuristic classification to `voice-extraction-process.md`

**Scope:** Add a new subsection to `voice-extraction-process.md` under the extraction order table. The subsection explains:
- What the natural-vs-effortful classification is (which heuristics amplify the author's dominant traits vs. compensate for trait gaps)
- The classification question to ask for any author: cross-reference each documented heuristic against the personality framework's low-scoring or absent themes
- How to express the classification in document 11 (a two-column table: heuristic → natural/effortful with justification)
- The downstream use: effortful heuristics become the explicit enforcement list for Mode A step 4b; natural heuristics remain implicit
- Travis's substrate as the reference implementation (5 effortful, 11 natural, grounded in CliftonStrengths bottom themes)

**Files modified:** `references/voice-extraction-process.md`
**Lines added:** ~200
**SKILL.md description constraint:** No change to SKILL.md.

---

### Change S — Add re-test cadence protocol to `voice-extraction-process.md`

**Scope:** Extend the "Re-extraction triggers" section in `voice-extraction-process.md` with a specific subsection on personality-framework re-tests. The subsection specifies:
- For **categorical/ranked assessments** (CliftonStrengths): re-extract documents 01, 04, 10, 11 if any theme moves across the natural-vs-effortful boundary (any effortful theme breaks into top-15, or any natural theme drops below #20). Lesser rank shifts within the same zone: update document 01 table only. Re-run the effortful-heuristic classification in document 11 whenever the bottom-theme cluster changes.
- For **probabilistic assessments** (SoulTrace): re-extract documents 01, 07, 10, 11 if the primary archetype changes or if any color dimension shifts more than 10 percentage points. Stability across passes is signal (as Travis's Green 5% held across seven years) and should be noted as durable substrate.
- **Scope of re-extraction:** Partial re-extraction is sufficient when the shift is limited to one framework. Full 11-document re-run is warranted when multiple frameworks shift simultaneously or when the author self-reports that the substrate "no longer feels right."
- **Effortful-heuristic re-classification:** Must be re-run whenever document 11's natural-vs-effortful classification would change due to a personality shift.

**Files modified:** `references/voice-extraction-process.md`
**Lines added:** ~250
**SKILL.md description constraint:** No change to SKILL.md. STATE.md OQ5 resolved.

---

### Change T — Create `references/shadow-pattern-detector.md` with escalation protocol

**Scope:** Create a new `references/shadow-pattern-detector.md` file that:
1. Documents the four Operator shadow patterns with their detection signals (extracted from SKILL.md step 8 and expanded)
2. States the current disposition: soft-warn, not hard-gate; Tier 1 only
3. Specifies the escalation protocol — the decision framework for when a pattern moves to hard gate:
   - Observation threshold: evaluate after 20+ Tier 1 outputs where step 8 ran
   - False-positive rate cap: if >30% of soft-warn triggers are judged false positives by the author, do not escalate that pattern
   - Escalation threshold: if ≤15% false-positive rate on 20+ observations, pattern is eligible for hard-gate evaluation
   - Escalation decision: hard gate requires author confirmation; the author reviews 3 representative triggered instances and confirms the detection signal is valid
   - Per-pattern escalation: each of the four patterns evaluates independently; one pattern can be hard-gated while others remain soft-warn
4. Frames the generic design principle: any twin should consider shadow-pattern detection for the author's documented personality failure modes

Add a file pointer in SKILL.md step 8 pointing to `references/shadow-pattern-detector.md` for the full escalation protocol and expanded signals. Keep the compact detection table inline in SKILL.md.

**Files modified:** `references/shadow-pattern-detector.md` (new), `SKILL.md` (add one-line file pointer in step 8)
**SKILL.md description constraint:** No change to description field. Step 8 gets one added sentence pointing to the reference file — net zero or slight decrease in SKILL.md body length.

---

### Change U — Frame steps 4b and 8 as generic patterns in SKILL.md

**Scope:** Add a parenthetical note in SKILL.md step 4b and step 8 stating that these steps instantiate generic twin-skill design patterns and directing new-author bootstrap to `references/voice-extraction-process.md` (for the effortful-heuristic classification) and `references/shadow-pattern-detector.md` (for shadow-pattern adaptation). One sentence per step — does not expand the detection tables or heuristic tables.

**Files modified:** `SKILL.md`
**SKILL.md description constraint:** Changes are in the body, not the description field. Description remains 928/1024 chars.

---

## Change Ordering

Changes R and S both modify `voice-extraction-process.md` — sequential, not parallel. Change T creates a new file. Change U modifies SKILL.md.

Recommended order:
1. **R** — effortful-heuristic classification section (foundational for new-author bootstrap)
2. **S** — re-test cadence protocol (extends same file; depends on R being in place to reference)
3. **T** — shadow-pattern-detector.md (independent; references SKILL.md step 8 content which is unchanged)
4. **U** — SKILL.md generic-pattern notes (depends on T being created first, so the file pointer is valid)

Changes R and S are sequential (same file). Changes T and U are sequential (T must exist before U references it). R/S can proceed in parallel with T, then U runs last.

---

## Open Questions for Plan Phase

| OQ | Question | Stakes |
|---|---|---|
| OQ1 | Should `voice-extraction-process.md` changes (R and S) be a single edit or two separate edits? | Both modify the same file; single atomic edit is safer and avoids mid-file inconsistency |
| OQ2 | Should the shadow-pattern-detector.md include the full four-pattern detection table (extracted from SKILL.md step 8) or only the escalation protocol? | Full extraction reduces SKILL.md length but makes step 8 require a file load; compact summary inline + full file is better for operator use |
| OQ3 | Should OQ5 from STATE.md be marked resolved after Change S? | Yes — the re-test cadence protocol in voice-extraction-process.md is the answer to OQ5 |
| OQ4 | Should Change U add the generic-pattern framing to Mode B and Mode C as well, or only Mode A steps 4b and 8? | Mode B and C don't have effortful-heuristic or shadow-pattern steps; only Mode A needs the note |

---

## What Is Not in Scope for Phase-5

- **Substrate hardening** (correspondence, ultra-short, spoken register re-extraction) — blocked on Travis input; see phase-3b
- **Worked example review** — blocked on Travis; see phase-3b Change Q
- **Tier 1 format-demo or worked example updates** — not needed; existing examples are structurally correct
- **agentskills.io submission** — DISTRIBUTION-STATUS.md entry already drafted; submit when channel opens
- **Surreal-memory ingestion** — out of scope until MCP server availability is confirmed in deployment context
- **SKILL.md description field changes** — description at 928/1024; no changes needed or planned

---

## State of OQ Ledger After Phase-5

| OQ | Status after phase-5 | Resolving change |
|---|---|---|
| OQ1 (Validation / stylometric test) | Still open — not in scope for any phase yet | — |
| OQ2 (Coverage gaps — emotional, family contexts) | Still open — no samples available | — |
| OQ3 (Annotation mechanics) | Resolved (phase-1, phase-2) | — |
| OQ4 (agentskills.io skill shape) | Resolved (phase-3, DISTRIBUTION-STATUS.md) | — |
| OQ5 (Re-test cadence) | **Resolved by Change S** | Change S |
| OQ6 (Shadow detection) | Resolved (phase-4, Change M) | — |
| OQ7 (Effortful-heuristic enforcement) | Resolved (phase-4, Change L) | — |
