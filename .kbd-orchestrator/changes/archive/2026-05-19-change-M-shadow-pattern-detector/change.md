# Change M — Shadow-Pattern Detector (Soft Warn, Tier 1 Only)

**Phase:** phase-4
**Risk:** Low-Medium — new post-generation check; soft warn, does not block output
**Recommended agent:** prompt-engineer
**Status:** TODO

---

## Goal

Add step 8 to SKILL.md Mode A — after the rejection check (step 7) — that scans Tier 1 long-form output for the four Operator shadow patterns and appends a soft-warn annotation block if any pattern is detected.

## File to modify

`skills/authentic-digital-twin-content/SKILL.md`

## Tasks

- [ ] Read the current SKILL.md Mode A procedure to understand step 7 (rejection check) — step 8 follows immediately after
- [ ] Add step 8 after step 7 with the following content:

  **Step 8 text:**
  > **8. Shadow-pattern check (Tier 1 long-form only).** After the rejection filter passes, and only when the surface tier is Tier 1, scan the generated content for the four Operator shadow patterns. If any pattern is detected, append a shadow-pattern annotation block to the output. Output proceeds regardless — this is a soft warn, not a hard gate.
  >
  > **Detection signals:**
  >
  > | Shadow | Detection signal |
  > |---|---|
  > | Puppet Master | Framing steers the reader to a predetermined conclusion without offering genuine alternatives; "position X and then Y will inevitably follow" without naming a counter-position |
  > | Transactional Tunnel Vision | Close lands only on metrics with no relational stake; human cost unacknowledged; "the ROI case" is the sole close |
  > | Analysis Fortress | Three or more trade-off qualifications with no commitment sentence; analysis surfaces indefinitely without landing on a stake or direction |
  > | Lone Wolf Lockdown | GTM or relationship content recommends building new outreach systems rather than leveraging existing named relationships |
  >
  > **Skip this step for Tier 2 and Tier 3 surfaces** — those surfaces are too short for reliable structural-pattern detection.
  >
  > **Annotation block format when triggered:**
  > ```
  > ---
  >
  > ## Shadow-pattern check
  >
  > ⚠ **[Pattern name] detected** — [one sentence describing what triggered it and what to reconsider]
  >
  > This is a soft warning. The output above is returned as generated. Review the flagged passage before publishing.
  > ```

- [ ] Assess whether the four detection signals are better housed inline (in SKILL.md) or in a companion reference file (`references/shadow-pattern-detector.md`). If SKILL.md is becoming long, create the reference file and link from step 8 instead of inlining.
- [ ] Verify SKILL.md frontmatter description character count remains ≤ 1024 chars after changes L and M are both applied

## Done when

- SKILL.md Mode A contains step 8 with the shadow-pattern check
- Four shadow patterns documented with detection signals
- Annotation block format specified
- Tier 1 scope constraint clearly stated (skip for Tier 2 and Tier 3)
- If reference file was created: `references/shadow-pattern-detector.md` exists and step 8 links to it
- Description character count ≤ 1024

## Constraints

- Soft warn only — output is never blocked by the shadow-pattern check
- Tier 1 scope is non-negotiable for this phase — do not expand to Tier 2 or Tier 3
- Additive only — no existing steps removed, reordered, or renamed
- Do not touch any substrate files in `docs/digital-twin-travis/`
- Do not touch the YAML frontmatter description unless explicitly required and count verified
