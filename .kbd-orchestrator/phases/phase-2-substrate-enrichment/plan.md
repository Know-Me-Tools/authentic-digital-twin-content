# Plan — phase-2-substrate-enrichment

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Extend Travis James substrate to cover v2 registers; produce Tier 2 and Tier 3 worked examples; cut the v2.0.0 release.
**Change backend:** native KBD (no OpenSpec detected)
**Evolver bridge:** none
**Date:** 2026-05-19
**Source:** `.kbd-orchestrator/phases/phase-2-substrate-enrichment/assessment.md`

---

## Open question resolutions

| OQ | Question | Resolution |
|---|---|---|
| OQ1 | Sample sourcing for v2 registers | **(c) Derived patterns** — extend docs 02, 07, 10 from cross-signals in the existing substrate (personality profile, stylistic docs, SoulTrace/CliftonStrengths frameworks) without raw sample text. No Travis James samples required from external source. |
| OQ2 | Tier 2 worked example domain | **Agentic programming** — LinkedIn post in Travis's voice on an agentic programming topic (e.g., context infrastructure, ACP, workspace identity). Domain anchors already in 08; substrate coverage for this domain is strongest. |
| OQ3 | Release tag strategy | **Retroactive v1.0.0 tag first**, pointing at the Change C commit (`28580dc`), then `v2.0.0` from HEAD. Preserves clean semantic versioning history. |
| OQ4 | CHANGELOG v1 standard path | Worked examples declare **v2**. CHANGELOG `[1.0.0]` entry's standard reference updated to point to `docs/standards/authentic-digital-twin-content-standard-v1.md` (already correct path). `[2.0.0]` entry references v2 path. |

---

## Ordered change list

Four changes, in dependency order **E → F → G ∥ H**. G and H are independent of each other and can run in parallel after F.

| # | Change ID | Depends on | Recommended agent | Risk |
|---|---|---|---|---|
| E | change-E-release-cut | — | `general-purpose` | Low |
| F | change-F-substrate-extension | E | `prompt-engineer` | Medium |
| G | change-G-tier2-worked-example | F | `brand-voice:content-generation` | Low |
| H | change-H-tier3-worked-example | F | `brand-voice:content-generation` | Low |

**Rationale:**
- **E before F** — clean version state before substrate work; the substrate update should reference the released version.
- **F before G and H** — worked examples should be generated *after* the substrate extension, so they can demonstrate the derived-pattern register coverage rather than just the pre-extension substrate.
- **G ∥ H** — Tier 2 (LinkedIn post) and Tier 3 (voice prep) are independent artifacts; no shared files, no ordering dependency.

---

## Change E — Release cut

**File:** `.kbd-orchestrator/changes/change-E-release-cut/change.md`
**Recommended agent:** general-purpose
**Risk:** Low — pure version number and changelog update; no behavior change

**Scope:**
1. Create retroactive `v1.0.0` git tag pointing at commit `28580dc` (the Change C commit — "feat: registration docs, marketplace.json, CHANGELOG")
2. Update `metadata.version` in `skills/authentic-digital-twin-content/SKILL.md` from `"1.0.0"` to `"2.0.0"`
3. Promote `[Unreleased]` items in `CHANGELOG.md` to a new `[2.0.0] — 2026-05-18` entry; update the standard version note to reference v2; fix the v1.0.0 standard path to use the correct `docs/standards/` prefix
4. Create `v2.0.0` GitHub release tag at HEAD
5. Create GitHub releases for v1.0.0 and v2.0.0 via `gh release create`
6. Re-run `skills-ref validate` — confirm still green after version bump

**Done when:** Two GitHub release tags exist (`v1.0.0`, `v2.0.0`); `metadata.version` reads `"2.0.0"`; CHANGELOG has a clean `[2.0.0]` entry; `skills-ref validate` green.

**Out of scope:** Anthropic marketplace submission, agentskills.io PR (maintainer actions).

---

## Change F — Substrate register extension (derived patterns)

**File:** `.kbd-orchestrator/changes/change-F-substrate-extension/change.md`
**Recommended agent:** prompt-engineer
**Risk:** Medium — writes to all-rights-reserved substrate; derived patterns only (OQ1 resolution), no raw samples

**Approach:** Cross-signal derivation. The personality profile (01), existing writing samples (02), humor and emphasis (07), and collaboration style (10) collectively contain enough behavioral signal to derive register patterns for correspondence, ultra-short, and spoken surfaces. The extension does not fabricate voice; it extracts what the existing substrate implies about how Travis's documented patterns shift under surface constraints.

