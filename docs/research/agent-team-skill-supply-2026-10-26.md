# Agent team skill supply and evidence research

Research date: 2026-10-26. Scope: reusable evidence/provenance/product/evaluation/
security instructions, primary-source research, and licensed project-local skills.
No messages, email, private author data, or graph contents were collected.

## Role recommendations

The five requested roles benefit from additional responsibility boundaries. This
is a practical coverage map, not a claim to enumerate every possible profession.

| Role | Concrete responsibility | Separation that matters |
|---|---|---|
| Evidence collector | Scoped connector/export/UI acquisition with identity and source receipts | Capturing words does not decide their allowed use |
| Provenance/substrate curator | Attribution, source lineage, register eligibility, author approval state | A model summary is not primary author evidence |
| Product manager | External needs, acceptance criteria, priorities and internal assignments | Definition/export is distinct from running agents |
| Systems architect | Domain boundaries, contracts, storage/protocol tradeoffs | Shared application behavior avoids divergent CLI/MCP semantics |
| Rust ingestion engineer | Parsing, idempotency, canonical writes, CLI behavior | Owns ingestion transaction behavior, not just transport |
| MCP server engineer | Version/transport negotiation, typed tools and client compatibility | Latest SDK support is not universal historical conformance |
| RAG/GraphRAG expert | Retrieval strategy and indexing/query experiments | Graph relationships and vector similarity answer different query classes |
| SurrealDB engineer | Embedded/remote configuration, graph/vector storage, migrations | Operational database mechanics are separate from relevance evaluation |
| Retrieval/evaluation engineer | Held-out scenarios, source faithfulness, isolation and cost evidence | Builder self-scoring is not independent review |
| Security/privacy reviewer | Trust boundaries, injection, tenant leakage, destination permissions | Source text cannot confer host write authority |
| Skill maintainer | Reusable workflow contracts, progressive context, versioned examples | Authoring a skill is separate from implementing its engine |
| Portability/release engineer | Windows/macOS/Linux scripts, bundles, client definitions and receipts | A Node-based script still needs real Windows evidence |

These specialties can be roles in one team rather than permanent concurrent agents.
Activate only the roles with concrete work and disjoint output ownership.

## Evidence sources and capabilities

Apple's October 2026 [Full Disk Access notice](https://developer.apple.com/news/?id=p6zjojqw)
reinforces explicit user control over broad file/mail/message access. The collector
therefore uses an existing authorized connector, an export, or an observable UI
adapter; it does not install privilege bypasses. This does not create a native
Windows iMessage source. A Windows engine can process an authorized source-host
export without having the Apple app installed.

