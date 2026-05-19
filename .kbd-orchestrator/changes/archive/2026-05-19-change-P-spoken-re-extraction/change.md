# Change P — Spoken register re-extraction

**Phase:** phase-3b-substrate-hardening
**Status:** READY
**Files:** `docs/digital-twin-travis/02-writing-samples-prompts.md`, `docs/digital-twin-travis/07-humor-and-emphasis.md`
**Type:** substrate / register re-extraction
**Source:** `raw-inputs.md` — Ory Summit 2023 talk transcript

## Goal

Replace the derived Spoken/Conversational Register section in doc 02 and the derived Spoken Register Humor and Emphasis section in doc 07 with patterns extracted from a real ~21-minute recorded conference talk. Promote Gate 3 from "warn" to "pass" for spoken surfaces.

## Source sample

Ory Summit 2023 talk transcript, "Identity + AI = Intelligent Applications" — recorded delivered talk, ~21 minutes, timestamped sections.

## Key extraction findings

- **Self-deprecating opener aside:** "(Sorry. Yeah, they're like number three or four, you know.)" — parenthetical spoken aside
- **"But seriously,":** pivot from humor back to substance — real spoken transition marker
- **Mid-thought entry:** confirmed in speech
- **Sequenced delivery:** "There are two very important parts…" — spoken structuring without numbered lists
- **Specific numbers as anchors:** "roughly 35 minutes of manual workflow" — confirmed in speech
- **Personal-stake disclosure stated flat:** "I have a 23-year-old son who is schizophrenic" — no dramatization
- **Forward-projection close:** "The future isn't necessarily about trillion-parameter models. It's about smaller models…"
- **Informal idiom in formal context:** "big hairy goal"

## Register-conditional exception — Q&A-handoff close

The talk ends with "If you have any questions, I'd like to field some." The written-register rejection filter bans invitational closes ("Let me know your thoughts"). The Q&A-handoff close is NOT a voice violation — it is the standard spoken-talk convention. Change P must document this as a **register-conditional exception**: the spoken register permits the Q&A-handoff close; the written register does not.

## Tasks

- [ ] Read full Spoken/Conversational Register section in doc 02 (pp. 296–334) and Spoken Register Humor section in doc 07 (pp. 240+)
- [ ] Extract spoken markers, openers, transitions, closes, humor delivery from the transcript
- [ ] Rewrite doc 02 spoken section: drop "(Derived)" from heading; extraction note; correct pattern tables; add Q&A-handoff close as register-conditional exception
- [ ] Rewrite doc 07 spoken humor section: same treatment
- [ ] Add transcript excerpts as cited samples in doc 02
- [ ] Update Gate 3 status: spoken/conversational → "pass"

## Acceptance criteria

- Both spoken sections re-extracted from the real transcript; "(Derived)" markers removed
- Pattern tables reflect the self-deprecating aside, "But seriously," pivot, flat personal-stake disclosure, forward-projection close
- Q&A-handoff close documented as a register-conditional exception (spoken permits, written bans)
- Transcript excerpts cited as samples in doc 02
- Gate 3 status note updated
