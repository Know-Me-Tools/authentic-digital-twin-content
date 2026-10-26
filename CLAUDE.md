@AGENTS.md

# Portable tooling

Windows, macOS and Linux are required targets. Hooks and automation use Node.js
22+ .mjs entrypoints. Typed runtime logic uses pinned TypeScript 7 .mts sources;
small build launchers and tests may remain .mjs. No shell
scripts, Python, Unix utilities, shell expansion, or symlink privileges may be
required. Shared repository and team instructions are in AGENTS.md.

KBD uses the registered canonical runtime and current skill-pack schemas. Use typed
`prometheus kbd` commands; generated metadata is read-only. Do not enable legacy or
shadow writers. Resolve journal authority through project identity and runtime status.

<!-- prometheus-team-routing:start v1 -->
For architecture, development, maintenance, ingestion, retrieval, and database work, read `.agent-team/project-routing.json`, its selected manifest, and the relevant role instructions. Preserve existing permissions, model choices, and ownership.
Use installed native roles when the active client supports delegation. Otherwise follow the roles sequentially and disclose that limitation. Definition files do not establish live invocation or access to private evidence. Independent review requires a separate context.
Zed reads these shared instructions; its external ACP agents retain their own native settings. Parallel threads are not an automatic delegation API. MiniMax project roles require a launcher that sets MINIMAX_DATA_DIR to the project .minimax directory.
Use portable Node.js .mjs entrypoints and TypeScript 7 sources for project automation; do not add shell-script hooks. Keep credentials and private evidence outside distributed skill packages.
<!-- prometheus-team-routing:end -->
