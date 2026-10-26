# Your AI agent doesn't know where it is — and that's the real context problem

*From vibe coding to context engineering: the workspace identity layer agentic tools still lack*

---

Four repositories. One system.

`prometheus-uar` — the agent runtime. `flint-gate` — the API gateway. `prometheus-identity` — auth and credential management. `flint-pmpo` — the orchestration engine that ties them together. Every change of consequence touches at least two of them.

I switched to Zed about eight months ago. The Rust-native performance was immediately obvious — sub-second startup, no Electron overhead, no extension host consuming 200MB before I'd typed a single character. ACP was the deciding factor. The ability to connect Claude Code, Codex, and Gemini CLI to the same editor through a single open protocol — without a bespoke extension for each one — is a structural improvement over everything the VSCode ecosystem had produced for agentic workflows.

But something was broken in every session from the first week.

I'd ask an agent to propagate a trait change across the runtime and the gateway. It would start searching. It would find `src/handler.rs` in two different directories and have no reliable way to know which codebase it was operating in. I'd explain the project structure. The session would end. The next session would start cold, with no memory of that explanation.

The agent wasn't failing. The context it was handed was structurally incomplete. That's a different problem — and it took longer to name than to fix.

---

## Why Zed, and What ACP Actually Changed

A few numbers first, because they matter for what follows.

Zed's idle memory footprint with a project open has been benchmarked at roughly 222MB. VSCode's sits around 3,549MB under the same conditions — a 16× gap that compounds over a full agentic session lasting hours. Startup time runs under one second for Zed, two to five for VSCode under typical extension load. Edit latency measures at approximately 58ms per keystroke in Zed versus 97ms in VSCode.

These are not impressions. They are observed and documented differences, and they matter specifically for agentic workflows because agentic workflows are long-running. An agent session iterating on a cross-service refactor runs inside your editor for the duration. A 16× memory gap isn't just a laptop-fan problem — it is CPU time and thermal headroom that could be running analysis.

The more important advance, though, is ACP — the Agent Client Protocol. It is an open JSON-RPC standard that decouples AI agents from editors in the same way LSP decoupled language intelligence from IDEs. An ACP-connected agent runs as a separate process, communicates with the editor over stdio, and is therefore portable. Zed is the reference implementation. JetBrains announced ACP integration in early 2026. Claude Code, Codex, and Gemini CLI all speak it.

The LSP analogy holds precisely. Before LSP, every editor had to maintain its own Go compiler integration, its own Python type checker, its own Rust analyzer. After LSP, you implement the protocol once and every editor gets it. Before ACP, each AI coding agent needed a bespoke plugin for each IDE it wanted to support. After ACP, you implement the protocol once and every compatible editor gets the agent.

That is a genuine architectural advance. What ACP deliberately did not address — what it left out of scope — is what the agent is told about the workspace it's operating in.

---

## The Gap: Workspace Identity

When an ACP-connected agent initializes, it receives a project context: open files, active cursor position, a directory tree rooted at whatever folder the editor has open. What it does not receive: the name of the workspace, the names of the constituent repositories, their relationships, their task definitions, or the environment expected to be active.

For a single-repository session this is fine. For multi-repository work it breaks immediately.

Zed's current approach is "Add Folder to Project." You open UAR, then add Flint Gate, then Identity. Zed merges them into one project tree. From an agent's perspective, this produces one flat namespace — a directory tree with multiple roots that have no machine-readable identity beyond their path. The agent sees `/Users/me/Projects/prometheus-uar/src/handler.rs` and `/Users/me/Projects/flint-gate/src/handler.rs`. Both contain a `Handler` struct. Both implement a shared trait from a common library. The agent has to infer from directory path which service it's in, which build contract applies, which environment variables are expected, whether `cargo clippy --workspace` is the agreed quality gate for this root or a different command entirely.

Inference works until it doesn't. It breaks when roots use common naming conventions. It breaks when you rename a directory. It provides no machine-readable contract for task execution, so "run the tests" is an instruction the agent resolves however it can.

By late 2025, MIT Technology Review and Thoughtworks were calling this category of problem "context engineering" — defined as the systematic discipline of structuring what AI agents know, rather than relying on the model to infer it from ambient signals. The specific finding from the Thoughtworks Technology Radar: a well-crafted prompt in a poorly constructed context fails. The inverse is also true: a minimal prompt in a well-engineered context often succeeds.

At the workspace level, context engineering requires workspace identity. The agent needs to know its namespace — not infer it. That is precisely what ACP, in its current form, does not provide. And it is what Zed's multi-folder workaround, despite being genuinely useful, does not solve.

