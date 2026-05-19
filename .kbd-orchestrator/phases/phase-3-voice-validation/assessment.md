# Assessment — phase-3-voice-validation

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Close the gap between derived substrate patterns and actual Travis James voice; validate worked examples; expand distribution.
**Date:** 2026-05-19
**Phase status:** ASSESS complete — no artifacts or code generated (per protocol)

---

## 0. Method note

This assessment reads from:
- Phase 2 reflection (`phases/phase-2-substrate-enrichment/reflection.md`) — debt items and recommended scope
- Travis substrate ledger (`docs/digital-twin-travis/STATE.md`) — extraction status, open questions
- Substrate documents 02, 07, 10 — derivation disclaimers and re-extraction flags
- Worked examples directory — current state of Tier 2 and Tier 3 examples
- `REGISTRATION.md` — pending distribution actions
- Standard v2 and annotation-scheme docs — open validation gaps

---

## 1. Current state

### 1.1 Substrate register coverage

| Register | Document | Status |
|---|---|---|
| Written long-form (casual-directive) | 02 — 10 raw samples | Fully extracted — highest signal |
| Written long-form (architect-specification) | 02 — 10 raw samples | Fully extracted — high signal |
| Editorial voice (corrections) | 03 — 12 corrections | Fully extracted — high signal |
| Correspondence (email/LinkedIn) | 02, 10 — new sections | **Derived only** — no raw samples; re-extraction flagged |
| Ultra-short (<280 chars) | 02 — new section | **Derived only** — no raw Twitter/X posts; re-extraction flagged |
| Spoken/conversational | 02, 07 — new sections | **Derived only** — no transcripts or talk notes; re-extraction flagged |

**Substrate word count:** ~22,000 words (11 documents). Well above the 2,000-word Eder 2017 reliability floor. The volume gap is not in total words — it is in register diversity. The derived sections add structural guidance without adding actual voice samples.

**Gate 3 status after Phase 2:** All three new registers are covered at the derived-pattern level. Gate 3 will no longer fail with no guidance at all — it will warn and produce output with a derivation caveat. True Gate 3 satisfaction requires actual samples.

### 1.2 Worked examples

| Surface | Tier | File | State |
|---|---|---|---|
| Long-form article | 1 | `docs/zed-workspace-article.md` | Present — v1 standard, v1 eyebrow format |
| LinkedIn post | 2 | `docs/worked-examples/tier-2-linkedin-post-example.md` | Present — v2, written-social register, full annotation |
| Voice prep | 3 | `docs/worked-examples/tier-3-voice-prep-example.md` | Present — v2, spoken register, annotation block |

**Review status:** All three worked examples are demonstrative reference implementations. None has been reviewed and approved by Travis James as an accurate voice representation. The Tier 2 and Tier 3 examples have never been tested against Travis's editorial judgment.

**Tier 1 v2 gap:** `zed-workspace-article.md` declares Standard v1. A v2 Tier 1 worked example (updated eyebrow format, `v2` version declaration) does not exist. The v1 article is still valid — but the Tier 1 reference set is mismatched with the current standard version.

### 1.3 Distribution

| Channel | State |
|---|---|
| GitHub repo (`Know-Me-Tools/authentic-digital-twin-content`) | Public, v2.0.0 released |
| agentskills.io community showcase | **Not submitted** — PR not opened |
| Anthropic official marketplace | **Not submitted** — maintainer action; requires separate review process |
| Claude Code plugin directory | Loadable locally; not officially listed in any registry |
| npm (optional) | Not published |
| Community marketplaces (`.claude-plugin/marketplace.json` self-hosted) | File exists; not registered with any aggregator |

**agentskills.io submission** is the highest-value pending distribution action. The skill is v2.0.0, `skills-ref validate` is green, the README documents the install path. The only remaining step is the community showcase PR described in `docs/REGISTRATION.md`.

### 1.4 Open questions from `STATE.md` (unresolved)

| OQ | Question | Status |
|---|---|---|
| OQ1 | Do substrate docs pass a stylometric similarity test against held-out Travis writing? | Open — no test performed |
| OQ2 | Are there missing voice registers (emotional, family contexts)? | Open — not assessed |
| OQ5 | How should the twin update when Travis retakes an assessment? | Open — no protocol documented |
| OQ6 | Should the skill include a shadow-pattern detector? | Open — design work not started |
| OQ7 | Should the skill explicitly enforce effortful heuristics (16, 9, 11, 7, 4) at generation time? | Open — not implemented |

OQ3 and OQ4 from STATE.md were resolved in Phase 1 (annotation scheme mechanics, skill packaging structure).

---

## 2. Gap analysis vs. phase-3 goals

