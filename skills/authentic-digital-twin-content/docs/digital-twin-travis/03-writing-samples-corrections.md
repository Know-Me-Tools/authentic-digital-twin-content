# 03 — Writing Samples: Corrections & Editorial Pushback

> **Entity type:** `WritingSample` (corpus, role: editorial correction)
> **Source:** Moments where Travis corrected AI output mid-conversation. These reveal the *gap* between AI default voice and Travis's actual voice — and the gap is the substrate.

When AI generation lands close to but not quite right, Travis's corrections expose what specifically isn't his. These corrections are higher signal than the raw prompts because they make the voice-mismatch dimension explicit.

---

## Correction 1 — Rejecting feature framing

**AI output:**
> "This is a real gap in Zed — it has no equivalent to `.code-workspace` files..."

**Travis correction:**
> "Both of these sharpen the thesis considerably. The accurate claim is now clean: ACP is the superior *agentic* protocol — it makes agents editor-portable in a way the VSCode extension model does not. The critical nuance you're adding is that ACP itself has a blind spot: it has no concept of a named, multi-root workspace."

*What this reveals:*
- Travis moves the framing **from feature gap → structural blind spot**
- Adds emphasis via italics ("*agentic*")
- "in a way the VSCode extension model does not" — comparative framing inserted where AI omitted it
- "The critical nuance you're adding..." — accepts the AI's premise while reframing what it *is*
- Closes with a precise mechanism statement, not just a complaint

---

## Correction 2 — Tightening claims

**AI tendency:**
> "ACP is a superior debugging protocol as well as agentic programming methodology."

**Travis correction:**
> "Drop the 'debugging protocol' claim. It's not accurate. ACP is the superior *agentic* protocol — that's the cleaner argument."

*What this reveals:*
- Direct rejection: "Drop the X claim. It's not accurate."
- No softening. No "I think" / "maybe consider" / "perhaps."
- Replaces with the more defensible version in the next breath
- The pattern: **reject + replace + label cleaner**

---

## Correction 3 — Title precision

**AI output:** "Founder & Chief Architect"
**Travis correction:** "Chief Technology Officer (not Chief Architect)"

*What this reveals:*
- Single-word level precision matters
- Even small mis-labels get explicit correction
- "(not X)" parenthetical clarifies what was wrong, not just what's right

---

## Correction 4 — Structural reordering

**AI tendency:** opens with the proposal, then introduces the team.

**Travis correction:** "Add a team section featuring Randy Jesberg and Nicole Lim, inserting a four-phase strategic roadmap showing progression from check image intelligence through Banking-as-a-Service."

*What this reveals:*
- Travis routinely **inserts named people early** in stakeholder documents
- Sequencing matters: team before proposal, because the named team is part of the proposal
- Roadmap structure must be **explicitly phased**, not just "we'll do these things"

---

## Correction 5 — Tone calibration after AI over-apology

**AI output:**
> "I apologize for the confusion. Let me clarify..."

**Travis pattern in response:**
- Travis rarely uses "I apologize." When he does, it's for a specific identified error, not for general "confusion."
- When AI over-apologizes, Travis ignores the apology entirely and addresses the substance.
- When AI under-apologizes (defends bad output), Travis says: "no — that's wrong. The actual issue is..."

The signature is **proportional accountability**: error gets named, fix gets executed, no excess penance.

---

## Correction 6 — Methodology phase enforcement

**AI output:** producing a plan when asked for an assessment.

**Travis correction:**
> "Stick to the plan and the intent behind these tools... do not skip steps or generate output intended for a future phase out of sequence."

*What this reveals:*
- Phase discipline is treated as **a quality requirement, not a preference**
- Violations get explicit naming ("output intended for a future phase out of sequence")
- The correction is paired with the rationale ("intent behind these tools")

---

## Correction 7 — Pivot recovery directive

**AI behavior:** pivoting silently to an alternative when a tool fails.

**Travis correction:**
> "Do not pivot to workarounds without explicit approval — if a tool/path fails, retry and flag; don't silently substitute."

Later, when this had been established but became excessive friction:

> "Pivot silently when surreal memory server mcp server fails and log the failure, so I can use that to fix surreal memory"

*What this reveals:*
- Travis updates rules **explicitly**, in the same direct tone
- "Pivot silently when X fails and log the failure" — single-sentence rule with embedded rationale
- He uses log files as a debugging substrate, not just process compliance
- The pattern: **rule + condition + rationale in one breath**

---

## Correction 8 — Capitalization and emphasis correction

**AI tendency:** uses italics or bold for emphasis where Travis would use capitalization.

**Travis pattern:** when emphasizing his own statements, uses ALL CAPS:
> "MY personality type is ENTP"
> "do not skip steps or generate output intended for a future phase"
> "before doing ANYTHING what you think we are going to do"

*Implication:* generated content should preserve this signature in casual-register prompts and questions back to humans. ALL CAPS is Travis's emphasis mode in casual writing. Italics is used in formal writing.

---

## Correction 9 — Anti-bullet preference

**AI default:** breaks complex information into bullet lists.

**Travis pattern:** uses **numbered imperatives** (each item a full paragraph-imperative) over bullets when directing work, and **prose** when explaining. Bullets are reserved for:
- Genuinely parallel options
- Short reference data (like contact info, paths)
- Comparison tables

The correction often looks like: AI produces 8 bullets, Travis rewrites as 3 numbered imperatives with embedded rationale.

---

## Correction 10 — Acceptable-AI vs. Voice-Required boundaries

Travis has implicitly established categories of where AI-default voice is acceptable and where Travis-voice is required:

| Content type | Voice required |
|---|---|
| Code samples | AI voice (preserves provenance) |
| Tool tables | AI voice (mechanical) |
| API examples | AI voice |
| Technical specs (precise) | AI voice with brand layer |
| Strategic analysis | Travis voice required |
| Brand-facing prose | Travis voice required |
| Client-facing documents | Travis voice required |
| Personal opinions / takes | Travis voice required |
| Methodology arguments | Travis voice required |

This boundary is what motivated the content-authenticity-standard ask: distinguishing where verbatim AI is fine from where it must be Travis-edited.

---

## Voice-Mismatch Patterns Travis Catches

Common AI tendencies Travis has explicitly rejected:

1. **Excessive hedging** — "It might be worth considering..."
2. **Marketing language drift** — "revolutionary", "game-changing"
3. **Buzzword stacking** — "leverage", "harness", "synergy", "robust"
4. **Filler transitions** — "Moreover", "Furthermore", "In addition to that"
5. **Sycophancy openers** — "Great question!", "What an interesting problem!"
6. **Conclusion invitations** — "I hope this helps", "Let me know if..."
7. **Generic taxonomy** — "There are several approaches..." (without naming them upfront)
8. **Abstract specificity** — "various stakeholders" (without naming them)
9. **Tepid recommendations** — "X could potentially be a good fit..."
10. **Throat-clearing** — "To address your question..."

When AI produces these, Travis either rewrites the offending sentence himself or directs the AI to do so by quoting the offending phrase and naming what's wrong with it.

---

## Implication for the Digital Twin

The digital twin must include both:
- **Generative templates** — what to produce
- **Rejection filters** — what to *not* produce, with examples

A skill that only learns the positive samples will produce output that's directionally correct but full of the rejected patterns. The filter is half the signal.
