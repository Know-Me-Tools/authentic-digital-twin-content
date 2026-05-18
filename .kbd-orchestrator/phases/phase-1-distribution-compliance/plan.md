# Plan — phase-1-distribution-compliance

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Spec compliance, plugin/marketplace packaging, registry registration, and communication-scope expansion.
**Change backend:** native KBD (no OpenSpec detected)
**Evolver bridge:** none (not an evolution cycle)
**Date:** 2026-05-17
**Source:** `.kbd-orchestrator/phases/phase-1-distribution-compliance/assessment.md`

---

## Ordered change list

Four changes, strict dependency order **A → B → C → D**. Each is self-contained and independently verifiable. Do not start a change until its predecessor is complete.

| # | Change | Depends on | Recommended agent | Risk |
|---|---|---|---|---|
| A | Spec compliance | — | `general-purpose` | Low |
| B | Plugin & marketplace packaging | A | `general-purpose` | Medium |
| C | Registration documentation | A, B | `doc-updater` | Low |
| D | Communication-scope expansion | A, B, C | `prompt-engineer` | High |

Rationale for ordering:
- **A before B** — the plugin manifest and `skills/` layout must wrap a *compliant* skill; fixing frontmatter after packaging means editing in two places.
- **B before C** — registration instructions reference real manifest files and a real repo; writing the docs first would describe artifacts that don't exist.
- **D last** — D rewrites the `description` and trigger list. `description` is currently **892/1024 chars** (132 headroom). D must respect the ceiling that A also touches; running D before A is settled risks two conflicting edits to the same field. D is also a design task (Standard v2) and must not be coupled to mechanical packaging work.

---

## Change A — Spec compliance

**File:** `.kbd-orchestrator/changes/change-A-spec-compliance/change.md`
**Goal:** Skill passes `skills-ref validate` and conforms to the agentskills.io frontmatter spec.

Scope:
1. Relocate `version` out of top-level frontmatter into `metadata.version`.
2. Add `metadata` map: `author`, `version`, `homepage`, `repository` (repository value provisional until Change B settles hosting).
3. Add a `license` frontmatter field and a top-level `LICENSE` file. License choice is **Open Question 3** — resolve before executing. The Travis substrate (`docs/digital-twin-travis/`) must be scope-excluded from the re-use license.
4. Add optional `compatibility` field noting the optional surreal-memory MCP dependency.
5. Confirm parent-directory name exactly equals `name` (`authentic-digital-twin-content`) at every shipping location.
6. Add `.gitignore` (exclude `.DS_Store`, OS cruft) and remove committed `.DS_Store` files.
7. Run `skills-ref validate ./` and reach green.

Out of scope: any change to skill behavior, the `description` text (reserved for D), packaging.

**Done when:** `skills-ref validate` passes; frontmatter has no non-standard top-level keys; `LICENSE` exists; no `.DS_Store` tracked.

---

## Change B — Plugin & marketplace packaging

**File:** `.kbd-orchestrator/changes/change-B-plugin-packaging/change.md`
**Goal:** Skill is installable as a Claude Code plugin and listable in a marketplace.

Scope:
1. Resolve **Open Question 1** (wrap vs. restructure) and **Open Question 2** (repo hosting) before executing.
2. Create `.claude-plugin/plugin.json` with `name`, `description`, `version`, `author`, `homepage`, `repository`, `license`.
3. Establish the `skills/authentic-digital-twin-content/SKILL.md` layout the plugin format requires.
4. Create `.claude-plugin/marketplace.json` for self-hosted marketplace distribution.
5. `git init`, initial commit, push to the public repo decided in OQ2.
6. Verify with `claude --plugin-dir ./` that the skill loads and the namespaced invocation resolves.
7. Add install instructions to `README.md`.

Out of scope: submitting to the official marketplace (that is a documented step in C); scope expansion.

**Done when:** `plugin.json` and `marketplace.json` validate; `claude --plugin-dir` loads the skill; repo is public; README documents install.

---

## Change C — Registration documentation

