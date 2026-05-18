# Assessment — phase-1-distribution-compliance

**Project:** authentic-digital-twin-content (Agent Skill)
**Phase goal:** Make the skill fully agentskills.io-spec compliant, packageable as a Claude Code plugin/marketplace entry and an OpenCode skill, registrable in major skill repositories, and broaden its scope from "published artifacts" to all forms of communication.
**Date:** 2026-05-17
**Phase status:** ASSESS complete — no artifacts or code generated (per instruction)

---

## 0. Method note

`.kbd-orchestrator/` did not exist and `../prompts/assess.md` was absent. This assessment was produced directly against the skill's own content and against authoritative external specs fetched live:

- agentskills.io specification (frontmatter fields, naming, progressive disclosure, validation)
- Claude Code plugin + marketplace docs (`code.claude.com/docs/en/plugins`)
- OpenCode skills docs (`opencode.ai/docs/skills`)

No `progress.json` existed — this is the first KBD session for this project.

---

## 1. Current state (what exists)

| Area | State |
|---|---|
| `SKILL.md` | Present, 179 lines, well-structured 3-mode design |
| `README.md` | Present, human-facing |
| `references/` | 5 files (annotation-scheme, authenticity-standard, voice-extraction-process, surreal-memory-schema, substrate-template) — all under 200 lines |
| `templates/` | 2 files (00-INDEX, STATE) |
| `docs/` | Worked example substrate (digital-twin-travis, 13 files), standards, methodology, transcripts, assessments, HTML renders |
| Worked examples | `zed-workspace-article.md`, `tj-workspace-identity-article.html`, verification doc |
| Plugin packaging | **None** — no `.claude-plugin/plugin.json`, no marketplace manifest |
| Registry presence | **None** — not registered anywhere |
| Validation | **Never run** against `skills-ref` |

The skill is conceptually mature. The gaps are all distribution, packaging, and scope — not core methodology.

---

## 2. Gap analysis vs. agentskills.io specification

### 2.1 Frontmatter — BLOCKERS

| Field | Spec rule | Current | Verdict |
|---|---|---|---|
| `name` | 1–64 chars, lowercase alnum + single hyphens, **must match parent directory name** | `authentic-digital-twin-content` | **GAP** — value is spec-valid, but parent dir must be confirmed to match exactly. Skill currently lives at `/Projects/skills/authentic-digital-twin-content` (matches) but also referenced from `~/.claude/skills/`. Directory-name parity must be guaranteed wherever it ships. |
| `description` | 1–1024 chars, what + when | Present, ~1000 chars, strong keyword coverage | **PASS** — near the 1024 ceiling; any scope expansion (§4) risks overflow. Must be measured before edits. |
| `version` | Not an agentskills.io field | Present (`1.0.0`) at top level | **GAP** — `version` is **not** a spec frontmatter field. Spec puts version under `metadata`. Currently a top-level non-standard key. Strict validators may warn. |
| `license` | Optional, recommended | **Absent** | **GAP** — no `license` field; no `LICENSE` file. README claims the standard is "intended to be re-used" but ships no license. |
| `metadata` | Optional key-value map | **Absent** | **GAP** — author, version, homepage, repository belong here. |
| `compatibility` | Optional, ≤500 chars | **Absent** | **GAP (minor)** — skill depends on the optional surreal-memory MCP; a `compatibility` note is warranted but not required. |
| `allowed-tools` | Optional, experimental | **Absent** | **OPTIONAL** — skill is generative/file-based; could declare `Read Write Edit` but not required. |

### 2.2 Structure & progressive disclosure

