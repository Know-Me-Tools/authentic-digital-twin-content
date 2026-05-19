# Assessment — phase-3b-substrate-hardening

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Harden the Travis James substrate by replacing derived-pattern registers with raw-sample-extracted registers, and validate the Tier 2 and Tier 3 worked examples against Travis's actual voice judgment.
**Date:** 2026-05-19
**Source:** `.kbd-orchestrator/phases/phase-3-voice-validation/reflection.md`, substrate documents 02, 10, 07, worked examples in `docs/worked-examples/`

---

## Phase-3b Summary

Phase-3b is the substrate hardening phase. All work here is **blocked on Travis input**. This assessment documents:

1. The current state of the three derived registers and what Travis-supplied content would upgrade each
2. The review status of the Tier 2 and Tier 3 worked examples and what Travis review would produce
3. The gaps in the corrections document (doc 03) that Travis review would fill
4. The scope for each proposed change with its Travis-dependency stated explicitly

No changes will be dispatched until Travis supplies at least one input category. The minimum viable input (MVP) to unblock any single change is identified for each change below.

---

## Current Substrate State

### What is solid (Travis-independent)

| Document | Status | Notes |
|---|---|---|
| `01-personality-profile.md` | **Solid** | Five-framework convergence model (MBTI, Enneagram, CliftonStrengths, SoulTrace, self-report). Two formal assessments integrated. Cross-validated across seven-year gap. |
| `02-writing-samples-prompts.md` | **Partial** | Prompt-mode samples (10 samples, Mode A/B documented) are solid. Three derived sections appended: Correspondence, Ultra-Short, Spoken — all marked "derived; re-extract when samples available." |
| `03-writing-samples-corrections.md` | **Thin** | Documents what Travis rejected; depends on actually running the twin and having Travis correct output. Currently empty of editorial corrections — no AI-generated drafts have been reviewed and corrected by Travis. |
| `04-thought-patterns.md` | **Solid** | Core Loop (Notice / Ask / Act) with CliftonStrengths theme anchoring. |
| `05-vocabulary-and-diction.md` | **Solid** | Lexical preferences from prompt samples. |
| `06-rhetorical-patterns.md` | **Solid** | Statement → Mechanism → Stakes structure; reframe moves; compound buildout. |
| `07-humor-and-emphasis.md` | **Partial** | SoulTrace intensity mapping solid. Spoken Register Humor section derived (no spoken samples). |
| `08-domain-anchors.md` | **Solid** | Three anchors (Rust, LLMs, Agent Orchestration). |
| `09-aesthetic-preferences.md` | **Solid** | Visual and structural preferences. |
| `10-collaboration-style.md` | **Partial** | Collaboration patterns solid. LinkedIn register entry solid. Correspondence sub-registers (internal, external champion, formal enterprise) derived — no email samples. |
| `11-decision-heuristics.md` | **Solid** | 16 heuristics with CliftonStrengths grounding. Natural-vs-effortful classification. |

### What is derived and needs raw samples

Three register sections are explicitly marked "derived" in the substrate:

| Register | Location | Marked as derived in | What "derived" means |
|---|---|---|---|
| **Correspondence** (internal, external champion, formal enterprise) | `02` pp. 190–245, `10` pp. 195–244 | Both | Patterns inferred from Mode A/B prompts and personality framework cross-signals. No email samples in substrate. Gate 3 warns for email surface. |
| **Ultra-Short** (≤280 chars, Twitter/X) | `02` pp. 248–293 | `02` | Patterns derived from hard-stop pivot + written-social register compression modeling. No actual Twitter/X posts or captions. |
| **Spoken/Conversational** | `02` pp. 296–334, `07` (Spoken Register section) | Both | Patterns derived from written vocal markers (ALL-CAPS emphasis, parenthetical chains), SoulTrace communication scripts, burst cadence. No spoken transcripts or talk prep notes Travis has confirmed. |

### Current Gate 3 coverage

