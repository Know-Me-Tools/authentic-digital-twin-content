---
name: adt-mcp-compatibility
description: >-
  Design, implement, and verify Rust MCP tools for authentic digital twin content.
  Use for rmcp upgrades, stdio and Streamable HTTP servers, legacy HTTP+SSE bridges,
  protocol negotiation, typed tool schemas, and cross-client compatibility matrices.
license: Apache-2.0
compatibility: Requires a Rust toolchain for implementation. Documentation works without a server. Use Node.js 22+ .mjs tooling and TypeScript 7 sources for portable automation; no shell hooks.
metadata:
  version: "1.0.0"
  author: Know Me Tools
---

# MCP compatibility engineering

Read [the compatibility contract](references/compatibility.md). This skill gives
engineering instructions; it does not install or certify a running server.

1. Inspect the actual Cargo manifest, lockfile, existing protocol matrix, and
   selected clients. Query Context7 for the official `modelcontextprotocol/rust-sdk`
   after resolving its library ID. Check official releases before selecting rmcp.
   Record SDK version, source revision, protocol revision, transport, and client
   version separately. Never infer a model from its client name.
2. Enumerate published protocol revisions from the official documentation index;
   keep drafts and historical SDK-only values separate. Plan explicit handling
   for every requested revision. Unknown revisions must produce the version's
   specified negotiation/error behavior, never a silent reinterpretation.
3. Share domain/application services between CLI and MCP adapters. Expose bounded
   typed schemas, useful tool descriptions, explicit read/write operations, and
   provenance-bearing results. Host code enforces authorization and author scope.
4. Implement current stdio and Streamable HTTP paths, then the requested legacy
   adapter where needed. A streaming response is not proof of legacy SSE support.
   Do not advertise capabilities that lack implementation and tests.
5. At the implementation boundary, test real processes and HTTP connections using
   synthetic author data. Cover discovery/initialization, list and call, structured
   failure, cancellation, unsupported revisions, disconnect, and author isolation.
   Repeat against the actual clients selected for release.
6. Report each matrix cell as verified, failed, or untested with the command and
   result. An SDK's upstream claim does not certify this application's compatibility.

Keep stdout exclusively for stdio protocol messages. Avoid shell launch wrappers;
pass executable and argument arrays to process APIs. Preserve EOF shutdown on
Windows as well as POSIX. Keep credentials and private evidence out of fixtures.

The uncomfortable thing: broad backward compatibility costs additional adapters
and regression fixtures; installing the newest SDK cannot remove that work.
