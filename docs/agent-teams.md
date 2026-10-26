# Digital-twin specialist team

The selected manifest is `.agent-team/authentic-digital-twin/team.json`. It defines
twelve roles organized into four workstreams. Use the relevant subset for a task;
the roster is not twelve continuously running agents. Native delegation belongs
to the client. When unavailable, follow role instructions sequentially and say so.

| Workstream | Role | Responsibility |
|---|---|---|
| Product and architecture | product-manager | External needs, priorities, acceptance and internal assignments |
| Product and architecture | systems-architect | Evidence contracts, component boundaries and migration decisions |
| Evidence and authorship | evidence-collector | Authorized desktop, messaging, email and export collection; source receipts |
| Evidence and authorship | provenance-curator | Identity, attribution, consent scope, ontology and source-to-claim lineage |
| Engineering | ingestion-engineer | Rust import pipeline and CLI application services |
| Engineering | mcp-server-engineer | rmcp adapters and revision/transport/client interoperability |
| Engineering | rag-graphrag-expert | Retrieval strategy, EdgeQuake integration and search experiments |
| Engineering | surrealdb-engineer | Configurable embedded/remote vector and graph persistence |
| Maintenance and assurance | skill-maintainer | Authoring skill, standards, templates and companion skill maintenance |
| Maintenance and assurance | security-reviewer | Independent trust-boundary review and reproducible findings |
| Maintenance and assurance | evaluation-engineer | Retrieval/provenance acceptance, client testing and quality evidence |
| Maintenance and assurance | release-engineer | TypeScript 7/Node tooling, package delivery and client adapters |

The manifest assigns write paths, dependencies, inputs, outputs and skills. Paths
for future crates are ownership plans, not implemented services. Shared generated
files require an explicit handoff between skill-maintainer and release-engineer.
Reviewers write findings in separate directories and do not silently edit code.

## Why these additional roles

The [orchestrator/worker and evaluator patterns](https://www.anthropic.com/research/building-effective-agents)
support separating coordination, implementation and independent evaluation when
tasks justify the cost. They do not establish one universally optimal team.
Here, the additional roles follow concrete boundaries: ingestion must preserve
evidence; provenance needs its own owner; retrieval quality needs held-out checks;
network/database boundaries need security review; portable packaging needs an
owner separate from content authorship. These are project decisions informed by
research, not a claim to enumerate every possible agent role.

## Installed client surfaces

| Client | Project surface | Qualification |
|---|---|---|
| Codex | `.codex/agents/*.toml`, `.agents/skills/` | Native definitions; runtime discovery/invocation not certified |
| Claude Code | `.claude/agents/*.md`, `.claude/skills/` | Subagent definitions; does not enable experimental teams |
| Kimi Code | `.kimi-code/agents/*.md`, `.kimi-code/skills/` | Current kimi-code contract; not legacy kimi-cli |
| OpenCode | `.opencode/agents/*.md`, `.opencode/skills/` | Preserves existing `opencode.json` and its connectors |
| MiniMax Code | `.minimax/agents/*/agent.md`, `.minimax/skills/` | Requires explicit `MINIMAX_DATA_DIR` for this project |
| DeepSeek Harness | `.dsh/profiles/*/cordis.patch.yml`, `.dsh/skills/` | Profiles staged/installed; experimental team activation is separate |
| Zed | `AGENTS.md`, `.agents/skills/` | Native instruction/skill routing; ACP uses external client's configuration |

[Zed instructions](https://zed.dev/docs/ai/instructions) load the first matching
project instruction file. The installer also updates that existing higher-priority
file when needed. [External ACP agents](https://zed.dev/docs/ai/external-agents)
retain their own model, permissions and native configuration. A Zed parallel-thread
UI is not an API for automatically spawning this roster.

Native options and differences are recorded in export/install receipts under the
team directory. Six exports plus Zed routing do not prove live behavior in seven
clients. `client-probes.json` records bounded executable probes separately.

## Companion package and installation

The original `skills/authentic-digital-twin-content/` directory contains its own
optional `scripts/install-team.mjs` and `tooling/` payload. Copying that directory
retains the installer, team, native proposals, companion skills, source receipts
and licenses. It does not require the maintainer's global skill directories.

Run with Node.js 22+ from any working directory, using the actual copied skill path:

```text
node <skill-directory>/scripts/install-team.mjs --project <existing-project-directory>
node <skill-directory>/scripts/install-team.mjs --project <existing-project-directory> --check
```

The installer copies actual files, requires no symlink privileges, validates the
bundle inventory, preserves native config and rejects conflicting role/skill files
before writes. It installs the authoring skill and companions into the six project
skill discovery scopes above. It does not edit global client settings or start
workers. Read the bundled installer documentation for MiniMax's explicit launcher.

Team maintenance uses the vendored MIT `agent-team-creator` runtime. External
Apache-2.0 `internal-comms` and `security-threat-model` skills retain exact source
revision/hash receipts. The latter remains user-request-only and is not bound for
automatic use; the project `adt-security-review` provides the ordinary reviewer
workflow. Project-specific companions carry Apache-2.0 notices.

## Evidence and graph access

`tool-capabilities.json` records the tool schemas exposed during creation:
EdgeQuake, Surreal-memory, Compass graph discovery and Prometheus knowledge/wiki.
This is capability discovery, not a data inventory or connectivity test. Each
deployment still supplies authorized workspace/scope and credentials through its
native configuration. Direct SurrealDB requires a future configured Rust adapter.

Evidence collection starts from the user's bounded author/source/date scope.
Prefer a connector or exported files; use observable computer control when needed.
iMessage is macOS-specific; Windows collection uses an approved bridge or export.
The role does not send messages or authorize unrelated data collection. Raw sources,
human edits, other speakers, AI content and derived claims remain distinct.

Filesystem evidence is canonical. EdgeQuake indexes derived chunks/entities;
Surreal-memory holds appropriately scoped durable memories; SurrealDB supplies
configured application storage. Optional tools are used only when their actual
schema and destination are verified. A pending ingest receipt is not indexed data.

## Models and operation

No cross-provider model ID is forced. Roles declare tool use (and vision for the
collector), with difficulty tiers used only as intent. Twelve model-selection
results remain unbound because no verified provider catalog or price metadata was
supplied. Use each client's authorized current model, and verify capabilities before
UI collection or an explicit override. Unknown costs stay unknown.

Typical handoff: PM acceptance → architecture → collector/curator → ingestion,
MCP, retrieval and storage → skill maintenance → independent security/evaluation
→ release. A task may skip unaffected roles. No team definitions launch inference,
collect private evidence, deploy a server or publish a release automatically.

## Verification and research

Run the actual scripts documented in `scripts/portability/README.md` and
`scripts/team-bundle/README.md`. Runtime tests work without installing TypeScript;
maintainers install the pinned compiler before build/drift checks. A Windows CI
job is provided, but an unrun job is not Windows execution evidence.

Research sources and protocol/storage observations:

- [Protocol and storage](research/agent-team-protocol-storage-2026-10-26.md)
- [Skill supply, computer control and provenance](research/agent-team-skill-supply-2026-10-26.md)
- `.agent-team/authentic-digital-twin/exports/*/export-receipt.json`

The difficult limit is compatibility: current rmcp does not implement every
historical transport. The team must build and test the missing adapters; this
configuration does not make an unimplemented Rust service universally compatible.

See [delivery verification](agent-team-verification.md) for the exact checks,
review corrections, installed inventory and remaining runtime limits.