| Surface | Register | Gate 3 status | Block or warn |
|---|---|---|---|
| Long-form article | Written-academic/architect | **Pass** — solid substrate | No warning |
| LinkedIn post | Written-social | **Pass** — LinkedIn register is solid cross-signal | No warning |
| Email (internal) | Correspondence-internal | **Warn** — derived only | Soft warn |
| Email (external champion) | Correspondence-external-champion | **Warn** — derived only | Soft warn |
| Email (formal enterprise) | Correspondence-formal | **Warn** — derived only | Soft warn |
| Twitter/X post | Ultra-short | **Warn** — derived only | Soft warn |
| Podcast/talk | Spoken/conversational | **Warn** — derived only | Soft warn |

### Current worked example review status

| Example | File | Review status |
|---|---|---|
| Tier 1 format demo | `docs/worked-examples/tier-1-format-demo.md` | **Not reviewed by Travis** — demonstrative reference only |
| Tier 2 LinkedIn post | `docs/worked-examples/tier-2-linkedin-post-example.md` | **Not reviewed by Travis** — demonstrative reference only; annotation block states this explicitly |
| Tier 3 voice prep | `docs/worked-examples/tier-3-voice-prep-example.md` | **Not reviewed by Travis** — demonstrative reference only; annotation block states this explicitly |

All three examples include annotation blocks declaring them "demonstrative reference implementations" not reviewed by Travis. Until Travis reviews and marks them "approved reference" or "needs correction," they cannot serve as validated benchmarks.

---

## Gap Analysis

### Gap 1 — Correspondence register is derived, not extracted

**Current state:** Three correspondence sub-registers (internal, external champion, formal enterprise) are documented as derived in `02` and `10`. The pattern tables are structurally grounded (derived from Mode A/B prompts + personality frameworks) but have never been validated against actual Travis email.

**What's missing:** Raw email samples — 3–5 emails per sub-register is the minimum for reliable pattern extraction. The annotation block in `02` specifies what the re-extraction would look for (salutation by tier, sign-off form, formality of sentence structure, "etc." usage, parenthetical chains in vs. out, run-on chains compressed or not).

**Impact:** Gate 3 warns for any email surface. Content generated for email has higher reconstruction uncertainty than content for written-social or long-form surfaces.

**Travis input needed:** Any emails Travis has sent (anonymized for recipients is fine) — at minimum, one internal team email and one external champion-level email. 3–5 per tier is the comfortable threshold.

---

### Gap 2 — Ultra-short register is derived, not extracted

**Current state:** The ultra-short (≤280-char) register section in `02` documents what survives compression (hard-stop pivots, reframe moves, specific numbers, anthropomorphization) and what gets sacrificed (trade-off pairs, parenthetical chains, "etc." closer, layered reasoning). Four characteristic opener types are described. All are derived from compression modeling on existing written samples.

**What's missing:** Actual Twitter/X posts or very short social captions Travis has written and published. Even 5–10 posts would allow re-extraction of how Travis actually handles the compression (which patterns he keeps vs. drops, opener preferences, closer form, hashtag behavior or absence).

**Impact:** Gate 3 warns for Twitter/X or ultra-short social surfaces. The derived patterns are structurally sound but haven't been cross-validated against actual published behavior.

**Travis input needed:** 5–10 Twitter/X posts or Substack Notes Travis has published. Alternatively, any very short social captions (LinkedIn micro-updates rather than full posts).

---

### Gap 3 — Spoken/conversational register is derived, not extracted

**Current state:** The spoken register section in `02` and the Spoken Register Humor section in `07` document structural markers (mid-thought entry, self-correction with "or rather…", "etc." verbal close, forward-projection close). These are derived from written vocal markers, SoulTrace communication scripts, and burst-cadence collaboration patterns.

**What's missing:** Spoken transcripts — podcast appearances, recorded talk segments, or talk prep notes Travis has personally edited and confirmed as voice-representative. The Tier 3 worked example (`tier-3-voice-prep-example.md`) demonstrates what the skill generates, but it has not been confirmed as representative by Travis.

**Impact:** Gate 3 warns for podcast, talk, meeting-notes surfaces. Prosody and pacing nuance remain unvalidated. The structural markers (hard-stop pivots, anthropomorphization, forward-projection close) are high-confidence; the rhythm at which Travis actually delivers them in speech is unvalidated.

