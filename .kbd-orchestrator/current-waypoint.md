# Current Waypoint

**Project:** authentic-digital-twin-content
**Phase:** phase-4
**Stage:** ASSESS complete — waiting on OQ resolution before planning
**Change backend:** native KBD

## Assessment summary

Two feature changes identified, both Travis-independent:

**Change L — Effortful-heuristic enforcement in Mode A:**
Add a new step between classify (step 4) and generate (step 5) that explicitly checks which of the five effortful heuristics (4, 7, 9, 11, 16) apply to the current surface/task, and applies them during generation.

**Change M — Shadow-pattern detector (soft warn):**
Add a new step after the rejection check (step 7 → step 8) that checks for the four Operator shadow patterns (Puppet Master, Transactional Tunnel Vision, Analysis Fortress, Lone Wolf Lockdown) and appends an annotation if detected.

## Next step

Resolve OQ1–OQ4 from the assessment, then run `/kbd-plan phase-4`.

Key open questions:
- **OQ1:** Heuristic-check placement — new numbered step or integrated into step 5 phrasing?
- **OQ2:** Shadow-pattern output format — prefix warning, appended annotation, or inline flag?
- **OQ3:** Shadow-check scope — all tiers or Tier 1 only?
- **OQ4:** Natural heuristics — explicit enforcement or implicit via substrate reading?

See `phases/phase-4/assessment.md` for full detail.
