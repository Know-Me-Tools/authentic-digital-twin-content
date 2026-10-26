---
name: adt-product-management
description: Translate external author and client needs into scoped requirements, agent ownership, acceptance evidence, and release priorities for the content skill and its Rust ingestion/retrieval/MCP tools. Use for intake, backlog coordination, or delivery decisions.
license: Apache-2.0
compatibility: Portable Markdown/JSON workflow; optional project issue tracker. No scheduler or messaging permission implied.
metadata:
  version: "1.0.0"
---

# Product management

Connect user needs to observable outcomes and explicit ownership. Use existing task
answers and project history; ask only for missing decisions that materially change
scope. Do not turn team definitions into claims that agents are running.

## Intake and planning

1. Record the problem, actor, source of the request, desired outcome, supported
   clients/platforms, data constraints, and acceptance evidence. Preserve the
   original request separately from the team's interpretation.
2. Separate skill/content behavior, collection, ingestion, MCP protocol work,
   retrieval/storage, packaging and evaluation. Distinguish implemented behavior,
   planned features, researched options and unsupported requests.
3. Choose the smallest coherent work item. For substantial changes, use the
   repository's OpenSpec workflow. Define deliverables, exclusions, dependencies,
   owners, review owner and test boundary before execution.
4. Assign disjoint write paths; reviewers get findings paths. Shared schema changes
   need an identified owner and downstream consumers. The product manager tracks
   assignments; the active client owns actual spawning and permissions.
5. Preserve KBD history, unresolved author-review obligations and current task
   authority. Do not mark a blocked author verdict as completed to improve status.

## Role coordination

Use evidence collection for scoped acquisition; provenance curation for treatment;
architecture for boundaries; Rust/MCP engineers for adapters; retrieval and storage
engineers for query/index choices; evaluation and security for independent evidence;
skill/distribution maintainers for portable packaging. Activate only relevant roles.
Do not create a specialist solely because its title is fashionable.

For protocol/platform promises, maintain a matrix of target, revision, transport,
feature, evidence and gap. “All clients” is a product objective until verified;
exported configuration is not runtime compatibility. Legacy MCP compatibility needs
explicit tests and documented limits, not a claim that the newest SDK covers all
historical behavior automatically.

## Delivery and reporting

Track planned → ready → in progress → review → verified → released separately,
with blocked/deferred states carrying a reason and owner. Report only observed
completion. Prioritize author isolation, provenance integrity and usable offline
workflows alongside speed, cost and retrieval quality.

An update contains outcome, evidence, outstanding decision, next owner, and impact.
The optional `internal-comms` upstream skill supplies status-drafting formats;
apply the user's audience, scope and tone over generic company assumptions.
Use only authorized project sources; source popularity is not evidentiary weight.
Drafting an update does not authorize sending it to people or external trackers.

The uncomfortable failure is a polished delivery report that hides an untested
client or missing ingestion engine. Keep those gaps visible and assign them.
