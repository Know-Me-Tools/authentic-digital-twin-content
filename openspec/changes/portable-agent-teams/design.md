# Design

One portable team manifest defines twelve specialists and four workstreams.
Native adapters emit Codex, Claude, Kimi, OpenCode, MiniMax and DeepSeek artifacts;
Zed uses AGENTS.md and .agents/skills, with ACP retaining external agent settings.
The installer preserves existing configs and reports differences. MiniMax's
user-data directory is an explicit installation target, not an invented project
agent location. Model choices inherit configured native sessions until verified
provider/model metadata justifies explicit bindings.

Keep the original authoring skill independently usable. Its tooling bundle carries
the team manifest, adapter runtime, native exports, companion skills and portable
installer, so a standalone copy retains the optional tooling. Third-party skills
retain licenses, pinned provenance and invocation restrictions.

Node 22+ runs shipped .mjs without a compiler. Maintainers build .mts with exact
TypeScript 7 pins. Hooks must not require Bash, Python, PowerShell, symlink support,
Unix permissions or shell environment interpolation. Windows CI is an explicit
qualification boundary; simulated paths on macOS are not Windows runtime proof.

The MCP specialist owns a version/feature/transport matrix, including legacy
HTTP+SSE and current Streamable HTTP and stdio. Compatibility remains unverified
until actual tests run. Evidence storage remains author scoped and traceable;
collection instructions do not authorize unsolicited access or transmission.
