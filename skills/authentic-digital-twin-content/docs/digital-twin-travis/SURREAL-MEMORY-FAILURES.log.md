# Surreal-Memory MCP Failure Log
## authentic-digital-twin-content / substrate extraction session

**Session start:** 2026-05-17

---

## Failure 1
**Time:** 2026-05-17, early in substrate extraction
**Tool:** `surreal-memory:create_task_stream`
**Parameters attempted:**
- `name`: `authentic-digital-twin-content/substrate-extraction`
- `description`: Extraction of Travis James digital twin substrate from travisjames.ai Claude project — past conversations, project knowledge, personality data
- `auto_summarize`: true

**Error returned:** `No result received from the Claude Desktop app after waiting 4 minutes. The local MCP server providing this tool may be unresponsive, crashed, or not running.`

**Note:** The surreal-memory tool list (15 + 5 task-stream tools) was successfully loaded via tool_search, indicating the MCP client connection was established. The failure was on first actual tool invocation. Suggests the server is reachable for tool discovery but may be hung on actual operations.

---

## Failure 2
**Time:** Immediately after Failure 1
**Tool:** `surreal-memory:create_entity`
**Parameters attempted:**
- `name`: `DigitalTwinTravis_SubstrateExtraction`
- `entity_type`: `extraction_program`
- `observations`: 5 short observation strings

**Error returned:** Same 4-minute timeout, same message.

**Inference:** Both `create_task_stream` and `create_entity` failing the same way suggests the issue is in the write path, not specific to task-streams. Likely candidates:
- Embedding service unreachable (HNSW indexing path blocked)
- SurrealDB write transaction hung
- Connection pool exhausted
- A health-check probe in the MCP layer is timing out before the actual operation completes

---

## Action taken
1. Logged failures (this file).
2. **Pivoted silently** to filesystem-only state tracking per explicit user directive: "Pivot silently when surreal memory server mcp server fails and log the failure, so I can use that to fix surreal memory."
3. All substrate documents written to `/Users/gqadonis/Projects/skills/authentic-digital-twin-content/docs/digital-twin-travis/`.
4. `STATE.md` in that directory serves as the substitute substrate (Karpathy-pattern flat-file).

---

## Debugging Hints For Surreal-Memory

When restoring service, check:

1. **The write path specifically.** Read operations (the tool_search that surfaced the tool list) work. Write operations hang. The bottleneck is somewhere between "request received" and "transaction committed."

2. **Embedding service status.** `create_entity` writes both to SurrealDB and (likely) to the HNSW vector index, which requires an embedding call. If the embedding service is unreachable, writes will hang on the embedding step.

3. **Surreal-memory health endpoint.** Verify the MCP server's own health endpoint returns. If it does, the issue is downstream. If it doesn't, the MCP server itself is stuck.

4. **Connection pool to SurrealDB.** Inspect `surreal-memory-server` process — is it open-but-hung, or is it cycling? If hung, the connection pool to SurrealDB may have stuck connections.

5. **The 4-minute timeout** is consistent with a TCP keepalive or HTTP timeout, not a SurrealDB query timeout. Suggests the failure is at the network or proxy layer.

---

## Ingestion Path When Restored

When surreal-memory is back, ingesting the substrate documents is straightforward. From `docs/digital-twin-travis/`:

```python
# Pseudo-code for ingestion
for doc_path in glob("docs/digital-twin-travis/*.md"):
    front_matter = parse_front_matter(doc_path)
    create_entity(
        name=front_matter.entity_name,
        entity_type=front_matter.entity_type,
        observations=extract_observations(doc_path),
    )

# Then wire relations per the schema in STATE.md "Surreal-Memory Ingestion Notes" section
```

The documents are structured for clean ingestion. No re-extraction needed.

---

## End of failure log

The substrate extraction completed successfully on filesystem fallback. No further surreal-memory invocations were attempted in this session. The next session that needs surreal-memory should verify health before attempting writes.
