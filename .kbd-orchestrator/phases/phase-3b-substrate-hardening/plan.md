# Plan — phase-3b-substrate-hardening

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Replace three derived-pattern registers in the Travis substrate with extracted-from-raw-sample registers. Promote Gate 3 from "warn" to "pass" for email, ultra-short, and spoken surfaces.
**Change backend:** native KBD (no OpenSpec detected)
**Evolver bridge:** none
**Date:** 2026-05-19
**Source:** `.kbd-orchestrator/phases/phase-3b-substrate-hardening/assessment.md`, `raw-inputs.md`

---

## Scope

Travis supplied raw input 2026-05-19 (saved verbatim in `raw-inputs.md`). This plan covers the three changes that input unblocks: N, O, P. Change Q (worked example review) remains BLOCKED — no Travis verdict supplied — and is excluded from this plan. It will be planned separately when Travis reviews the Tier 2 / Tier 3 worked examples.

---

## Open question resolutions

| OQ | Question | Resolution |
|---|---|---|
| OQ1 | Minimum input to unblock dispatch | Resolved — Travis supplied 3 emails, 5 LinkedIn posts, 1 talk transcript. N/O/P dispatchable. |
| OQ2 | Order N/O/P sequential or parallel | **Parallel.** N modifies docs 02 + 10; O modifies doc 02; P modifies docs 02 + 07. All three touch doc 02 — so they CANNOT run as independent parallel agents on doc 02. Resolution: the three doc-02 register sections are non-overlapping (Correspondence pp.190+, Ultra-Short pp.248+, Spoken pp.296+). Execute as a **single sequential pass over doc 02** (N's section, then O's section, then P's section), then N's doc-10 edit and P's doc-07 edit independently. See Execution Order below. |
| OQ3 | Partial extraction if below sample threshold | Not triggered — all three changes meet their thresholds (N: 3 emails ≥ 3; O: 5 posts ≥ 5; P: 1 transcript ≥ 1). One sub-register exception: external-champion email is not directly sampled (see Change N). |
| OQ4 | doc 03 format | Not applicable to N/O/P — doc 03 corrections are seeded by Change Q only. Deferred with Q. |
| OQ5 | Worked examples same topic vs. different | Not applicable to N/O/P — worked-example review is Change Q. Deferred with Q. |

---

## Ordered changes

### Change N — Correspondence register re-extraction

**Goal:** Replace the derived Correspondence Register sections in docs 02 and 10 with patterns extracted from 3 real Travis emails. Promote Gate 3 for email surfaces from "warn" to "pass" for the internal-team and formal-enterprise sub-registers.

**Source material (from `raw-inputs.md`):**
- Email 1 — to Randy Jesberg (working partner; financial-pressure, methodology proposal)
- Email 2 — to Hal (formal enterprise client; phase-close status update)
- Email 3 — to Randy Jesberg (working partner; time estimate / analysis)

**Observed patterns to extract (preliminary — extraction confirms against samples):**
- Salutation: "Hey, [Name]," for working partner; "Good morning, [Name]!" for formal enterprise — both warmer than the derived table predicted
- Sign-off: `TJJ` (three-initial monogram) consistently — the derived table predicted `— Travis` / `Travis James`; the actual sign-off is `TJJ` across both tiers
- Opener: states purpose directly, no relational throat-clearing — but a one-line warmth token is present ("Thanks for sending that $500…")
- ALL-CAPS for emphasis survives into email ("ONLY", "BOTH", "JUST") — the derived table predicted ALL-CAPS drops in email; it does NOT
- "etc." closer survives in formal email ("(e.g., email, SMS, etc.)") — derived table predicted selective; actual usage retains it
- Parenthetical chains retained in both tiers
- Self-critique mid-paragraph present ("even though this goes against much of my perfectionist nature")
- Personal-anecdote close in working-partner email (the college roommate paragraph) — a register feature the derived model did not predict
- Structured sub-headers in estimate emails ("What Is Left", "Portal Side", "Agent Side")

**Sub-register coverage:** Internal-team/working-partner (Randy) and formal-enterprise (Hal) are directly sampled and fully re-extractable. The external-champion sub-register (Neil Henry tier) is NOT directly sampled — keep that sub-register's table marked "derived" with an explicit note that external-champion email awaits a sample.

**Files modified:**
- `docs/digital-twin-travis/02-writing-samples-prompts.md` — Correspondence Register section (currently pp. 190–245, marked "(Derived)")
- `docs/digital-twin-travis/10-collaboration-style.md` — Correspondence Register section (currently pp. 272+, marked "(Derived)")

**Constraint:** Remove the "(Derived)" marker from the heading for the internal and formal sub-registers. Replace the derivation note with an extraction note citing the 3 emails. Keep external-champion sub-register flagged.
**Recommended agent:** claude-code (substrate document edit)

**Tasks:**
- [ ] Read the full Correspondence Register sections in docs 02 and 10
- [ ] Extract salutation, sign-off, opener, emphasis, closer, structural patterns from the 3 emails
- [ ] Rewrite doc 02 Correspondence Register section: heading no longer "(Derived)"; extraction note replaces derivation note; pattern tables corrected against actual samples; external-champion sub-register kept marked derived with note
- [ ] Rewrite doc 10 Correspondence Register section: same treatment
- [ ] Add the 3 emails (or representative excerpts) as cited samples in doc 02
- [ ] Verify Gate 3 status note updated: email-internal and email-formal → "pass"; email-external-champion → "warn (derived)"

---

### Change O — Ultra-short register re-extraction

**Goal:** Replace the derived Ultra-Short Register section in doc 02 with patterns extracted from 5 real LinkedIn posts. Promote Gate 3 for ultra-short surfaces from "warn" to "pass."

**Source material (from `raw-inputs.md`):**
- Post 1 — link share with one-line frame ("It's time to get serious about agents…")
- Post 2 — "RANT OF THE DAY" structured rant (short-medium)
- Post 3 — humor post ("Worst AI Boss Ever" sign-off)
- Post 4 — scripture quote share ("Our quote of the day…")
- Post 5 — long-form written-social manifesto (informs written-social cross-signal, not ultra-short core)

**Observed patterns to extract (preliminary):**
- Posts 1–4 are the ultra-short core. Post 5 is long-form — use it for written-social cross-signal only, do not treat it as ultra-short evidence
- Trailing ellipsis "…" as a characteristic closer ("get serious about agents…", "quote of the day…", "start to finish...") — recurring; the derived model did not predict this
- ALL-CAPS label openers ("RANT OF THE DAY:") — a real opener type
- Sign-off-style attribution line ("--Worst AI Boss Ever", "—Galatians 6:9") — em-dash or double-hyphen attribution
- Double-hyphen "--" as em-dash retained in social posts
- Self-deprecating humor ("Good thing bots don't have an HR to run to")
- No hashtag stacks in ultra-short posts 1–4 — hashtag stack appears only in long-form post 5; the derived "no hashtag stacks" claim holds for ultra-short specifically
- Posts are not sub-280-char in practice — Travis's "ultra-short" register is short-form social, not strictly tweet-length. The register definition should be corrected: "short-form social" rather than "≤280 characters"

**Files modified:**
- `docs/digital-twin-travis/02-writing-samples-prompts.md` — Ultra-Short Register section (currently pp. 248–293, marked "(Derived)")

**Constraint:** Remove the "(Derived)" marker. Replace the derivation note with an extraction note citing the 5 posts. Correct the register definition from "≤280-character" to "short-form social" — the samples show Travis's short social posts run longer than tweet length.
**Recommended agent:** claude-code (substrate document edit)

**Tasks:**
- [ ] Read the full Ultra-Short Register section in doc 02
- [ ] Extract opener types, closer patterns, emphasis, humor, length characteristics from posts 1–4; use post 5 for written-social cross-signal
- [ ] Rewrite the section: heading no longer "(Derived)"; extraction note replaces derivation note; correct the "≤280-character" definition to "short-form social"; pattern tables corrected against actual posts
- [ ] Add the 5 posts (or representative excerpts) as cited samples
- [ ] Verify Gate 3 status note: ultra-short / short-form social → "pass"

---

### Change P — Spoken register re-extraction

**Goal:** Replace the derived Spoken/Conversational Register section in doc 02 and the derived Spoken Register Humor and Emphasis section in doc 07 with patterns extracted from a real ~21-minute conference talk. Promote Gate 3 for spoken surfaces from "warn" to "pass."

**Source material (from `raw-inputs.md`):**
- Ory Summit 2023 talk transcript, "Identity + AI = Intelligent Applications" — recorded delivered talk, ~21 minutes, with timestamped sections

**Observed patterns to extract (preliminary):**
- Self-deprecating opener aside ("the Dallas Cowboys. *(Sorry. Yeah, they're like number three or four, you know.)*") — parenthetical spoken aside, conversational
- "But seriously," as a pivot from humor back to substance — a real spoken transition marker
- Mid-thought entry confirmed ("You'll see where this leads to some interesting questions…")
- Numbered/sequenced delivery ("There are two very important parts…") — spoken structuring
- Specific numbers as anchoring moments ("roughly 35 minutes of manual workflow") — confirmed in speech
- Personal-stake disclosure delivered plainly ("This is very personal for me because I have a 23-year-old son who is schizophrenic") — no dramatization, stated flat
- Architecture anthropomorphization present but lighter than in writing
- Forward-projection close ("The future isn't necessarily about trillion-parameter models. It's about smaller models…")
- "big hairy goal" — informal idiom in a formal talk context
- Closes on an invitation to Q&A ("If you have any questions, I'd like to field some.") — note: this is a SPOKEN close convention, distinct from the written rule against invitational closes; document the distinction

**Note on the Q&A close:** The written-register rejection filter bans invitational closes ("Let me know your thoughts"). The talk ends with "If you have any questions, I'd like to field some." This is NOT a voice violation — it is the standard spoken-talk handoff to Q&A. Change P must document that the spoken register permits the Q&A-handoff close, which the written register does not. This is a register-conditional exception.

**Files modified:**
- `docs/digital-twin-travis/02-writing-samples-prompts.md` — Spoken/Conversational Register section (currently pp. 296–334, marked "(Derived)")
- `docs/digital-twin-travis/07-humor-and-emphasis.md` — Spoken Register Humor and Emphasis section (currently pp. 240+, marked "derived")

**Constraint:** Remove the "(Derived)" markers from both sections. Replace derivation notes with extraction notes citing the Ory Summit 2023 transcript. Add the register-conditional Q&A-close exception.
**Recommended agent:** claude-code (substrate document edit)

**Tasks:**
- [ ] Read the full Spoken/Conversational Register section in doc 02 and the Spoken Register Humor section in doc 07
- [ ] Extract spoken markers, openers, transitions, closes, humor delivery from the transcript
- [ ] Rewrite doc 02 spoken section: heading no longer "(Derived)"; extraction note; pattern tables corrected; add Q&A-handoff close as register-conditional exception
- [ ] Rewrite doc 07 spoken humor section: same treatment
- [ ] Add transcript excerpts as cited samples in doc 02
- [ ] Verify Gate 3 status note: spoken/conversational → "pass"

---

## Execution order and parallelism

All three changes touch `02-writing-samples-prompts.md`, but in **non-overlapping sections** (Correspondence pp.190+, Ultra-Short pp.248+, Spoken pp.296+). Independent parallel agents editing the same file would conflict on write. Resolution:

```
Slot 1 — doc 02 single sequential pass (one agent, one file):
   N's Correspondence Register section
   → O's Ultra-Short Register section
   → P's Spoken/Conversational Register section

Slot 2 — independent edits (can run concurrent with each other, after Slot 1
         or in parallel since they are different files):
   N's doc 10 Correspondence Register section
   P's doc 07 Spoken Register Humor section
```

Recommended: one agent does the full doc-02 pass (all three sections) to avoid write conflicts, then doc-10 and doc-07 edits follow. Keeps the single-file edits atomic and conflict-free — the same lesson applied in phase-4.

---

## QA gate

| Change | Files modified | QA gate |
|---|---|---|
| N | 2 (doc 02, doc 10) | Skipped — documentation, fewer than 3 files |
| O | 1 (doc 02) | Skipped — documentation, single file |
| P | 2 (doc 02, doc 07) | Skipped — documentation, fewer than 3 files |

All three are substrate-document edits (prompt-engineering content, no code). QA gate skipped per the execute protocol.

---

## Out of scope for this plan

- **Change Q — Worked example review and corrections doc seeding** — BLOCKED, no Travis verdict supplied. Will be planned separately when Travis reviews the Tier 2 and Tier 3 worked examples.
- **External-champion email sub-register full extraction** — no champion-tier email sampled; Change N keeps it marked derived with a note. Closes when Travis supplies a champion-tier email.

---

## Expected phase outcome

After N, O, P complete:
- Gate 3 promotes from "warn" to "pass" for: email-internal, email-formal, ultra-short/short-form social, spoken/conversational
- Gate 3 remains "warn (derived)" for: email-external-champion only
- Three substrate documents (02, 07, 10) lose their "(Derived)" register markers for the extracted registers
- Phase-3b reflection will note Change Q as carried-forward, still blocked on Travis verdict