---

## What We Built

`zed-workspace` is three Rust crates and roughly 1,800 lines of code. It does not patch Zed, modify ACP, or require root access. It adds one file format, one CLI binary, and one MCP server.

### The manifest: `.zworkspace.toml`

A TOML file that can live anywhere — in a project directory, committed to a meta-repository, or globally in `~/.config/zed/workspaces/`. It defines a named workspace: its root directories and their display names, per-root settings overrides, tasks, debug launch configurations, and environment variables.

Here is an unabridged manifest for one of our production workspaces:

```toml
[workspace]
name        = "prometheus-core"
description = "UAR · Flint Gate · Identity · Mesh"
icon        = "🔥"

[[roots]]
path = "~/Projects/prometheus-uar"
name = "UAR"

[[roots.tasks]]
label   = "test UAR"
command = "cargo test -p uar"

[[roots]]
path = "~/Projects/flint-gate"
name = "Flint Gate"

[zed]
theme          = "One Dark"
tab_size       = 4
format_on_save = "on"

[[tasks]]
label   = "cargo clippy (all)"
command = "cargo clippy --workspace -- -D warnings"
cwd     = "~/Projects/prometheus-uar"

[env]
RUST_LOG = "debug"

[mcp]
auto_start = true
```

This file is version-controlled. The workspace definition travels with the team. Per-root task definitions (`[[roots.tasks]]`) scope specific commands to specific services; workspace-level tasks (`[[tasks]]`) apply everywhere.

### The launcher: `zw`

`zw open .` does four things in sequence: resolves all root paths, writes (deep-merges — it never overwrites existing content) `.zed/settings.json`, `tasks.json`, and `debug.json` into every root that exists on disk, injects a `context_servers` stanza into each root's settings that tells Zed to launch `zed-workspace-mcp` over stdio when the session opens, then calls `zed --new-window` with all roots as arguments.

The manifest is the source of truth. The `.zed/` files are the materialization.

Three commands to learn:

```bash
zw init        # scaffold a manifest in the current directory
zw check .     # validate without opening Zed
zw open .      # materialize config and open Zed
```

### The context server: `zed-workspace-mcp`

An MCP server that Zed spawns automatically when the session opens — its lifecycle managed by Zed, not by a background daemon. It exposes six tools:

| Tool | Function |
|---|---|
| `workspace_info` | Full manifest: name, roots, task count, env keys |
| `list_roots` | Resolved absolute paths for all roots |
| `find_files` | Cross-root glob search, respects `.gitignore` |
| `read_file` | File content, path-jailed to declared roots |
| `grep` | Cross-root regex search, skips binary files |
| `list_tasks` | Workspace task definitions |

Two implementation details worth naming explicitly. The `read_file` tool canonicalizes the requested path and verifies it falls within a declared root before reading. Requests for files outside declared roots return "access denied" — not a silent serve of whatever path was provided. The `grep` tool applies a NUL-byte heuristic to skip binary files and caps maximum file size before reading. These are the kind of decisions that separate production tooling from a proof of concept.

The server is also not Zed-specific. Any MCP-capable client can use it: Claude Code via `~/.claude/settings.json`, OpenCode via `.opencode/opencode.json`, Cursor, Windsurf, and Codex via `.mcp.json`. The included `setup-zed-workspace` skill automates the wiring scripts for all of them. One install, one manifest, consistent workspace context for every agent in your stack — regardless of which editor they're running inside.

---

## A Session That Made the Value Clear

Here is the task that made this project worth writing about.

**The goal:** verify that a new `PolicyScope` enum added to the UAR crate had been propagated consistently to the Flint Gate service — specifically that every `impl AuthorizationHandler` across both codebases was handling the new variant exhaustively.

**Without `zed-workspace-mcp`:**

The agent opened in a flat multi-root session. It searched for `AuthorizationHandler`. It found implementations in both UAR and Flint Gate — four total. When it attempted to check exhaustiveness of the match arms on `PolicyScope`, it had to construct file paths by inspecting the directory structure and request content by absolute path. Partway through, it asked: "Which of these is the gateway-facing implementation?" That question contained the entire problem. The answer existed in the manifest — the Flint Gate root is the gateway service, UAR is the runtime — and required zero explanation. But the agent had no access to the manifest. It had only directory names.

That session required three clarifying exchanges before the agent had enough context to produce a useful answer.

**With `zed-workspace-mcp`:**

The agent called `workspace_info` on session open — the server surfaces this as the recommended first call in its `instructions` field:

