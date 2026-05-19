# Plan — phase-4

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Add two additive behavior features to SKILL.md Mode A: effortful-heuristic enforcement (Change L) and shadow-pattern detection with soft warn (Change M).
**Change backend:** native KBD (no OpenSpec detected)
**Evolver bridge:** none
**Date:** 2026-05-19
**Source:** `.kbd-orchestrator/phases/phase-4/assessment.md`

---

## Open question resolutions

| OQ | Question | Resolution |
|---|---|---|
| OQ1 | Heuristic-check placement | **New numbered step.** Insert as step 4b between classify (step 4) and generate (step 5). Visible structure enforces behavior; integrating into step 5 phrasing would replicate the same implicit-reading problem at the skill level. |
| OQ2 | Shadow-pattern output format | **Appended annotation block (option b).** Consistent with the annotation-block pattern already in use in worked examples. Prefix interrupts before the user reads; inline is unreliable for structural patterns spanning paragraphs. |
| OQ3 | Shadow-pattern check scope | **Tier 1 only.** Tier 2 (compact social/email) and Tier 3 (voice prep bullets) are too short for reliable structural-pattern detection. False-positive rate would be high. Start with Tier 1 long-form; expand in a later phase once detection is validated. |
| OQ4 | Natural heuristics | **Stay implicit.** Natural heuristics (1, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15) surface automatically from substrate reading. Explicit enforcement adds overhead without increasing reliability — counter-default enforcement is where the value is. |

---

## Ordered change list

Two changes, both independent — can run in parallel.

| # | Change ID | Depends on | Recommended agent | Risk |
|---|---|---|---|---|
| L | change-L-effortful-heuristic-enforcement | — | `prompt-engineer` | Low |
| M | change-M-shadow-pattern-detector | — | `prompt-engineer` | Low-Medium |

**Rationale:**
- **L ∥ M** — both modify SKILL.md Mode A, but at different steps (L inserts step 4b; M inserts step 8 after the rejection check). No shared state; no ordering dependency.
- Both are prompt-engineering changes — the implementation is precise instruction writing in SKILL.md, not code.
- Both are additive — no existing steps removed or reordered. Risk is bounded.

**Sequencing note:** If running sequentially rather than in parallel, run L first — the effortful-heuristic step changes the generation behavior, and the shadow-pattern check validates output quality after generation. Logically L runs before M in the pipeline, so parallel execution avoids potential confusion about where each step sits.

---

## Change L — Effortful-heuristic enforcement in Mode A

**File:** `.kbd-orchestrator/changes/change-L-effortful-heuristic-enforcement/change.md`
**Recommended agent:** prompt-engineer
**Risk:** Low — additive step to Mode A; no existing steps removed

**Scope:**

Insert a new **step 4b** into SKILL.md Mode A, between "Classify content type" (step 4) and "Generate the content" (step 5):

> **4b. Apply effortful heuristics.** Before generating, check which of the five effortful heuristics are relevant to this surface and task, and apply them explicitly during generation. Do not rely on implicit substrate reading — these heuristics are counter-default and must be enforced consciously.

The step must include the surface-applicability table:

| Heuristic | When to apply |
|---|---|
| 4 — Phase Discipline | Always: Mode A generates content — never produce assessment or plan-level output in a generation task |
| 7 — Don't Pivot Silently | When a Gate 3 warning fired or a substrate gap was found: surface the gap explicitly before generating |
| 9 — Champion Over Cold Outreach | When the surface is GTM, sales, or relationship content: recommend champion paths, not outreach-system optimization |
| 11 — Cedar Governance | When the surface is in a regulated domain (healthcare, banking, policy): include governance framing in the generated content |
| 16 — Acknowledge Before Analyzing | When the content is in a conflict, repair, or feedback context: open with acknowledgment before analysis |

**Note on natural heuristics (OQ4):** The 11 natural heuristics (1, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15) stay implicit — substrate reading via docs 01, 04, 08, 11 is sufficient. No explicit enforcement needed for natural behaviors.

