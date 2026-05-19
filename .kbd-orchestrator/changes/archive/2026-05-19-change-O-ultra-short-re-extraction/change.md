# Change O — Ultra-short register re-extraction

**Phase:** phase-3b-substrate-hardening
**Status:** READY
**File:** `docs/digital-twin-travis/02-writing-samples-prompts.md`
**Type:** substrate / register re-extraction
**Source:** `raw-inputs.md` — 5 LinkedIn posts

## Goal

Replace the derived Ultra-Short Register section in doc 02 with patterns extracted from real LinkedIn posts. Promote Gate 3 from "warn" to "pass" for short-form social surfaces.

## Source samples

- Post 1 — link share with one-line frame (ultra-short)
- Post 2 — "RANT OF THE DAY" structured rant (short-medium)
- Post 3 — humor post, "Worst AI Boss Ever" sign-off (ultra-short)
- Post 4 — scripture quote share (ultra-short)
- Post 5 — long-form written-social manifesto (cross-signal only, NOT ultra-short evidence)

## Key extraction corrections

- **Register definition:** correct "≤280-character" to "short-form social" — Travis's actual short posts run longer than tweet length
- **Trailing ellipsis "…":** characteristic closer ("get serious about agents…", "quote of the day…") — not predicted by derived model
- **ALL-CAPS label openers:** "RANT OF THE DAY:" is a real opener type
- **Attribution-line sign-off:** "--Worst AI Boss Ever", "—Galatians 6:9" — em-dash/double-hyphen attribution close
- **Double-hyphen "--" as em-dash:** retained in social posts
- **Hashtag stacks:** absent in ultra-short posts 1–4; appear only in long-form post 5 — the "no hashtag stacks" claim holds specifically for ultra-short

## Tasks

- [ ] Read full Ultra-Short Register section in doc 02 (pp. 248–293)
- [ ] Extract opener types, closer patterns, emphasis, humor, length from posts 1–4; use post 5 for written-social cross-signal only
- [ ] Rewrite the section: drop "(Derived)" from heading; extraction note replaces derivation note; correct "≤280-character" → "short-form social"; correct pattern tables
- [ ] Add the 5 posts (or representative excerpts) as cited samples
- [ ] Update Gate 3 status: ultra-short / short-form social → "pass"

## Acceptance criteria

- Ultra-Short Register section re-extracted; "(Derived)" marker removed
- Register definition corrected from character-count to "short-form social"
- Pattern tables reflect trailing ellipsis, ALL-CAPS label openers, attribution-line sign-offs
- 5 posts cited as samples; post 5 explicitly noted as written-social cross-signal not ultra-short core
- Gate 3 status note updated