| Check | Spec rule | Current | Verdict |
|---|---|---|---|
| `SKILL.md` length | ≤500 lines recommended | 179 lines | **PASS** |
| `SKILL.md` body tokens | <5000 recommended | Within range | **PASS** |
| Reference files focused | Keep small, load on demand | All <200 lines | **PASS** |
| Standard directory names | `scripts/`, `references/`, `assets/` | `references/` ✓, `templates/` (non-standard), no `assets/` | **GAP (minor)** — `templates/` is allowed (spec permits "any additional files") but `assets/` is the conventional home for templates. Worth noting, low priority. |
| File-reference depth | One level deep from `SKILL.md` | `docs/digital-twin-travis/0X.md` is two levels | **GAP (minor)** — worked-example references are 2 levels deep. Spec says "avoid deeply nested reference chains"; acceptable for examples, but flag. |
| Validation | `skills-ref validate` must pass | Never run | **GAP** — validation has never been executed. Must be a gate in a later phase. |

### 2.3 agentskills.io compliance verdict

**NOT YET COMPLIANT.** Blockers: non-standard top-level `version` key; missing `license`; unverified directory-name parity. After those three are fixed and `skills-ref validate` passes, the skill is compliant. Estimated scope: frontmatter edit + one license file + one validation run.

---

## 3. Gap analysis vs. distribution targets

### 3.1 Claude Code plugin + marketplace

| Requirement | Current | Gap |
|---|---|---|
| `.claude-plugin/plugin.json` manifest (`name`, `description`, `version`, `author`) | Absent | **GAP** — no plugin manifest. Skill cannot be installed via `/plugin install`. |
| `skills/<name>/SKILL.md` layout inside plugin | Skill is currently a bare skill dir, not nested under `skills/` | **GAP** — plugin packaging requires the skill to sit at `plugin-root/skills/authentic-digital-twin-content/SKILL.md`. Current repo root *is* the skill dir. A packaging decision is required: wrap-in-place vs. restructure. |
| Marketplace manifest (`.claude-plugin/marketplace.json`) | Absent | **GAP** — needed only if self-hosting a marketplace; optional if submitting to the official marketplace via the in-app form. |
| Namespacing implication | Plugin skills become `/plugin-name:authentic-digital-twin-content` | **DECISION NEEDED** — accept namespaced invocation. |
| Official marketplace submission | Not submitted | **GAP** — submission is via `claude.ai/settings/plugins/submit` or `platform.claude.com/plugins/submit` (in-app forms, not a file commit). |
| `README.md` for plugin | Present | **PASS** — already exists; may need install instructions added. |

### 3.2 OpenCode

| Requirement | Current | Gap |
|---|---|---|
| Discovery path | OpenCode reads `.claude/skills/`, `.opencode/skills/`, `.agents/skills/`, global config | **PASS (mechanism)** — OpenCode natively reads `.claude/skills/`, so a spec-compliant skill is already OpenCode-loadable with **no extra packaging**. |
| Frontmatter compatibility | OpenCode requires `name`, `description`; supports `license`, `compatibility`, `metadata` | **GAP inherited from §2.1** — same frontmatter fixes apply. OpenCode does **not** read a top-level `version` key. |
| OpenCode permissions | Pattern-based `allow`/`deny`/`ask` in `opencode.json` | **NO ACTION** — consumer-side config, not skill-side. Optionally document recommended permissions. |
| OpenCode-specific manifest | None — OpenCode uses the plain Agent Skill format | **PASS** — once agentskills.io-compliant, OpenCode support is automatic. |

**Key finding:** OpenCode support costs **almost nothing extra**. Fixing §2.1 frontmatter delivers OpenCode compatibility for free. The only OpenCode-specific deliverable is documentation.

### 3.3 Other registries / repositories

| Target | Mechanism | Gap |
|---|---|---|
| agentskills.io ecosystem | Open standard; `agentskills/agentskills` GitHub repo + Discord | **GAP** — registration/contribution path needs to be documented; no PR or listing exists. |
| Anthropic official plugin marketplace | In-app submission form | **GAP** — not submitted. |
| Community marketplaces (git-repo-based) | A `marketplace.json` in a public git repo | **GAP** — no public repo, no marketplace.json. |
| Generic Agent Skill registries (Junie, Cursor, Goose, Gemini CLI, etc. all consume the format) | Standard format = automatic compatibility | **PASS (mechanism)** — once compliant, the skill works across ~40 listed clients with no per-client work. |