**Done when:** SKILL.md Mode A contains step 4b with the effortful-heuristic check and the surface-applicability table; renumbering of subsequent steps (5 stays 5, annotations stay 6, rejection check stays 7) — step 4b is a sub-step, not a full renumber.

---

## Change M — Shadow-pattern detector (soft warn, Tier 1 only)

**File:** `.kbd-orchestrator/changes/change-M-shadow-pattern-detector/change.md`
**Recommended agent:** prompt-engineer
**Risk:** Low-Medium — new post-generation check; soft warn does not block output

**Scope:**

Add a new **step 8** to SKILL.md Mode A after the rejection check (current step 7), applying only when the surface is **Tier 1 (long-form)**:

> **8. Shadow-pattern check (Tier 1 only).** After the rejection filter passes, scan the generated content for the four Operator shadow patterns. If any pattern is detected, append a shadow-pattern annotation block to the output. Output proceeds — this is a soft warn, not a hard gate.

The step must document all four detection signals:

| Shadow | Detection signal | Example indicator |
|---|---|---|
| Puppet Master | Framing steers the reader to a predetermined conclusion without genuine alternatives; "position X and then Y will inevitably follow" without naming a counter-position | Strategic advice with no credible alternative offered |
| Transactional Tunnel Vision | Close lands only on metrics with no relational stake; human cost not acknowledged; "the ROI case" is the sole close | Proposal ending with revenue/efficiency numbers only |
| Analysis Fortress | Three or more trade-off qualifications with no commitment sentence; analysis that surfaces indefinitely without landing on a stake or direction | "On one hand… on the other hand… however… that said…" without resolution |
| Lone Wolf Lockdown | GTM/relationship content recommends building new outreach systems rather than leveraging existing named relationships; system-design framing in contexts calling for relationship investment | "Build a pipeline" where "call Neil" is the correct answer |

**Shadow-pattern annotation block format** (appended to output when triggered):

```markdown
---

## Shadow-pattern check

⚠ **[Pattern name] detected** — [one-sentence description of what triggered it and what to consider]

This is a soft warning. The output above is returned as generated. Review the flagged passage before publishing.
```

**Scope constraint (OQ3):** This step applies **only when the surface annotation tier is Tier 1 (long-form articles, reports, proposals)**. Skip for Tier 2 and Tier 3 surfaces — those are too short for reliable structural-pattern detection.

**Done when:** SKILL.md Mode A contains step 8 with the shadow-pattern check, the four detection signals, and the annotation block format; step is clearly scoped to Tier 1 only.

**Optional companion doc:** If the detection signals are too long to include inline in SKILL.md without bloating the skill, create `references/shadow-pattern-detector.md` as a reference file and link from step 8. The prompt-engineer agent should make this call based on overall SKILL.md length after inserting both changes.

---

## Verification gates (per change)

| Change | Gate |
|---|---|
| L | SKILL.md Mode A contains a clearly numbered step 4b with the effortful-heuristic applicability table; five heuristics named; natural heuristics noted as implicit |
| M | SKILL.md Mode A contains a step 8 with the shadow-pattern check; four shadow patterns documented with detection signals; annotation block format specified; Tier 1 scope constraint stated |

---

## Constraints

- **SKILL.md description must remain ≤ 1024 chars.** Current: 928 chars (96 chars headroom). Changes L and M modify the Mode A procedure body — not the YAML frontmatter description. Description should not be touched unless there is clear value in updating it and the count is verified before committing.
- **Additive only.** No existing steps removed, reordered, or renamed. Step 4b is a sub-step. Step 8 is a new terminal step.
- **Shadow-pattern check is soft warn.** Output is never blocked by the shadow-pattern check. The annotation is appended; the generation is returned. Hard-gate escalation is a future-phase decision after false-positive rate is known.
- **Tier 1 scope for shadow detection.** Step 8 must explicitly state it applies only to Tier 1 surfaces. Tier 2 and Tier 3 generation skips step 8.
- Travis James substrate is all-rights-reserved. Changes L and M do not touch the substrate files. They modify only `SKILL.md`.
