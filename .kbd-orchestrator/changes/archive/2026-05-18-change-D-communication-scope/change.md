# Change D — Communication-scope expansion

**Phase:** phase-1-distribution-compliance
**Depends on:** Change A, Change B, Change C
**Recommended agent:** prompt-engineer
**Status:** [x] DONE — 2026-05-18

## Goal

Extend the skill from published artifacts to all communication surfaces (email, chat, social, voice, comments).

## Tasks

- [x] Resolve Open Question 4 (Standard v2 vs v1.1) — user confirmed v2 (major)
- [x] Design tiered provenance model (full manifest → compact inline tag → channel-level disclosure); update `references/annotation-scheme.md`
- [x] Add communication-surface taxonomy reference file (`references/communication-surface-taxonomy.md`)
- [x] Expand substrate register coverage; make spoken/conversational/ultra-short/correspondence registers first-class; add Gate 3 (surface-register match) to `references/voice-extraction-process.md`
- [x] Author Standard v2 in `docs/standards/authentic-digital-twin-content-standard-v2.md`; v1 articles remain valid
- [x] Rewrite `SKILL.md` "When to use" / "Do not trigger" lists and `description` field — description at 928/1024 chars (96 headroom)
- [x] Resolve Open Question 5 (split bootstrap vs. generate) — decision: keep as modes A/C within one skill; Mode A now surface-aware. Documented in `references/communication-surface-taxonomy.md`.
- [x] Re-run `skills-ref validate` → green

## Verification

```
$ npx skills-ref validate skills/authentic-digital-twin-content
Valid skill: skills/authentic-digital-twin-content
```

Description: 928 chars (limit 1024, 96 headroom). ✓

## Artifacts produced

- `skills/authentic-digital-twin-content/docs/standards/authentic-digital-twin-content-standard-v2.md` (new)
- `skills/authentic-digital-twin-content/references/communication-surface-taxonomy.md` (new)
- `skills/authentic-digital-twin-content/references/annotation-scheme.md` (updated — tier selection, Tier 2/3 formats, tri-tier QA checklist)
- `skills/authentic-digital-twin-content/references/voice-extraction-process.md` (updated — v2 inputs table, Gate 3, v2 register triggers)
- `skills/authentic-digital-twin-content/SKILL.md` (updated — description, standard version reference, When to use, Do not trigger, Mode A surface routing, file pointers, What this skill does not do)

## Done when

Standard v2 published; tiered provenance model documented; surface taxonomy exists; `SKILL.md` triggers and `description` updated within char ceiling; `skills-ref validate` still green. ✓

## Out of scope

Re-running packaging/registration (D's output flows into the next phase's re-validation).