**Finding:** the registration story is mostly *one* artifact (a public git repo with manifests) plus *documentation* of the submission steps. The instruction asks for "instructions for registering" — that is a documentation deliverable, correctly deferred to a later phase.

---

## 4. Scope-expansion gap: "all kinds of communication beyond just published artifacts"

This is the substantive product gap, distinct from packaging.

### 4.1 Current scope is artifact-centric

The skill today is built around **long-form published artifacts**: articles, blog posts, op-eds, LinkedIn posts, newsletters, proposals, memos. Evidence:

- `SKILL.md` "When to use" lists only published-content scenarios.
- The provenance manifest assumes an **article footer** — a structural assumption that breaks for short or non-document channels.
- The annotation scheme uses **italic eyebrow lines per block** — overhead that "would dominate" in conversational contexts (the skill explicitly excludes chat for this reason).
- `SKILL.md` "What this skill does not do" excludes "conversational responses inside chat" and "anonymous/institutional content."

### 4.2 Communication surfaces currently unsupported

| Surface | Supported today? | Gap |
|---|---|---|
| Articles / long-form | Yes | — |
| Email | Partially (listed as artifact) | Annotation/manifest model is heavy for email; no email-specific register guidance |
| Chat / DM / Slack / iMessage | **Explicitly excluded** | No lightweight provenance mode for short-form |
| Social posts (X, threads) | Partially (LinkedIn named) | No platform-native short-form voice mode; manifest doesn't fit a tweet |
| Voice / spoken scripts, talk tracks | **No** | No spoken-register substrate dimension |
| Meeting messages, comments, PR descriptions, code review prose | **No** | Not addressed |
| Real-time / interactive replies | **No** | No mode for in-the-moment generation without full annotation overhead |

### 4.3 What the expansion requires (analysis only — DO NOT build yet)

1. **A tiered provenance model.** The per-block eyebrow + footer manifest is correct for articles and wrong for a 200-character message. The expansion needs a **graduated annotation scheme**: full manifest (artifacts) → compact inline tag (email/posts) → channel-level disclosure (chat/voice). This is a change to `references/annotation-scheme.md` and the standard itself (likely **v2** of the Authentic Digital Twin Content Standard).
2. **Register coverage in the substrate.** Documents 02/06/07 capture written registers. Spoken, conversational, and ultra-short registers are not first-class. The reliability gate ("two registers minimum") may need to become surface-aware.
3. **Surface taxonomy.** A new reference file classifying communication surfaces and mapping each to (a) the right provenance tier, (b) the right register, (c) whether the skill should trigger at all.
4. **Trigger-scope revision.** `SKILL.md`'s "Do not trigger" list explicitly excludes chat. Expanding scope means rewriting both the trigger list and the `description` — and `description` is already near the 1024-char ceiling (§2.1), so this is a constrained edit.
5. **Standard versioning.** A scope change to the provenance model is a standard change. The standard is already versioned ("articles declare which version"); the expansion implies **Standard v2** with backward-compatible v1 articles.

### 4.4 Scope-expansion verdict

This is **not a compliance fix — it is a product evolution** and should be its own KBD phase (or sub-phase) after the compliance/packaging phase. Mixing it into the packaging work would couple a mechanical task with a design task. Recommend sequencing: **compliance & packaging first, scope expansion second.**

---

## 5. Other improvements observed (assessment only)