**Scope:**

### Document 02 — Writing samples extension

Add three new sections after the existing samples:

**Section: Correspondence Register (Derived)**
- How the casual-directive and architect-specification modes from the existing two modes adapt when writing *to a named human* rather than *to an AI tool*
- What structural features of Travis's prompt style transfer to email (front-loading context, explicit sequencing, "etc." as closer) and which don't (ALL-CAPS for emphasis, backticked paths, tool-naming conventions)
- Derived salutation and sign-off patterns based on 10-collaboration-style.md recipient tiers (internal team → direct/champion register → stakeholder register → cold contact)
- Correspondence register note: "No raw email samples exist in the substrate. These patterns are derived from the two documented writing modes + collaboration style. Re-extract this section when actual email samples are available."

**Section: Ultra-Short Register (Derived)**
- How Travis's documented voice compresses to 280 characters
- What survives compression: hard-stop sentences, specific numbers, reframe moves ("Not A. B."), one intensifier
- What gets sacrificed: trade-off pairs (no room), parenthetical chains, "etc." (no payoff at this length)
- Characteristic ultra-short openers derived from the "hard stop pivot" and "stop" command patterns in 07
- Register note: same derivation disclaimer

**Section: Spoken/Conversational Register (Derived)**
- How Travis's documented patterns surface in speech vs. prose
- Derived from: "playful register" markers in 07 (lowercase intensity, run-on chains), "burst cadence" in 10, "strategic fight style" in 10
- Spoken patterns: starts sentences mid-thought, self-corrects explicitly ("or rather..."), uses "etc." verbally, architecture-anthropomorphization as a spoken framing device
- What disappears in speech: em-dashes become pauses, ALL-CAPS becomes vocal stress, parenthetical examples become listed aloud
- Register note: same derivation disclaimer

### Document 07 — Humor and emphasis extension

Add two sections after "The Playful Register":

**Section: Spoken Register Humor and Emphasis**
- Dry understatement works differently spoken: delivery depends on flatness of tone, which can't be conveyed in transcript → the written signal is still the phrasing
- Architectural anthropomorphization is stronger in speech: Travis can lean into it verbally with slight dramatization
- Hard-stop pivots in speech: the pause before "Wrong." or "No." carries the humor; the written version depends entirely on the period
- Intensity contexts (from §4) translate directly; conviction-driven intensity is delivery-independent

**Section: Ultra-Short Register Humor and Emphasis**
- Dry understatement is the only humor mode that survives 280-char compression
- Pointed comparison humor reduces to one clause: "Not a rotation of junior resources." (the full comparison implied, not stated)
- Hard-stop sentences are the ultra-short default: the entire tweet is often one hard-stop pivot
- Red intensifiers (very big, perfect, genuine) are high-value signal at this length — one per post, not stacked

### Document 10 — Collaboration style extension

Add one section after "Communication Style With Humans":

**Section: Correspondence Register**
- **Email to internal team:** No salutation, no sign-off. Starts with the point. Ends with the action. Zero padding.
  - Pattern: `[Point]. [Context if needed]. [What I need from you by when].`
- **Email to external champion (Neil Henry tier):** Opens with relational anchor (one line of genuine warmth or update). Then the business point. Closes with forward projection, not invitation.
  - Pattern: `[Relational hook]. [Point + context]. [Next step I'm taking / what I need].` Sign-off: `— Travis` or just name.
- **Email to formal enterprise / cold contact:** Architect-specification mode. Full sentences, properly cased. Named team mentioned early. Structured paragraphs. No "etc." Closes on value + explicit next step.
  - Sign-off: `Travis James` + title if first contact.
- **LinkedIn post:** More declarative and architectural than email. Starts with a hard-stop or reframe. No hashtag stacks. No "Excited to share..." opener. Written-social register, not stakeholder register. First-person but not casual-lowercase.
  - The post's closer always lands on stakes or a question that has a specific answer (not "thoughts?").
- **Inbound reply:** Acknowledge, answer, redirect. If the inbound is a vague ask: "what specifically?" before answering. If the inbound is a concrete ask: answer directly. No "great question."

**Done when:** Documents 02, 07, and 10 each have their new derived-pattern sections; each section has the derivation disclaimer; Gate 3 warnings for correspondence/ultra-short/spoken registers will fire but will reference richer patterns.

