---
name: adt-team-operations
description: Route digital-twin development tasks to the appropriate specialist roles and coordinate ownership, handoffs and independent reviews across supported clients.
license: Apache-2.0
metadata:
  version: "1.0.0"
---

# Digital-twin team operations

Read `.agent-team/project-routing.json` and the selected team's `team.json` when
installed. Otherwise locate the bundled `tooling/team/team.json` beside the
authoring skill. Prefer one relevant implementer for a bounded task; activate
other specialists only for concrete separable responsibilities.

The product-manager owns intake, priorities, acceptance and assignments. The
systems-architect owns cross-component contracts. Evidence-collector and
provenance-curator prepare auditable authorized inputs. Ingestion, MCP, retrieval
and database engineers own their modules. Skill-maintainer owns instructions and
standards. Security-reviewer and evaluation-engineer independently examine the
completed implementation. Release-engineer owns portable delivery.

Before parallel work, assign disjoint paths and identify shared-file ownership.
Portable `owns` and dependency arrays are coordination agreements, not OS security
or a process scheduler. A handoff includes task ID, author/source scope, input
artifact hashes or paths, acceptance criteria, findings, outputs and next owner.
Private source content stays out of generic team logs and public issues.

Use the client's actual native delegation API when available. Otherwise execute
the relevant role instructions sequentially and disclose the limitation. Never
call review independent if it shares the builder's reasoning context. Do not
start another agent loop or assume definitions launch workers.

Model policy tiers express task difficulty, not configured model IDs. Use each
client's authorized current model until its provider, tools/vision capability,
availability and price constraints have been verified. Do not pretend a common
model ID works across all clients or guess unknown pricing.

For team definition changes, use the bundled agent-team-creator runtime and
validate/export into fresh proposal directories before installing. Preserve
native configuration and upstream invocation restrictions. For operating work,
record assignments as project artifacts rather than creating unsolicited issues
or sending messages to other chats.

Source contract: original project guidance, Apache-2.0, 2026-10-26; compatible with
the bundled Prometheus team schema, not a declaration of UAR deployment.
