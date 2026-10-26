# Install the companion team in another project

After installing or copying this complete skill directory, run:

```text
node <skill-directory>/scripts/install-team.mjs --project <existing-project>
node <skill-directory>/scripts/install-team.mjs --project <existing-project> --check
```

Use quotes around command-line paths containing spaces. Node.js 22 or newer is
the only runtime prerequisite. The installer reads its adjacent `tooling/` bundle;
it does not reach into the source repository, download anything, follow symlinks,
write global configuration, start agents, or collect evidence.

Companion skills are copied by their actual frontmatter names into project-local
`.agents/skills`, `.claude/skills`, `.opencode/skills`, `.kimi-code/skills`,
`.dsh/skills`, and `.minimax/skills`. Discovery depends on the client's supported
configuration. The complete original content skill is also copied there, including
its instructions, references, templates, documents, installer sources/runtime, and
tooling snapshot. Any installed copy can therefore install its companion team into
another project. The snapshot contains companions and exports, never the parent
authoring skill itself, so this does not recursively nest bundles.

Codex, Claude Code, Kimi Code, OpenCode, MiniMax Code, and DeepSeek Harness receive
native definition files from reviewed snapshots. AGENTS.md and CLAUDE.md receive
a managed routing pointer. Zed's effective existing instruction file receives the
same pointer, using its documented precedence. There is no invented Zed spawning API.

The default selected target is Codex. An existing project selection is preserved.
All six definition sets are recorded, but installation does not prove client
discovery, configured credentials, model availability, or successful invocation.
Use relevant role instructions sequentially when native delegation is unavailable.

## Preservation and conflicts

The installer validates bundle hashes, paths, and all proposed writes before
committing. Different existing role/skill files are conflicts: exit code 2 and
no project files are written. Existing native config files are retained byte for
byte and reported when bundled options differ, so hooks, provider settings, and
unrelated agents are not replaced. Instruction prose outside managed markers is
preserved. Existing symlinks are rejected instead of silently following them;
replace only deliberate instruction symlinks with ordinary files before installing.

Scoped `.gitattributes` files keep installed skill packages, native role definitions,
and the team's manifest/launcher in LF form even with Git `core.autocrlf=true`.
The complete content skill carries these rules when redistributed. Existing root
attributes are preserved; a differing scoped attributes file is a preflight conflict.
Managed routing JSON and instruction prose retain their existing newline style.

`--check` writes nothing and exits 2 if installation is incomplete or conflicts
remain. Invalid paths or bundle integrity failures exit 1. Successful and current
installations exit 0. A recovery record retains prior instruction/routing bytes
under `.agent-team/recovery/`; do not publish that project-specific data as a bundle.

## MiniMax project data

MiniMax definitions are installed under the destination `.minimax/agents`, not a
global home directory. Explicitly launch using the installed portable launcher:

```text
node .agent-team/authentic-digital-twin/launch-minimax.mjs
```

It sets `MINIMAX_DATA_DIR` to the absolute destination `.minimax` directory and
invokes `mcode` directly. If your Windows installation exposes only an npm `.cmd`
shim, supply the installed native executable or its Node entrypoint:

```text
node .agent-team/authentic-digital-twin/launch-minimax.mjs --executable <path-to-entry.mjs>
```

The launcher rejects shell wrappers and never invokes a shell. Installing a team
does not call this launcher or create an active MiniMax session. Credentials and
client installation remain local configuration responsibilities.
