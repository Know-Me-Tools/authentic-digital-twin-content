# Plan — phase-3-voice-validation

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Execute Track A — the three Travis-independent distribution and documentation improvements. Track B (substrate sample infill, worked example review) deferred to phase-3b pending Travis input.
**Change backend:** native KBD (no OpenSpec detected)
**Evolver bridge:** none
**Date:** 2026-05-19
**Source:** `.kbd-orchestrator/phases/phase-3-voice-validation/assessment.md`

---

## Open question resolutions

| OQ | Question | Resolution |
|---|---|---|
| OQ1 | Phase scope | **Track A only.** Execute the three Travis-independent changes now. Track B (raw samples for correspondence/ultra-short/spoken registers; Tier 2 and Tier 3 example reviews) deferred to `phase-3b-substrate-hardening` once Travis input is available. |
| OQ2 | Review output format | **Corrections doc pattern.** When Travis reviews the Tier 2 and Tier 3 worked examples, corrections are captured in `docs/worked-examples/worked-example-corrections.md` — same structure as `03-writing-samples-corrections.md`. High substrate signal. Not needed this phase (Track B). |
| OQ3 | Tier 1 v2 example scope | **Short format demo.** A compact document in `docs/worked-examples/` showing the Tier 1 v2 annotation format (eyebrow lines, "How to read" section, footer manifest) on a short representative excerpt — not a full article. Low effort, demonstrates the format without creating a redundant full article. |
| OQ4 | Effortful heuristics feature | **Deferred to Phase 4.** Keep this phase focused on distribution and documentation. The heuristic enforcement feature is a behavior change to SKILL.md Mode A that deserves a dedicated focused phase. |

---

## Ordered change list

Three changes, all independent — can run in parallel if desired, though I is slightly lower-stakes if G and J don't exist yet to reference.

| # | Change ID | Depends on | Recommended agent | Risk |
|---|---|---|---|---|
| I | change-I-agentskills-submission | — | `general-purpose` | Low |
| J | change-J-tier1-format-demo | — | `prompt-engineer` | Low |
| K | change-K-readme-polish | — | `general-purpose` | Low |

**Rationale:**
- **I ∥ J ∥ K** — all three are independent; no shared files; can run in parallel
- **I** (showcase submission) ideally runs after J produces the Tier 1 format demo, so the showcase PR can reference a complete three-tier worked-example set. But it is not a hard dependency — I can reference the existing two examples if J is delayed.
- **K** (README polish) — a small but distribution-relevant cleanup: the README should reference the worked-examples directory and the Standard v2 spec so that a developer browsing the GitHub repo can find the full reference set immediately. Low risk, high visibility signal.

---

## Change I — agentskills.io community showcase submission

**File:** `.kbd-orchestrator/changes/change-I-agentskills-submission/change.md`
**Recommended agent:** general-purpose
**Risk:** Low — external action (GitHub PR); no project files modified

