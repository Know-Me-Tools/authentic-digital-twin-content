---
name: adt-evidence-collection
description: Collect authorized author evidence from messaging, email, files, or observable computer control; preserve provenance, classify permitted use, and stage or ingest through a configured engine with receipts. Use for scoped collection tasks, not automatic mailbox sweeps.
license: Apache-2.0
compatibility: Portable instructions. Requires an available read connector, supported export, or host computer-control tool; source access may be platform-specific. No shell runtime required.
metadata:
  version: "1.0.0"
---

# Evidence collection

## Contract

Collect evidence for the named, authorized author and the user-requested purpose.
Reuse the task's existing authorization; clarify only missing source/account,
time range, author identity, permitted destination, or intended use when material.
Creating an agent definition does not authorize reading all connected accounts.
Collection does not authorize sending messages, changing source records, sharing
data, or training models.

Read [source adapters](references/source-adapters.md) and
[computer control](references/computer-control.md) for the chosen source. Discover
actual tools and read their schemas at runtime. Prefer a sufficient read connector,
then a user-provided/supported export, then observable UI access. A tool listed in
a manifest is not proof that the current client has it.

## Procedure

1. Record the collection scope and chosen adapter. Bound account, participants,
   time range, and query before requesting records. Paginate explicitly; record
   partial coverage rather than equating one page with a full history.
2. Capture source identifiers, actual sender, participants, timestamps/timezone,
   thread/reply boundaries, edit status, attachments, and acquisition method. Keep
   original bytes when available; store normalized text as a derivative with a hash
   and transformation record. A screenshot or OCR transcript is an observation,
   not an original message export.
3. Classify each item using [the evidence contract](references/evidence-contract.md).
   Distinguish the author's own writing, quotations, forwarded text, correspondents,
   AI output, edits, assessments, and uncertain attribution. Do not count received
   messages or AI prose toward author writing-sample gates.
4. Quarantine uncertain or out-of-scope items locally. Keep private data outside the
   distributable skill and repository fixtures. Give the provenance curator the
   proposed treatment, source pointers, and unresolved questions.
5. Discover the configured ingestion engine. Validate its actual schema, destination
   author scope, and supported dry-run behavior before writing. If none is implemented,
   deliver a staged evidence package; never invent an ingestion command or success.
6. Submit accepted items through explicit host operations. Preserve idempotency keys
   and ingestion receipts. A pending task is not indexed success. For EdgeQuake,
   poll its actual task API to the documented ready state. For other stores, use
   their verified completion semantics.
7. Report accepted, excluded, quarantined, duplicate, pending, and failed counts,
   source coverage, and receipt paths without reproducing private messages in logs.

## Storage and portability

Canonical evidence and author substrate remain local files under configured roots.
EdgeQuake may hold document/entity projections; surreal-memory may hold scoped
memory/relationships; direct SurrealDB may hold vectors/graph records. Discover
compatible services and namespaces, never guess a workspace. Do not automatically
send the same raw corpus to every connected graph. Store only the permitted minimum
and retain source lineage. Service availability does not confer upload permission.

The collection procedure runs on Windows, macOS, or Linux when a suitable adapter
is available. iMessage access is source-platform dependent; Windows users can use
authorized exports or an explicitly configured source host. Do not claim a native
Windows iMessage database exists. Required scripts must be Node.js `.mjs`, with
TypeScript 7 sources when maintained here; no mandatory Bash, AppleScript, or Python
hooks. Host-provided computer control is optional and uses its own documented API.

## Completion

Evidence is ready when attribution and scope are documented, raw/derived material
are separated, classification is reviewable, and ingestion status is evidenced.
The uncomfortable failure is a plausible-looking substrate built from someone
else's words; ambiguous attribution must not silently become author evidence.
