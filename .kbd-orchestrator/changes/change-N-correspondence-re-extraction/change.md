# Change N — Correspondence register re-extraction

**Phase:** phase-3b-substrate-hardening
**Status:** READY
**Files:** `docs/digital-twin-travis/02-writing-samples-prompts.md`, `docs/digital-twin-travis/10-collaboration-style.md`
**Type:** substrate / register re-extraction
**Source:** `raw-inputs.md` — 3 emails

## Goal

Replace the derived Correspondence Register sections in docs 02 and 10 with patterns extracted from 3 real Travis emails. Promote Gate 3 from "warn" to "pass" for internal-team and formal-enterprise email sub-registers.

## Source samples

- Email 1 — to Randy Jesberg (working partner; financial-pressure, methodology proposal)
- Email 2 — to Hal (formal enterprise client; phase-close status update)
- Email 3 — to Randy Jesberg (working partner; time estimate / analysis)

## Key extraction corrections (derived model was wrong about these)

- **Sign-off:** actual is `TJJ` (three-initial monogram) across both tiers — derived table predicted `— Travis` / `Travis James`
- **Salutation:** "Hey, [Name]," (working partner) and "Good morning, [Name]!" (formal) — both warmer than derived table predicted
- **ALL-CAPS emphasis:** survives into email ("ONLY", "BOTH", "JUST") — derived table predicted it drops
- **"etc." closer:** survives in formal email — derived table predicted selective drop
- **Personal-anecdote close:** present in working-partner email (college roommate paragraph) — not predicted by derived model
- **Structured sub-headers:** estimate emails use "What Is Left" / "Portal Side" / "Agent Side"

## Sub-register coverage

Internal-team/working-partner (Randy) and formal-enterprise (Hal) directly sampled — fully re-extractable. External-champion sub-register (Neil Henry tier) NOT sampled — keep marked "derived" with explicit note.

## Tasks

- [ ] Read full Correspondence Register sections in docs 02 (pp. 190–245) and 10 (pp. 272+)
- [ ] Extract salutation, sign-off, opener, emphasis, closer, structure from the 3 emails
- [ ] Rewrite doc 02 section: drop "(Derived)" from heading; extraction note replaces derivation note; correct pattern tables against samples; keep external-champion sub-register marked derived
- [ ] Rewrite doc 10 section: same treatment
- [ ] Add 3 emails (or representative excerpts) as cited samples in doc 02
- [ ] Update Gate 3 status: email-internal + email-formal → "pass"; email-external-champion → "warn (derived)"

## Acceptance criteria

- Both Correspondence Register sections re-extracted from real samples; "(Derived)" marker removed for internal + formal sub-registers
- Pattern tables corrected — sign-off `TJJ`, ALL-CAPS retention, "etc." retention, personal-anecdote close all reflected
- External-champion sub-register explicitly flagged as still-derived
- 3 emails cited as samples in doc 02
- Gate 3 status notes updated
