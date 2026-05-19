# Change L — Effortful-Heuristic Enforcement in Mode A

**Phase:** phase-4
**Risk:** Low — additive step; no existing steps removed
**Recommended agent:** prompt-engineer
**Status:** TODO

---

## Goal

Insert step 4b into SKILL.md Mode A — between "Classify content type" (step 4) and "Generate the content" (step 5) — that explicitly enforces the five effortful heuristics before generation.

## File to modify

`skills/authentic-digital-twin-content/SKILL.md`

## Tasks

- [ ] Read the current SKILL.md Mode A procedure (steps 1–7) to understand the exact insertion point
- [ ] Insert step 4b between step 4 and step 5 with the following content:

  **Step 4b text:**
  > **4b. Apply effortful heuristics.** Before generating, identify which of the five effortful heuristics apply to this surface and task. Apply them explicitly during generation — do not rely on implicit substrate reading. These heuristics are counter-default in Travis-the-person; the twin must enforce them:
  >
  > | Heuristic | When to apply |
  > |---|---|
  > | 4 — Phase Discipline | Always: Mode A generates content only — never produce assessment or plan-level output in a generate task |
  > | 7 — Don't Pivot Silently | When a Gate 3 warning fired or a substrate gap was found: surface the gap before generating; do not paper over it |
  > | 9 — Champion Over Cold Outreach | When the surface is GTM, sales, or relationship content: recommend named champion paths, not outreach-system optimization |
  > | 11 — Cedar Governance | When the surface is in a regulated domain (healthcare, banking, policy): include governance framing in the generated content |
  > | 16 — Acknowledge Before Analyzing | When the content is in a conflict, repair, or feedback context: open with acknowledgment before structural analysis |
  >
  > The 11 natural heuristics (1, 2, 3, 5, 6, 8, 10, 12, 13, 14, 15) are applied implicitly via substrate reading — no explicit enforcement needed.

- [ ] Verify that step numbering is correct after insertion (step 4b is a sub-step, not a full renumber — steps 5, 6, 7 remain as-is)
- [ ] Verify SKILL.md frontmatter description character count remains ≤ 1024 chars (current: 928 — do not modify the description)

## Done when

- SKILL.md Mode A contains step 4b with the effortful-heuristic table
- Five effortful heuristics named with their applicability conditions
- Natural heuristics noted as implicit
- Steps 5, 6, 7 numbering unchanged
- Description character count ≤ 1024

## Constraints

- Additive only — no existing steps removed, reordered, or renamed
- Do not touch the YAML frontmatter description unless explicitly required
- Do not touch any substrate files in `docs/digital-twin-travis/`
