# Agent team delivery verification

Checked 2026-10-26 on macOS with Node v26.5.0. This records packaging and local
tooling evidence; it does not certify Windows execution or native agent invocation.

## Delivered artifacts

- `.agent-team/authentic-digital-twin/team.json`: twelve roles with ownership,
  dependency/handoff contracts, capability intent and local skill bindings.
- Native directories for Codex, Claude Code, Kimi Code, OpenCode, MiniMax Code and
  DeepSeek Harness: twelve role definitions each, plus DeepSeek's composition
  profile. Zed receives shared instructions and skill routing.
- `skills/adt-*/`: twelve domain-specific companions. `skills/vendor/`: three
  licensed packages with provenance; two newly fetched upstream instruction skills
  and the locally vendored creator runtime. Role bindings all resolve.
- `skills/authentic-digital-twin-content/`: original authoring skill plus standalone
  TypeScript 7/Node installer and a 309-file tooling snapshot containing fifteen
  companion/vendor skills. Every installed authoring copy retains this full bundle.
- `.claude/hooks/`, `scripts/portability/`, `tests/`: Node hook replacements,
  compiler pins and integration checks. `AGENTS.md`, `CLAUDE.md`, `versions.toml`
  carry the cross-platform contract; CLAUDE.md no longer requires a symlink.
- `.github/workflows/portable-tooling.yml`: Node 22/24 on Windows/macOS/Linux.
  The workflow was configured but not executed remotely during this task.
- `openspec/changes/portable-agent-teams/`: proposal, design, requirements and
  completed task record. Earlier OpenSpec integrations remain installed for the
  seven requested clients.

## Observed checks

| Check | Result |
|---|---|
| Hook subprocess suite | 9 passed |
| Root Git line-ending regression | 1 passed |
| Final installer integration suite | 7 passed, 0 failed/skipped |
| TypeScript 7 hook output comparison | PASS |
| TypeScript 7 installer output comparison | PASS |
| Bundle integrity/drift | 309 files, 15 skills, 6 targets; no drift or obsolete files |
| Root installer final `--check` | Installed/current; no changes or conflicts |
| OpenSpec strict validation | Valid |
| Independent final artifact review | No remaining actionable findings |

The first combined run passed sixteen tests. After the Windows correction, the
final seven-test installer suite passed again, including one added test; the ten
unchanged hook/root-Git tests retain their earlier passing results. Seventeen
distinct tests cover the final implementation.

Installer coverage includes space-containing paths, configuration preservation,
idempotence, conflicts before writes, read-only check mode, tampering and path
escape rejection, and a fake-subprocess MiniMax launcher. The final test commits
an installed project to a temporary Git index and checks it out with
`core.autocrlf=true` without root attributes. Unprotected controls, root instruction
files and routing become CRLF, while protected payloads retain LF. The installer
still reports current. Copying only that installed authoring skill then successfully
installs/checks a second project.

The review found missing LF protection and an incomplete second distribution hop;
both were corrected and tested. Scoped attribute conflicts preserve existing files.
The build-source contract was clarified: typed runtime logic uses TypeScript 7;
small compiler launchers and test files may remain JavaScript modules.

## Limits and remaining implementation

Executable version probes succeeded for Codex, Claude Code, OpenCode and the Zed
editor's bundled CLI. Kimi and MiniMax were absent; DeepSeek Harness's probe failed
because of its existing pnpm version mismatch. PATH's `zed` is a different product.
See `.agent-team/authentic-digital-twin/client-probes.json` for exact observations.
No role-discovery or live delegation run was performed in any client.

The Windows Git regression runs on macOS; it is not a Windows-native execution
test. Node 22/24 and actual Windows/Linux execution await the CI matrix. Tool
schema discovery did not query private evidence or validate service connectivity.

The Rust ingestion engine, rmcp service, historical transport bridges, direct
SurrealDB adapters and retrieval evaluations are future work assigned to the team.
No server compatibility claim is made until the revision/transport/client matrix
is implemented and exercised. No private messages were collected, agents activated,
remote issues created, or release published by installation.