**Scope:**
1. Read `docs/REGISTRATION.md` to retrieve the exact agentskills.io contribution steps
2. Check the `agentskills/agentskills` GitHub repo contributing guidelines (via `gh` or web) for the current submission format
3. Draft the showcase entry in whatever format the registry requires (typically a short YAML or Markdown skill entry referencing this repo's URL and the skill name)
4. Open a PR against `agentskills/agentskills` with the entry
5. Record the PR URL in a new `docs/DISTRIBUTION-STATUS.md` file — a lightweight ledger of which channels are live, which are submitted-and-pending, and which are not yet started
6. Update `CHANGELOG.md` with a `[Unreleased]` note: "Submitted to agentskills.io community showcase (PR #...)"

**Done when:** PR is open against `agentskills/agentskills`; `docs/DISTRIBUTION-STATUS.md` records the PR URL and submission date.

**Out of scope:** Anthropic official marketplace (separate review process); npm publication (optional, lower priority).

---

## Change J — Tier 1 v2 format demo

**File:** `.kbd-orchestrator/changes/change-J-tier1-format-demo/change.md`
**Recommended agent:** prompt-engineer
**Risk:** Low — new file only; no existing files modified

**Scope:**
Write `skills/authentic-digital-twin-content/docs/worked-examples/tier-1-format-demo.md` — a compact document demonstrating Tier 1 v2 annotation on a short representative excerpt (~300–500 words of article-style content).

The format demo must show:
1. **"How to read this piece" section** at the top — with `v2` version declaration and a brief explanation of the eyebrow-line annotation system
2. **Per-block eyebrow lines** — italic, immediately before each block, using the correct v2 format:
   - `*[Travis James — Human-authored]*`
   - `*[AI-drafted, human-edited — Claude Sonnet 4.6 via authentic-digital-twin-content v2.0.0]*`
   - `*[AI verbatim — Claude Sonnet 4.6 via authentic-digital-twin-content v2.0.0]*`
3. **At least one block of each authorship category** — Human-authored, AI-drafted-human-edited, AI verbatim — so the full tier is demonstrated
4. **Footer content provenance manifest table** at the end, in the Standard v2 format:

   | Block | Category | Model | Tool |
   |---|---|---|---|
   | Opening paragraph | Human-authored | — | — |
   | Technical explanation | AI-drafted, human-edited | Claude Sonnet 4.6 | authentic-digital-twin-content v2.0.0 |
   | Code sample | AI verbatim | Claude Sonnet 4.6 | authentic-digital-twin-content v2.0.0 |

5. **A brief annotation block** after the manifest explaining: what this file is (format demo, not full worked example); how to read the eyebrow lines; what the three categories mean; the difference from the Tier 2 and Tier 3 examples in this directory

**Content topic:** The format demo's article excerpt should be on an agentic programming topic consistent with the other worked examples (workspace identity, context infrastructure). Short, dense, demonstrative — quality of format over length of content.

**Travis voice:** The Human-authored block must pass the rejection filter and demonstrate the Travis voice patterns from the substrate. The AI-drafted-human-edited block can be a slightly less compressed version of the same thought. The AI verbatim block can be a technical explanation or code structure.

**Done when:** `docs/worked-examples/tier-1-format-demo.md` exists with all three authorship categories, proper v2 eyebrow lines, a manifest, and an annotation block.

**Note:** Update `docs/worked-examples/README.md` to reference the new file.

---

## Change K — README polish for distribution readiness

**File:** `.kbd-orchestrator/changes/change-K-readme-polish/change.md`
**Recommended agent:** general-purpose
**Risk:** Low — README update; no behavior change

**Scope:**
Update the project-root `README.md` to add three missing reference sections that matter to a developer browsing the GitHub repo for the first time:

1. **"Worked examples" section** — brief table linking to the three worked examples in `docs/worked-examples/` (Tier 1 format demo, Tier 2 LinkedIn post, Tier 3 voice prep). One-line description per example of what it demonstrates.

2. **"Standard version" section** (or expand the existing standard reference) — a clear statement that this skill implements Standard v2; link to `skills/authentic-digital-twin-content/docs/standards/authentic-digital-twin-content-standard-v2.md`; one-line note that Standard v1 articles remain valid.

3. **"Reference implementation" note** — Travis James's substrate (`docs/digital-twin-travis/`) is the reference implementation of what good substrate looks like. The skill is generic; Travis's substrate is an example, not a dependency.

**Constraints:**
- `SKILL.md` description must remain at or under 1024 characters. README changes do not touch SKILL.md description — this constraint does not apply here.
- The README is public-facing. No internal project paths, personal contact details, or private infra references should be added.
- Keep each new section brief — 4–8 lines. The README is already functional; this is targeted enrichment, not a rewrite.

**Done when:** `README.md` has a worked-examples section with links, a standard-version note, and a reference-implementation note; links resolve to existing files.

---

## Verification gates (per change)

| Change | Gate |
|---|---|
| I | PR is open against `agentskills/agentskills`; PR URL recorded in `docs/DISTRIBUTION-STATUS.md` |
| J | `docs/worked-examples/tier-1-format-demo.md` exists; all three authorship categories present with correct v2 eyebrow format; manifest table present; `README.md` in worked-examples updated |
| K | `README.md` has worked-examples section with working links; standard-version note; reference-implementation note |

---

## Constraints

- `SKILL.md` description must remain ≤ 1024 chars. No changes this phase touch SKILL.md; constraint is noted for awareness.
- Travis James substrate files are all-rights-reserved. Change J draws from substrate voice patterns — the format demo is a reference implementation, not a raw extract of Travis content.
- Change I is an external GitHub action. The PR must follow the contributing guidelines of the `agentskills/agentskills` repo exactly — do not guess at the required format; read it first.
- Track B (raw sample infill, example reviews, corrections doc) is explicitly out of scope for this plan. Changes L–P belong to `phase-3b-substrate-hardening`.

---

## Phase-3b scope (deferred, not planned here)

For reference — these changes are NOT in this plan and will NOT be executed in this phase:

- **Change L** — Supply actual email samples → re-extract correspondence register in 02 + 10
- **Change M** — Supply actual Twitter/X posts → re-extract ultra-short register in 02
- **Change N** — Supply actual talk transcripts or notes → re-extract spoken register in 02 + 07
- **Change O** — Travis review of Tier 2 LinkedIn post → corrections doc or approval
- **Change P** — Travis review of Tier 3 voice prep → corrections doc or approval

These require Travis's active participation. When that input is available, run `/kbd-new-phase phase-3b-substrate-hardening`.