| Observation | Severity | Note |
|---|---|---|
| No `LICENSE` file despite README inviting re-use | HIGH | Re-use claim is unenforceable and registries expect a license |
| No `CHANGELOG.md` | MEDIUM | Standard is versioned; changes should be tracked |
| `version` lives in non-standard location | MEDIUM | Move under `metadata` |
| Not under git (repo root reports "Is a git repository: false") | HIGH | Marketplace distribution and version-SHA fallback both require git; registration requires a public repo |
| `templates/` vs conventional `assets/` | LOW | Cosmetic; spec permits it |
| Worked-example refs 2 levels deep | LOW | Acceptable for examples |
| `skills-ref validate` never run | HIGH | Must be a gate before any "compliant" claim |
| No CI to re-validate on change | MEDIUM | A validation workflow would prevent regressions |
| `.DS_Store` files committed in `docs/` and root | LOW | Should be gitignored before any public push |
| README lacks install/registration instructions | MEDIUM | Needed once packaging exists |

---

## 6. Phase boundary recommendation (for PLAN, not executed here)

The argument bundles three distinct workstreams. They should be **separated into ordered changes** during the PLAN phase, not merged:

1. **Change A — Spec compliance.** Frontmatter fixes (`license`, `metadata`, relocate `version`, optional `compatibility`), add `LICENSE` file, confirm directory-name parity, run `skills-ref validate` to green.
2. **Change B — Plugin & marketplace packaging.** `.claude-plugin/plugin.json`, decide wrap-vs-restructure for `skills/` layout, optional `marketplace.json`, git-init + public repo, `.gitignore`.
3. **Change C — Registration documentation.** Written instructions for agentskills.io contribution, Anthropic in-app marketplace submission, and community-marketplace listing. (Documentation artifact — depends on A and B existing.)
4. **Change D — Communication-scope expansion.** Tiered provenance model, surface taxonomy, Standard v2, substrate register expansion, trigger-list and `description` rewrite. **Largest and riskiest; sequence last.**

Dependency order: A → B → C; D after C (D's `description` rewrite must respect the 1024-char ceiling that A also touches, so D must not run before A is settled).

---

## 7. Open questions for PLAN phase

1. **Packaging shape:** wrap the current skill dir inside a new plugin repo (`plugin/skills/authentic-digital-twin-content/`), or restructure in place? Affects every downstream path reference.
2. **Repo hosting:** where does the public git repo live (GitHub org? personal?) — needed for marketplace and registry listing.
3. **License choice:** the standard, schema, and methodology are "intended to be re-used" — which license (Apache-2.0, MIT, CC-BY)? The Travis substrate is explicitly *not* for general use, so the license may need to scope-exclude `docs/digital-twin-travis/`.
4. **Standard v2 vs v1.1:** is the communication-scope expansion a major (v2) or minor revision? Determines whether existing v1 articles need re-declaration.
5. **Should the skill be split?** A "twin bootstrap" skill and a "twin generate" skill could be separate marketplace entries. Out of scope to decide now, but PLAN should consider it.
6. **`description` budget:** measure current length precisely; the scope expansion needs room within 1024 chars or the description must be tightened first.

---

## 8. Summary verdict

| Dimension | Status |
|---|---|
| agentskills.io compliant | **NO** — 3 blockers, all small (license, version location, validation) |
| Claude Code plugin-ready | **NO** — no manifest, no `skills/` layout, not in git |
| Claude marketplace-ready | **NO** — depends on plugin packaging + public repo |
| OpenCode-compatible | **NEARLY** — free once frontmatter is fixed; doc-only deliverable |
| Registry-registrable | **NO** — needs public repo + documented submission steps |
| Communication scope | **ARTIFACT-ONLY** — chat/voice/short-form explicitly excluded; needs Standard v2 |
| Core methodology quality | **STRONG** — no rework needed; substrate model and reference docs are mature |

The skill's intellectual content is sound. Every gap is distribution, packaging, licensing, or deliberate scope — all mechanical or design work, none of it a rewrite of the skill's core. The work splits cleanly into four ordered changes (A→B→C→D) for the PLAN phase.