### 2.1 Substrate gaps — raw samples for derived registers (HIGH priority)

The three derived-register sections each end with an explicit re-extraction note:
- `02` Correspondence Register: "Re-extract with actual email samples when available"
- `02` Ultra-Short Register: "Re-extract with actual Twitter/X posts or social captions when available"
- `02` Spoken/Conversational Register: "Re-extract with actual talk notes or podcast excerpts when available"

**What "re-extraction" means here:** Not replacing the derived-pattern section wholesale, but adding a new subsection of actual-sample-derived patterns alongside or replacing the derived section, and removing the derivation disclaimer when actual samples exist.

**The blocker:** This requires Travis James to supply or authorize content in each register. There is no automated path to obtaining these samples. The assess phase cannot resolve this gap without that input.

**Impact of the gap:** For most generation tasks in long-form written register, the substrate is excellent. For tasks targeting email, social posts, or talk prep, Gate 3 will warn and output quality will depend on how well the derived patterns approximated actual voice. This is unknown until Travis reviews actual output in those registers.

### 2.2 Worked example validation (HIGH priority)

The Tier 2 and Tier 3 worked examples are unreviewed by Travis. This matters for two reasons:

1. **Quality signal:** The examples claim to represent Travis's voice. Without his review, they might contain voice errors that mislead future users of the skill. A "worked example" that misrepresents the voice is worse than no example — it sets a wrong reference point.

2. **Trust signal for distribution:** The agentskills.io community showcase and any Anthropic marketplace listing will be evaluated partly on the quality of worked examples. A Travis-approved example carries credibility that an AI-generated-without-review example does not.

**What validation means operationally:**
- Travis reads the Tier 2 LinkedIn post and marks it: accurate / needs these corrections / would not post this
- Travis reads the Tier 3 voice prep notes and marks them: usable as prep / wrong structure / specific bullets are off
- Corrections are captured in a new document (analogous to `03-writing-samples-corrections.md` for long-form corrections)
- Corrections inform re-generation if the examples need updating

### 2.3 Tier 1 v2 worked example (MEDIUM priority)

The `zed-workspace-article.md` is the only Tier 1 reference. It declares v1. Creating a v2 Tier 1 example would:
- Demonstrate the v2 eyebrow-line format and "How to read" section with a `v2` version declaration
- Complete the three-tier worked-example set with a matched version
- Give the agentskills.io submission a complete reference set to point to

This could be a new article, or it could be the existing article updated with v2 annotation.

