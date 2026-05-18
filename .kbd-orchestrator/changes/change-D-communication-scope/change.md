# Change D — Communication-scope expansion

**Phase:** phase-1-distribution-compliance
**Depends on:** Change A, Change B, Change C
**Recommended agent:** prompt-engineer
**Status:** [ ] not started

## Goal

Extend the skill from published artifacts to all communication surfaces (email, chat, social, voice, comments).

## Tasks

- [ ] Resolve Open Question 4 (Standard v2 vs v1.1)
- [ ] Design tiered provenance model (full manifest → compact inline tag → channel-level disclosure); update `references/annotation-scheme.md`
- [ ] Add communication-surface taxonomy reference file (surface → provenance tier, register, trigger eligibility)
- [ ] Expand substrate register coverage; make spoken/conversational/ultra-short registers first-class; revisit "two registers minimum" gate to be surface-aware
- [ ] Author Standard v2 in `docs/standards/`; keep v1 articles valid
- [ ] Rewrite `SKILL.md` "When to use" / "Do not trigger" lists and `description` field — KEEP `description` ≤ 1024 chars (currently 892, 132 headroom)
- [ ] Consider Open Question 5 (split bootstrap vs. generate) — decide, do not necessarily execute
- [ ] Re-run `skills-ref validate` → still green

## Done when

Standard v2 published; tiered provenance model documented; surface taxonomy exists; `SKILL.md` triggers and `description` updated within char ceiling; `skills-ref validate` still green.

## Out of scope

Re-running packaging/registration (D's output flows into the next phase's re-validation).