**Travis input needed:** Any of — a podcast transcript (even 1 episode), a recorded talk transcript or segment, or talk prep notes Travis has personally edited for an actual event he spoke at.

---

### Gap 4 — doc 03 (corrections) is empty of editorial corrections

**Current state:** `03-writing-samples-corrections.md` exists as a substrate document but contains no actual corrections — no cases where Travis reviewed AI-generated content and marked what was wrong, what was off-voice, or what needed to be changed.

**What's missing:** Travis running the twin on any surface and marking the delta between what the skill generated and what he would actually publish. Even a single round of corrections (one AI draft reviewed, one set of editorial marks) would produce the most high-signal substrate in the entire set. The corrections document is documented as "the most under-recognized signal" in SKILL.md: "Where the author corrected AI output, the gap between the AI draft and the published version is the substrate. The rejection filter is half the voice."

**Impact:** The rejection filter in SKILL.md was extracted from Travis's explicit disavowals in the conversation transcript. It has not been validated by running the twin and checking whether the filter actually catches the patterns that appear in Travis's-voice generation. The corrections doc is the mechanism for that validation loop.

**Travis input needed:** Travis runs the skill on any surface, reviews the output, and marks what to change. The corrected version plus the original draft constitute the corrections entry. One round is the minimum; 3–5 rounds builds a meaningful filter.

---

### Gap 5 — Tier 2 and Tier 3 worked examples are not Travis-reviewed

**Current state:** Both `tier-2-linkedin-post-example.md` and `tier-3-voice-prep-example.md` include annotation blocks explicitly stating they are "demonstrative worked examples" not reviewed by Travis. They demonstrate what the skill should produce, not what Travis has confirmed is correct.

**What's missing:** Travis reading each example and marking one of: "approved reference — this is on-voice," "approved with corrections — specific changes needed," or "off-voice — re-extract." The annotation block in the Tier 2 example notes: "This post is written in Travis James's voice, using the substrate documents that define that voice, for the purpose of showing what the skill produces when operating correctly." The validating phrase is "when operating correctly" — that claim cannot be confirmed without Travis's review.

**Impact:** The worked examples function as QA benchmarks. Without Travis review, they are benchmarks that have not themselves been QA'd. Reviewers and maintainers have no confirmed artifact to compare new generations against.

**Travis input needed:** Travis reads both examples and marks them as approved or provides specific corrections. Corrections produce an entry in `03-writing-samples-corrections.md`. Approval marks the files as `[Travis-reviewed: approved — date]` in their headers.

---

## Proposed Changes for Phase-3b

### Change N — Correspondence register re-extraction

**Scope:** Re-extract the correspondence register sections in `02-writing-samples-prompts.md` and `10-collaboration-style.md` from raw Travis email samples. Replace the "derived" markers with "extracted from [N] samples across [subtypes]." Update the salutation/sign-off tables and pattern-transfer tables from actual examples rather than inferred models.

**Travis dependency:** Email samples — minimum 3 emails (ideally 1 internal + 1 external champion + 1 formal enterprise).

**Files modified:** `02-writing-samples-prompts.md`, `10-collaboration-style.md`

**Gate 3 outcome:** Correspondence registers promote from "derived/warn" to "extracted/pass" for the sub-registers covered by samples.

---

### Change O — Ultra-short register re-extraction

**Scope:** Re-extract the ultra-short register section in `02-writing-samples-prompts.md` from actual Travis posts. Validate or correct the four opener types, the compression survival table, and the "what doesn't appear" list. Replace "derived" marker with "extracted from [N] posts."

**Travis dependency:** 5–10 Twitter/X posts or equivalent ultra-short surface content.

**Files modified:** `02-writing-samples-prompts.md`

**Gate 3 outcome:** Ultra-short register promotes from "derived/warn" to "extracted/pass."

---

### Change P — Spoken register re-extraction

**Scope:** Re-extract the spoken register section in `02-writing-samples-prompts.md` and the Spoken Register Humor section in `07-humor-and-emphasis.md` from actual spoken transcripts or personally-confirmed talk prep notes. Validate or correct the structural markers (mid-thought entry, self-correction, "etc." verbal close, forward-projection close). Add prosody/pacing notes if transcript provides signal.

