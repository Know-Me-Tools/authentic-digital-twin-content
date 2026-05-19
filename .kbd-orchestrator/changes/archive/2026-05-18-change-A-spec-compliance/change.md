# Change A — Spec compliance

**Phase:** phase-1-distribution-compliance
**Depends on:** none
**Recommended agent:** general-purpose
**Status:** [x] DONE — 2026-05-18

## Goal

Skill conforms to the agentskills.io frontmatter spec and passes `skills-ref validate`.

## Tasks

- [x] Resolve Open Question 3 (license choice) — Apache-2.0; `docs/digital-twin-travis/` all-rights-reserved
- [x] Relocate `version` from top-level frontmatter into `metadata.version`
- [x] Add `metadata` map (author, version, homepage, repository — provisional pending Change B)
- [x] Add `license` frontmatter field
- [x] Add top-level `LICENSE` file; scope-exclude `docs/digital-twin-travis/`
- [x] Add optional `compatibility` field noting surreal-memory MCP dependency
- [x] Confirm parent directory name == `name` at every shipping location
- [x] Add `.gitignore`; remove `.DS_Store` files
- [x] Run `skills-ref validate ./` → green

## Done when

`skills-ref validate` passes; no non-standard top-level frontmatter keys; `LICENSE` exists; no `.DS_Store` tracked.

## Verification

```
$ npx skills-ref validate .
Valid skill: .
```

## Out of scope

Skill behavior changes; `description` text edits (reserved for Change D); packaging.