**Complication:** `zed-workspace-article.md` is in `docs/` (Travis's actual published work, all-rights-reserved). Adding v2 eyebrows to it changes the annotation of an already-published piece. A cleaner approach would be a new demonstrative Tier 1 v2 example in `docs/worked-examples/` — not the actual article, but an example that demonstrates the format.

### 2.4 agentskills.io community showcase submission (MEDIUM priority, LOW effort)

This is a well-defined discrete action per `docs/REGISTRATION.md`:
1. Open a PR against `agentskills/agentskills` GitHub repo following their contributing guidelines
2. Submit the skill entry to the community showcase (not the full spec — a reference entry pointing to this repo)
3. Post to the Discord community channel if applicable

The skill is fully ready for submission. The only reason this hasn't been done is that it was classified as a maintainer action and deferred. With v2.0.0 released and worked examples present, the timing is now right.

**Dependency on validation:** Submitting before the Tier 2/3 worked examples are Travis-reviewed is a risk — if Travis reviews and finds significant voice errors, the examples would need updating after the showcase submission. The safer sequencing is: validate examples first, then submit.

### 2.5 Shadow-pattern detector (LOW priority, HIGH complexity)

STATE.md OQ6 — whether the skill should include an active shadow-pattern detector to flag generated content matching Operator failure modes. This is a design-level feature that would require:
- Defining the detection rules (which shadow patterns to detect, how to surface the warning)
- Integrating the check into the Mode A generation flow
- Testing against real generation output

This is out of scope for a validation-and-distribution phase. Flag for Phase 4 or a dedicated feature phase.

### 2.6 Effortful-heuristic enforcement (LOW priority, MEDIUM complexity)

STATE.md OQ7 — whether the skill should explicitly prompt for the effortful heuristics (4, 7, 9, 11, 16) at generation time. Travis-the-person sometimes skips these; the twin should not.

`11-decision-heuristics.md` already classifies all 16 heuristics as Natural vs. Effortful and names which ones are counter-default. The implementation question is: at what point in Mode A does the skill check whether any effortful heuristics apply, and how does it prompt for them?

This is a SKILL.md behavior change — out of scope for a validation phase but close enough to be a small change in Phase 3 if the Plan phase determines the effort is low.

---

## 3. Prioritized gap summary

| # | Gap | Type | Severity | Effort | Blocker |
|---|---|---|---|---|---|
| 1 | Raw correspondence register samples (email) | Substrate | High | Requires Travis input | Travis must supply samples |
| 2 | Raw ultra-short register samples (Twitter/X) | Substrate | Medium | Requires Travis input | Travis must supply samples |
| 3 | Raw spoken register samples (transcripts or talk notes) | Substrate | Medium | Requires Travis input | Travis must supply samples |
| 4 | Tier 2 LinkedIn post reviewed and approved by Travis | Validation | High | Low (Travis action) | Travis review |
| 5 | Tier 3 voice prep reviewed and approved by Travis | Validation | High | Low (Travis action) | Travis review |
| 6 | Corrections document capturing example review feedback | Validation | Medium | Low | Follows items 4 and 5 |
| 7 | agentskills.io community showcase submission | Distribution | Medium | Low | Best after items 4+5 |
| 8 | Tier 1 v2 worked example (demonstrative, not the actual article) | Documentation | Low | Medium | None |
| 9 | Effortful-heuristic enforcement in SKILL.md behavior | Feature | Low | Medium | Design decision |
| 10 | Shadow-pattern detector | Feature | Low | High | Design-first |

---

## 4. Open questions for the Plan phase

**OQ1 — Travis content availability:** Items 1–3 and 4–5 all require Travis's participation. Can the Plan phase proceed with changes that don't require Travis input (showcase submission, Tier 1 v2 example, effortful-heuristic check), while blocking on Travis-dependent items? Or should Travis-dependency changes be sequenced as blockers for the full phase?

**OQ2 — Validation workflow:** When Travis reviews the worked examples (items 4–5), what is the output format? Options:
- (a) Travis annotates the Markdown files directly with inline comments
- (b) A new document `docs/worked-examples/tier-2-corrections.md` captures corrections (analogous to `03-writing-samples-corrections.md`)
- (c) Travis reads and declares "approved as-is" or "needs revision" without inline markup

Option (b) is highest signal — it creates substrate analogous to doc 03 for long-form. Option (c) is lowest friction.

**OQ3 — Tier 1 v2 example scope:** Should the Tier 1 v2 demonstrative example be:
- (a) A new article on a different topic in the same domain (agentic programming)
- (b) The `zed-workspace-article.md` updated in-place to v2 annotation format
- (c) A shorter document — not a full article — that demonstrates only the Tier 1 annotation format itself (a "format demo" rather than a worked-content example)

Option (a) is highest quality but highest effort. Option (c) is lowest effort and fastest to produce. Option (b) risks retroactively changing a v1-declared published piece.

**OQ4 — Effortful heuristics feature scope:** Should this phase implement the effortful-heuristic check as part of SKILL.md Mode A behavior, or defer to Phase 4? If implementing, the simplest form is: a list of conditions in Mode A that trigger a "check these heuristics before generating" prompt.

---

## 5. What this phase does NOT include

- Shadow-pattern detector (OQ6 from STATE.md) — design-first, deferred to a dedicated feature phase
- Surreal-memory ingestion of the Travis substrate (STATE.md entities and relations) — operational concern, not a skill-content change
- Full stylometric validation against held-out Travis writing (would require external tooling or a human reviewer)
- Anthropic official marketplace submission (maintainer-gated; outside KBD scope)
- npm publication (optional; documented in REGISTRATION.md; low priority)

---

## 6. Recommended change structure for Plan phase

The blockers split this phase into two tracks:

**Track A — Travis-independent (can begin immediately):**
- Change I: agentskills.io community showcase submission (after Travis example review if possible, or independently if Travis review is delayed)
- Change J: Tier 1 v2 demonstrative example in `docs/worked-examples/` (option c — format demo, low effort)
- Change K: Effortful-heuristic check in SKILL.md Mode A (if Plan confirms low effort)

**Track B — Travis-dependent (blocked on Travis input):**
- Change L: Supply actual email samples → re-extract correspondence register in 02 + 10
- Change M: Supply actual Twitter/X posts → re-extract ultra-short register in 02
- Change N: Supply actual talk transcripts or notes → re-extract spoken register in 02 + 07
- Change O: Travis review of Tier 2 example → corrections document or approval declaration
- Change P: Travis review of Tier 3 example → corrections document or approval declaration

Track A changes can be planned and executed now. Track B changes cannot be planned until the OQs above (OQ1, OQ2) are resolved and Travis has provided his input.

**Plan phase should resolve OQ1–OQ4 before writing the change list,** and may decide to scope this phase to Track A only, with Track B deferred to a future `phase-3b-substrate-hardening` phase once Travis input is available.