**Important:** The Travis James substrate is all-rights-reserved. These additions must follow the same all-rights-reserved scope. No content from the substrate should be used to train models.

---

## Change G — Tier 2 worked example (LinkedIn post, agentic programming)

**File:** `.kbd-orchestrator/changes/change-G-tier2-worked-example/change.md`
**Recommended agent:** brand-voice:content-generation
**Risk:** Low — new file only; no existing files modified

**Domain:** Agentic programming — specifically the workspace identity / context infrastructure topic Travis already wrote about in `zed-workspace-article.md`. A LinkedIn post version of a key idea from that domain.

**Scope:**
1. Create `skills/authentic-digital-twin-content/docs/worked-examples/` directory
2. Write `tier-2-linkedin-post-example.md` — a LinkedIn post (~300–600 words) in Travis's voice on an agentic programming topic (the workspace identity problem, or a related insight about context infrastructure or ACP). The post must:
   - Open with a hard-stop sentence or a reframe move (not "Excited to share...")
   - Use Travis's written-social register (declarative, properly cased, no em-dashes via `--`)
   - Include the Tier 2 compact disclosure tag at the top (first line)
   - Name the agentic programming domain anchor clearly
   - Close on stakes, not on "thoughts?" or "let me know"
   - Include a brief annotation block after the post showing: which disclosure tag was used, which register was applied, which Gate 3 warnings would have fired (spoken/correspondence not covered), what substrate documents drove the content
3. Write a brief readme-style header in the worked-examples directory explaining the directory structure and what each example demonstrates

**Done when:** `docs/worked-examples/tier-2-linkedin-post-example.md` exists with the post, Tier 2 tag, and annotation block.

---

## Change H — Tier 3 worked example (voice/talk prep)

**File:** `.kbd-orchestrator/changes/change-H-tier3-worked-example/change.md`
**Recommended agent:** brand-voice:content-generation
**Risk:** Low — new file only; no existing files modified

**Domain:** Agentic programming (same topic cluster as G) — talking points or opening segment for a presentation or podcast episode on the workspace identity problem or context infrastructure.

**Scope:**
1. Write `skills/authentic-digital-twin-content/docs/worked-examples/tier-3-voice-prep-example.md` — voice prep notes (talking points, not a script) for a 5–10 minute segment. The prep notes must:
   - Include the Tier 3 channel-level disclosure header at the top (before any content)
   - Be structured as talking points, not a script — bullets or numbered points the speaker owns, not prose to read verbatim
   - Demonstrate the "speaking from notes is Author" distinction: the content will be delivered in Travis's voice, not read verbatim, so the authorship is human-authored even though prep assistance was involved
   - Apply Travis's documented agentic-programming domain anchors from 08
   - Apply intensity context 4 (strategic opportunity framing) from 07 — at least one point should demonstrate forward projection
   - Include a brief annotation block after the prep notes showing: which disclosure form was used, why Tier 3 applies, what substrate documents drove the structure, what Gate 3 would warn for the spoken register
2. Add this file to the same `docs/worked-examples/` directory created in Change G

**Done when:** `docs/worked-examples/tier-3-voice-prep-example.md` exists with talking points, Tier 3 channel-level disclosure, and annotation block.

---

## Verification gates (per change)

| Change | Gate |
|---|---|
| E | `skills-ref validate` green; two GitHub release tags exist; CHANGELOG has `[2.0.0]` |
| F | Documents 02, 07, 10 each have new derived-pattern sections with disclaimers; no raw Travis sample content fabricated |
| G | `tier-2-linkedin-post-example.md` exists; compact tag present; annotation block explains tier, register, Gate 3 behavior |
| H | `tier-3-voice-prep-example.md` exists; channel-level disclosure header present; annotation block explains Tier 3 application |

---

## Constraints

- Travis James substrate files are all-rights-reserved. Derived-pattern additions follow the same scope restriction.
- Change F derives patterns from existing substrate signals only — it does not fabricate voice or invent biographical details not already documented.
- Changes G and H are demonstrative worked examples. They are Travis-voice content and carry the same all-rights-reserved restriction on the substrate-anchored voice patterns used. The worked-example format (post + annotation block) is part of the skill's reference implementation.
- `description` in SKILL.md must remain ≤ 1024 chars. Change E must not touch the description field; if it does, validate char count before committing.
- `skills-ref validate` must pass after Change E before any other changes begin.