[Gmail's message resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages)
distinguishes snippets, parsed payloads, IDs and raw message representations.
[Microsoft Graph](https://learn.microsoft.com/en-us/graph/api/message-get?view=graph-rest-1.0)
supports message/MIME reads with documented read permissions. Read-tool output must
be interpreted according to its actual schema; a search snippet is not a complete
message. Context7 resolution/query was performed for Gmail; it returned current
MCP get-message/get-thread documentation, which must not be confused with REST
parameter names.

[Telegram Desktop](https://telegram.org/blog/export-and-more?setln=en) offers JSON
and HTML chat export. [WhatsApp](https://faq.whatsapp.com/1180414079177245/) provides
selected-chat export. [Signal's current restore guidance](https://support.signal.org/hc/en-us/articles/10079541549850-How-to-restore-your-message-history)
is platform-specific; encrypted backup support is not a general plaintext export
API. The skill requires fresh capability checks and preserves capture omissions.

Computer-control instructions are authored as a portable adapter procedure in
`skills/adt-evidence-collection/references/computer-control.md`. They bind to the
current host's actual tools and observable UI state. They do not grant credentials,
invent an automation API, or imply availability in all clients.

## Provenance, security and evaluation grounding

[W3C PROV](https://www.w3.org/TR/prov-overview/) provides entity/activity/agent and
derivation concepts. The proposed evidence envelope uses these distinctions without
claiming to implement a PROV serialization. Raw input, derived text, inferred
relationships and human certification remain separate.

[OWASP prompt-injection guidance](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
informs the source-data/host-action boundary. A message cannot authorize its own
tool execution or export. The security role requires a concrete affected path,
trigger and impact rather than generic warnings.

[Ragas](https://arxiv.org/abs/2309.15217) motivates separately assessing retrieved
context and faithful generation. [Microsoft GraphRAG](https://microsoft.github.io/graphrag/)
motivates relational and global-summary test categories. The evaluation skill adds
project-specific isolation, source lineage and operational gates; these are design
requirements, not claims made by those papers.

## Installed skills inspected

| Existing skill | Finding and decision |
|---|---|
| Codex bundled browser | Depends on its private host runtime and exact browser API. Read for capability understanding; not redistributed or treated as a portable engine. Use the installed native skill when that host requires it. |
| clean-architecture | MIT metadata and useful dependency-boundary guidance; examples span unrelated platforms. Avoid duplicating the whole routing stack; project Rust architecture guidance is supplied separately. |
| prometheus-rust-workspace | MIT router; delegates to skills which may not be installed elsewhere. Do not make a global installation a hidden dependency of the portable package. |
| bdd-testing | Deprecated redirect to bdd-cucumber-js. Not copied as if it were an implementation. Evaluation uses actual project test entry points. |
| skill-installer | Helpful acquisition workflow, but its installation helpers use Python and global-client destinations by default. Downloaded pinned documentation packages directly instead; no helper runtime is included. |

## New companion skills

All five are original project instructions under Apache-2.0, with a local copy of
LICENSE so the folders can be packaged independently. They require no shell hooks.

| ID | Canonical directory | Typical role |
|---|---|---|
| adt-evidence-collection | `skills/adt-evidence-collection/` | Evidence collector |
| adt-provenance-curator | `skills/adt-provenance-curator/` | Substrate/provenance curator |
| adt-product-management | `skills/adt-product-management/` | Product manager |
| adt-retrieval-evaluation | `skills/adt-retrieval-evaluation/` | Independent evaluation/QA |
| adt-security-review | `skills/adt-security-review/` | Security/privacy review |

## Downloaded upstream packages

Downloaded the entire documentation-only skill directories directly from their
official repositories at exact revisions. No downloaded code was executed. Each
package retains its upstream LICENSE.txt and an `UPSTREAM.json` containing source
URLs, revision, acquisition date and SHA-256 for every original file.

| Skill | Upstream revision | Local package | Use |
|---|---|---|---|
| internal-comms | anthropics/skills `dbd4588f9e1033efb41dad4bef2f7947c8993d44` | `skills/vendor/internal-comms/` | Optional status/FAQ drafting formats for PM; 6 original files |
| security-threat-model | openai/skills `49f948faa9258a0c61caceaf225e179651397431` | `skills/vendor/security-threat-model/` | Optional explicit-user threat modeling; 5 original files |

Both packages declare Apache-2.0 in their bundled license. Original upstream files
are unmodified. No Python, Bash, or executable helper is present in these packages.
`security-threat-model` explicitly restricts activation to a user's threat-model
request; preserve that restriction and do not auto-preload it for a general review.
`internal-comms` has generic company assumptions and source-gathering suggestions;
task scope and the user's communication preferences override them. Drafting does
not authorize sending messages. Popularity or executive authorship is not evidence
quality for an author substrate.

Source pages:
[internal-comms](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/internal-comms),
[security-threat-model](https://github.com/openai/skills/tree/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/security-threat-model).

## Distribution and verification limits

Role bindings must resolve these canonical local packages or bundled copies; a
symlink to a developer's global skills directory is insufficient. The distribution
maintainer owns copying companions into the standalone content-skill bundle and
installing client discovery. Retain upstream receipts and licenses when copying.

This research does not certify a live connector, native desktop control, an
ingestion engine, graph credentials, or Windows execution. The uncomfortable gap
is that complete instructions can still run in a client with no source adapter;
report that capability gap and offer a supported export rather than pretending the
team definitions installed access.
