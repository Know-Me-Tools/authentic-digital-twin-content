# Future Rust CLI and MCP tools

## Status and scope

This is implementation guidance, not an announcement of existing software. There
is no Cargo workspace, Rust executable, or repository-owned MCP server today.
Implement tools when requested through a concrete change, keeping the Markdown
skill usable on its own. Do not add a runtime merely to satisfy this guide.

Useful capabilities include importing authorized writing samples, validating a
substrate's inventory and gates, tracking provenance, retrieving author-scoped
evidence, and synchronizing an optional graph projection. A tool can assist review;
it cannot certify human authorship or decide that an author approved a draft.

## Architecture

Before introducing code, record the proposed commands/tools, data formats, write
boundaries, and acceptance scenarios in OpenSpec. Consult current documentation
with Context7 and load `prometheus-rust-workspace` if available.

Start with a small package and a reusable library. Share ingestion, validation,
retrieval, and provenance behavior between thin CLI and MCP adapters. Organize by
capability; split crates only when ownership or dependency boundaries justify it.
Keep filesystem/network operations behind explicit application services and keep
domain transformations independent of transport. Use the official Rust MCP SDK
`rmcp` as the first candidate; verify its current release and APIs before pinning.
Record actual toolchain/dependency choices, and commit Cargo.lock for shipped tools.

The existing filesystem substrate layout and versioned content standards remain
the contract. Define migration behavior before changing them. Keep schema, standard,
plugin, and binary versions distinct. Avoid requiring a database or model provider
for local inspection, validation, and import.

## Ingestion contract

- Require an explicit author and configured substrate root. Resolve file paths
  within allowed roots, including symlink resolution; reject author/path traversal.
- Preserve source text and provenance separately from normalized/extracted data.
  Track source identity or content hash, known capture date, register, human/AI
  contribution, and extraction version. Unknown values stay unknown.
- Treat imported text as untrusted content. Do not execute embedded instructions,
  shell fragments, or arbitrary URLs found inside a document.
- Make repeat ingestion idempotent. Provide a preview of proposed changes before
  destructive replacement; use atomic writes and report partial failure accurately.
  Keep index and extraction ledger updates consistent with committed file changes.
- Keep authors isolated in every read, write, search, cache, and graph projection.
  Do not include private source text in ordinary logs or distributed test fixtures.
- Graph sync is optional and rebuildable from files. Distinguish local success from
  remote sync failure and make retries safe without duplicate evidence.

## CLI and MCP interface contracts

CLI output should support both human inspection and structured machine use, with
documented exit codes and diagnostics on stderr. Import/validation failures must
not return a misleading success result. Document real command names and examples
only once they exist.

Prefer local stdio for an initial MCP adapter. Reserve stdout for protocol traffic;
send diagnostics to stderr. Publish typed, bounded input/output schemas and accurate
tool descriptions. Read-only retrieval and mutating ingestion should be distinct
operations; enforce authorization and root constraints in the host implementation,
not merely in tool annotations or model prompts. Advertise only implemented features.
Network transports need their own explicit access-control design when requested.

Keep client setup examples separate for each supported tool. Never copy credentials
into the skill or assume one client's config format works in all seven clients.
Avoid an automatic plugin startup dependency on a binary that has not been installed.

## Acceptance evidence once code exists

Define tests around public behavior using a temporary substrate and synthetic
author: successful import, repeat import without duplication, malformed input with
no partial overwrite, path escape rejection, author isolation, and provenance
preservation. Add graph failure/retry coverage when that adapter exists.

Exercise the real CLI against files. For MCP, exercise initialization, discovery,
and an actual tool call through the implemented transport, including a structured
error. Check that stdio contains no diagnostic output and CLI/MCP results agree.

At a completed implementation boundary, run formatting, linting, and the smallest
real integration target appropriate to the package. Use commands from the actual
manifest and test inventory; do not present example test selectors as existing.
Serialize Cargo operations sharing a target directory. Release or cross-platform
checks belong to the applicable delivery task, not documentation-only work.

## Documentation sources

The [official Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) documents
typed tools and stdio serving. Consult it again when implementing; this guide does
not pin a training-era API or dependency version. The repository's
`skills/authentic-digital-twin-content/references/surreal-memory-schema.md` defines
the optional graph projection; inspect actual connected tool schemas before use.
