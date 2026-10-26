# Protocol and transport acceptance contract

Research checked 2026-10-26. Refresh before implementation. No matrix entry below
claims a repository server has been built or tested.

## Protocol inventory

The official [documentation index](https://modelcontextprotocol.io/llms.txt)
publishes five date-versioned specifications. Track each separately:

| Revision | Lifecycle | Required compatibility focus |
|---|---|---|
| 2024-11-05 | Initialize handshake | stdio; legacy two-endpoint HTTP+SSE |
| 2025-03-26 | Initialize handshake | Streamable HTTP; revision-specific batching and session behavior |
| 2025-06-18 | Initialize handshake | No JSON-RPC batching; structured output and HTTP version header |
| 2025-11-25 | Initialize handshake | Updated authorization and elicitation; experimental task semantics |
| 2026-07-28 | Per-request version/capabilities; server/discover | Stateless core; modern HTTP metadata, MRTR, subscriptions |

Sources: [2024 transport](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports),
[2025-03 transport](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports),
[2025-06 changes](https://modelcontextprotocol.io/specification/2025-06-18/changelog),
[2025-11 changes](https://modelcontextprotocol.io/specification/2025-11-25/changelog),
[2026 changes](https://modelcontextprotocol.io/specification/2026-07-28/changelog).

The official [TypeScript SDK protocol guide](https://ts.sdk.modelcontextprotocol.io/v2/protocol-versions)
also mentions `2024-10-07` as a historical legacy value. Include a labeled
historical-compatibility row when an actual client requires it; do not invent a
sixth published specification or silently equate it with 2024-11-05. Draft/extension
features need separate opt-in rows and concrete schemas.

## SDK and adapters

The latest rmcp release observed was **3.4.0** on the official
[release page](https://github.com/modelcontextprotocol/rust-sdk/releases).
This is a research snapshot, not a dependency pin. Check releases and registry
metadata, then pin the tested dependency and lockfile.

Current [rmcp documentation](https://github.com/modelcontextprotocol/rust-sdk)
supports modern and older protocol behavior but explicitly excludes the original
two-endpoint HTTP+SSE transport. Provide a separately tested compatibility bridge
or isolated legacy implementation for those clients. Do not resurrect an obsolete
dependency across the whole service merely to obtain that transport. Document
mapping losses and reject unsupported capabilities rather than fabricating parity.

## Test design

For each revision, test each applicable transport and actual client version.
Include capability discovery, tool listing and invocation, errors, schema behavior,
pagination, cancellation, reconnect/EOF, and concurrent requests. Add extension
rows only for implemented features. Treat authentication/principal scope as a
boundary, including cache keys and server-minted handles.

Modern HTTP uses POST-scoped JSON or SSE responses; do not impose legacy session
IDs, GET event streams, or resume semantics on it. Validate Origin and version/header
consistency. Use the actual revision's cancellation rules: HTTP stream closure and
stdio cancellation are not interchangeable. See [modern HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http).

Stdio must keep diagnostics on stderr, frame messages correctly, and shut down on
input EOF. Probe/fallback must distinguish a modern version error from an older
server lacking discovery. See [modern stdio](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio).

An acceptance record contains: application commit, rmcp version, client executable
and version, OS, protocol, transport/adapter, auth mode, exercised capabilities,
commands, sanitized transcript location, result, and known limitations. Do not put
personal source text or credentials into compatibility receipts.