**Travis dependency:** Any one of: podcast transcript, recorded talk segment, or talk prep notes Travis has personally edited for an actual event.

**Files modified:** `02-writing-samples-prompts.md`, `07-humor-and-emphasis.md`

**Gate 3 outcome:** Spoken register promotes from "derived/warn" to "extracted/pass."

---

### Change Q — Worked example review and corrections doc seeding

**Scope:** Travis reviews `tier-2-linkedin-post-example.md` and `tier-3-voice-prep-example.md`. Outcomes:
- Approved: add `[Travis-reviewed: approved — 2026-MM-DD]` to headers; worked examples promoted to confirmed QA benchmarks
- Corrected: record corrections in `03-writing-samples-corrections.md`; apply corrections to worked examples; mark corrected versions as approved

If Travis generates any new content via the twin and reviews it, those corrections also go into doc 03.

**Travis dependency:** Travis reads both worked examples and provides a verdict on each.

**Files modified:** `docs/worked-examples/tier-2-linkedin-post-example.md`, `docs/worked-examples/tier-3-voice-prep-example.md`, `docs/digital-twin-travis/03-writing-samples-corrections.md`

**Gate 3 outcome:** None — worked examples are not a Gate 3 surface. But doc 03 gains its first editorial corrections, strengthening the rejection filter and voice fidelity for all future generations.

---

## Minimum Viable Inputs to Unblock Each Change

| Change | Minimum Travis input | Can start without? |
|---|---|---|
| N — Correspondence re-extraction | 3 emails (any sub-register) | No |
| O — Ultra-short re-extraction | 5 Twitter/X posts or Substack Notes | No |
| P — Spoken re-extraction | 1 podcast transcript OR 1 edited talk prep note | No |
| Q — Worked example review | Travis reads 2 files and provides verdict | No |

**All four changes are blocked.** None can be executed without Travis input. Phase-3b should not be dispatched until Travis has supplied at least one input category.

---

## Open Questions for Plan Phase

| OQ | Question | Stakes |
|---|---|---|
| OQ1 | What is the minimum Travis input that unblocks phase-3b dispatch? | Determines whether any change can begin |
| OQ2 | Should changes N, O, P be ordered (1 then 2 then 3) or executed in parallel when inputs arrive? | Each change modifies different sections; parallel is safe if inputs arrive simultaneously, sequential if they trickle |
| OQ3 | If Travis provides a single email sample (below the 3-email threshold), should the derived section be partially re-extracted or remain fully derived until the threshold is met? | Partial extraction is better than derived-only but should be labeled "partially extracted from [N] samples — low confidence" |
| OQ4 | Should doc 03 have a structural format specified before Travis review (so corrections can be entered consistently), or should the format emerge from the first correction round? | A prescribed format now enables consistent entry; an emergent format may fit the correction pattern better |
| OQ5 | Do the Tier 1 format demo, Tier 2 LinkedIn post, and Tier 3 voice prep examples need to cover the same topic (workspace identity / agentic programming), or should Travis's review use a different topic that exercises the register more thoroughly? | Same topic is easiest for Travis to evaluate against domain knowledge; a different topic tests voice generalization |

---

## What Is Not in Scope for Phase-3b

- **Shadow-pattern detector escalation** — covered in phase-5 scope
- **Effortful-heuristic generalization** — covered in phase-5 scope
- **Re-test cadence (STATE.md OQ5)** — covered in phase-5 scope
- **agentskills.io skill directory submission** — watch + submit when channel opens; no phase needed
- **Surreal-memory ingestion** — documented in STATE.md Surreal-Memory Ingestion Notes; out of scope until the MCP server is confirmed available in the deployment context

---

## Recommended Phase-3b Disposition

**Do not dispatch phase-3b now.** All changes are blocked on Travis input.

**Recommended action:** Present Travis with the four input categories (email samples, Twitter/X posts, spoken transcript, worked example review). The lowest-effort unblock is OQ — it only requires Travis to read two files and provide a verdict. Start there if Travis is available.

When Travis provides any input, resume from this assessment. The plan phase can be run immediately once the input category and quantity are known — the change scopes above are already well-defined.
