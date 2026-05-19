# Change K — README Polish for Distribution Readiness

**Phase:** phase-3-voice-validation
**Track:** A (Travis-independent)
**Risk:** Low — README update; no behavior change
**Recommended agent:** general-purpose
**Status:** TODO

---

## Goal

Update the project-root `README.md` to add three missing reference sections that matter to a developer browsing the GitHub repo for the first time.

## Tasks

- [ ] Add **"Worked examples" section** — brief table linking to the three worked examples in `docs/worked-examples/` (Tier 1 format demo, Tier 2 LinkedIn post, Tier 3 voice prep). One-line description per example of what it demonstrates.
- [ ] Add **"Standard version" section** (or expand existing standard reference) — clear statement that this skill implements Standard v2; link to `skills/authentic-digital-twin-content/docs/standards/authentic-digital-twin-content-standard-v2.md`; one-line note that Standard v1 articles remain valid.
- [ ] Add **"Reference implementation" note** — Travis James's substrate (`docs/digital-twin-travis/`) is the reference implementation of what good substrate looks like; the skill is generic; Travis's substrate is an example, not a dependency.

## Done when

- `README.md` has a worked-examples section with links to all three worked examples
- `README.md` has a standard-version note with link to the v2 spec
- `README.md` has a reference-implementation note about the Travis substrate
- All links resolve to existing files

## Constraints

- `SKILL.md` description must remain ≤ 1024 chars — README changes do not touch SKILL.md; constraint noted for awareness only
- README is public-facing — no internal project paths, personal contact details, or private infra references
- Keep each new section brief: 4–8 lines; this is targeted enrichment, not a rewrite
- Links must resolve to actual existing files in the repo