**File:** `.kbd-orchestrator/changes/change-C-registration-docs/change.md`
**Goal:** A written, followable guide for registering the skill in all major distribution channels.

Scope:
1. Write `docs/REGISTRATION.md` covering, with exact steps:
   - agentskills.io ecosystem — contribution path via the `agentskills/agentskills` GitHub repo and Discord.
   - Anthropic official plugin marketplace — in-app submission via `claude.ai/settings/plugins/submit` and `platform.claude.com/plugins/submit`.
   - Community git-repo marketplaces — how others add this repo's `marketplace.json` as a source.
   - OpenCode — note that `.claude/skills/` is read natively; document recommended `opencode.json` permissions.
   - Generic clients (Cursor, Goose, Gemini CLI, Junie, etc.) — automatic via the standard format.
2. Add a `CHANGELOG.md` (the standard is versioned; changes must be tracked).
3. Cross-link `REGISTRATION.md` from `README.md`.

Out of scope: actually submitting (submission is an action the maintainer takes; the deliverable is the instructions).

**Done when:** `docs/REGISTRATION.md` and `CHANGELOG.md` exist, are accurate against B's artifacts, and are linked from README.

---

## Change D — Communication-scope expansion

**File:** `.kbd-orchestrator/changes/change-D-communication-scope/change.md`
**Goal:** Extend the skill from published artifacts to all communication surfaces (email, chat, social, voice, comments).

Scope:
1. Resolve **Open Question 4** (Standard v2 vs v1.1) before executing — a provenance-model change is likely major (v2).
2. Design a **tiered provenance model**: full manifest (artifacts) → compact inline tag (email/posts) → channel-level disclosure (chat/voice). Update `references/annotation-scheme.md`.
3. Add a new reference file: a **communication-surface taxonomy** mapping each surface to provenance tier, register, and trigger eligibility.
4. Expand substrate register coverage — make spoken/conversational/ultra-short registers first-class; revisit the "two registers minimum" reliability gate to be surface-aware.
5. Author **Standard v2** (`docs/standards/`), keeping v1 articles valid (declared version).
6. Rewrite `SKILL.md` "When to use" / "Do not trigger" lists and the `description` field. **Constraint:** `description` budget is 1024 chars, currently 892 used — any expansion must stay within 1024 or tighten existing text first.
7. Consider (do not necessarily execute) **Open Question 5** — splitting bootstrap vs. generate into separate skills.

Out of scope: re-running packaging/registration (D's output flows into the *next* phase's re-validation, not back into B/C).

**Done when:** Standard v2 published; tiered provenance model documented; surface taxonomy exists; `SKILL.md` triggers and `description` updated within the char ceiling; `skills-ref validate` still green.

---

## Open questions blocking execution

These must be answered before the listed change starts. They are decisions for the maintainer, not the executing agent.

| # | Question | Blocks | Default if undecided |
|---|---|---|---|
| 1 | Wrap skill dir in a plugin repo, or restructure in place? | B | Wrap (`plugin-root/skills/<name>/`) — least disruption to existing paths |
| 2 | Where does the public git repo live (which GitHub org/account)? | B, C | — must be answered, no safe default |
| 3 | Which license? Re-use intended; Travis substrate excluded. | A | Apache-2.0 for the skill + standard; `docs/digital-twin-travis/` marked all-rights-reserved |
| 4 | Standard v2 (major) or v1.1 (minor)? | D | v2 — provenance-model change is structural |
| 5 | Split bootstrap vs. generate into two skills? | D (consider) | No split this phase; revisit in a later phase |
| 6 | `description` final wording within 1024 chars | D | Tighten before expanding |

---

## Verification gates for the phase

- After A: `skills-ref validate` green.
- After B: `claude --plugin-dir ./` loads the skill; manifests parse.
- After C: docs accurate against real artifacts.
- After D: `skills-ref validate` still green; `description` ≤ 1024 chars; v1 articles still declare-valid.

Phase is complete when all four changes are done and all gates pass. Then run `/kbd-reflect`.