```json
{
  "name": "prometheus-core",
  "roots": [
    { "name": "UAR",        "path": "/Users/gqadonis/Projects/prometheus-uar", "exists": true },
    { "name": "Flint Gate", "path": "/Users/gqadonis/Projects/flint-gate",     "exists": true }
  ],
  "task_count": 4,
  "env_keys": ["RUST_LOG"]
}
```

Named roots. No ambiguity about what each directory contains.

Next call:

```
grep(pattern: "impl AuthorizationHandler", file_glob: "**/*.rs")
```

Results prefixed with named roots:

```
UAR:src/policy/auth.rs:18:        impl AuthorizationHandler for PolicyEngine {
UAR:src/policy/cedar.rs:44:       impl AuthorizationHandler for CedarAdapter {
Flint Gate:src/middleware/auth.rs:31: impl AuthorizationHandler for GatewayAuth {
Flint Gate:src/grpc/auth.rs:67:   impl AuthorizationHandler for GrpcAuthLayer {
```

The agent then called `read_file("UAR:src/policy/auth.rs")` and `read_file("Flint Gate:src/middleware/auth.rs")` directly, using the `RootName:relative/path` addressing the server provides. It identified the missing variant in the gateway implementation in one pass.

No clarifying questions. No re-explanation of project structure. Zero re-orientation.

The agent was not smarter. It was better equipped. Context that is declared performs differently from context that must be inferred.

---

## From Vibe Coding to Context Engineering to Workspace Identity

Andrej Karpathy coined "vibe coding" in February 2025. The term named something real: the experience of describing intent to an AI and accepting what came back, without necessarily understanding the full implementation. For prototypes, for exploration, for the long tail of small tools that previously weren't worth the time to build — it worked. The unlocking was genuine.

The cost became visible within months. Code quality problems. Maintainability problems. Developers building systems they couldn't fully explain. These were not edge cases. By late 2025, Thoughtworks and MIT Technology Review were describing the next phase as "context engineering" — not vibes, but structure. The precise formulation from the Thoughtworks Technology Radar: *the shift from a loose, vibes-based approach has given way to a systematic approach to managing how AI systems process context.*

The asymmetry that makes this matter: a well-crafted prompt in a poorly engineered context fails. A minimal prompt in a well-engineered context often succeeds. The prompt is tactics. The context is infrastructure.

The Anthropic 2026 Agentic Coding Trends Report maps where this trajectory leads. The prediction that matters directly for workspace identity: multi-agent systems replacing single-agent workflows, with organizations adopting coordinated teams of specialized agents — planner, architect, implementer, tester, reviewer — operating across separate context windows in parallel. "Organizations in 2026 will be able to harness multiple agents acting together to handle task complexity that was difficult to imagine just a year ago."

When you have five agents working in parallel across a four-repository workspace, workspace identity is not a developer convenience. It is a coordination primitive. Without it, agents operate in the same undifferentiated namespace with no structural boundaries between their domains. They can't be told "your domain is UAR, the implementer's domain is Flint Gate" because there is no machine-readable definition of what UAR and Flint Gate are.

Gartner projects 33% of enterprise software will feature agentic AI by 2028. The teams performing at that scale will not be distinguished by model capability. They will be distinguished by how precisely they have structured the context their agents operate in. Workspace identity — the named, versioned, machine-readable definition of which repositories exist, what they are called, and what contracts govern them — is foundational to that structure.

`.zworkspace.toml` is an early answer to that need. It will not be the last.

---

## What's Next

The infrastructure for agent portability exists. ACP is stable, widely adopted, and architecturally sound. The infrastructure for workspace identity does not yet exist at the protocol level — there is no workspace primitive in ACP's `initialize` handshake, no standard for named roots in any current editor-agent protocol.

What we built is a working implementation of that layer: a file format that names and structures a multi-repository workspace, a launcher that materializes it into Zed's per-root configuration, and an MCP server that hands every ACP and MCP-capable agent in your stack a precise, structured understanding of where it is operating.

The project is open source, MIT-licensed, and available now:

```bash
git clone https://github.com/GQAdonis/zed-workspace
cd zed-workspace && ./install.sh
```

Contributions are welcome — especially to the manifest format itself, which is intentionally minimal. There is more to encode at the workspace identity layer than one project's use cases can anticipate.

Software development is becoming a coordination problem between agents. The agents are ready. The context infrastructure is catching up.

---

*Travis James is the founder and CTO of Prometheus Agentic Growth Solutions, building sovereign AI infrastructure and agentic orchestration systems. He writes about the architecture of intelligent systems at [travisjames.ai](https://travisjames.ai).*
