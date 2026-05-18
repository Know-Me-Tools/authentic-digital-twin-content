# Registration Guide — authentic-digital-twin-content

Step-by-step instructions for registering this plugin and skill in every major distribution channel. Execute these steps after Changes A and B are complete (plugin must exist on a public repo before any submission or listing).

**Current public repo:** `https://github.com/Know-Me-Tools/authentic-digital-twin-content`

---

## 1. agentskills.io ecosystem

The skill conforms to the [Agent Skills open standard](https://agentskills.io). Once on a public repo it is automatically compatible with all ~40+ agent clients that implement the standard (Claude Code, OpenCode, Cursor, Goose, Gemini CLI, Junie, GitHub Copilot, VS Code, Amp, Letta, and more) — no per-client registration required.

### Optional: contribute to the agentskills community showcase

The `agentskills/agentskills` GitHub repository maintains a community showcase of published skills.

**Steps:**

1. Check the contributing guidelines:
   ```
   https://github.com/agentskills/agentskills/blob/main/CONTRIBUTING.md
   ```
2. Fork the repo and open a PR adding this skill to the community registry or showcase (exact format depends on current guidelines — read the repo before submitting).
3. Join the Discord to announce the release and get feedback:
   ```
   https://discord.gg/MKPE9g8aUy
   ```

There is currently no automated registry API — the contribution path is a GitHub PR plus Discord announcement.

---

## 2. Anthropic official Claude Code marketplace

The Anthropic marketplace is the highest-reach distribution channel for Claude Code users. Submission is via in-app forms — **not a git commit or JSON file**.

**Prerequisites:**
- Plugin must be public on GitHub (complete ✓)
- `plugin.json` must be valid and include `name`, `description`, `version`, `author` (complete ✓)
- README must document installation and usage (complete ✓)

**Submission forms:**

| Surface | URL |
|---|---|
| Claude.ai | `https://claude.ai/settings/plugins/submit` |
| Anthropic Console | `https://platform.claude.com/plugins/submit` |

**What to fill in:**
- Plugin name: `authentic-digital-twin-content`
- Repository URL: `https://github.com/Know-Me-Tools/authentic-digital-twin-content`
- Description: paste from `plugin.json` description field
- Category: Content / Writing
- Keywords: voice, authorship, provenance, digital-twin, content-generation, brand-voice, ai-disclosure

After approval, users can install via:
```
/plugin install authentic-digital-twin-content
```

---

## 3. Community git-repo marketplaces

Anyone can host a Claude Code marketplace by publishing a `marketplace.json`. This repo already includes one at `.claude-plugin/marketplace.json`, which lists the plugin as a GitHub source.

### Host this repo as a self-contained marketplace

Users can add this repo directly as a marketplace source:

```shell
/plugin marketplace add https://github.com/Know-Me-Tools/authentic-digital-twin-content
```

Then install from it:
```shell
/plugin install authentic-digital-twin-content@know-me-tools
```

### Getting listed in third-party community marketplaces

Community marketplace maintainers aggregate plugins into curated lists. To request inclusion:

1. Search GitHub for `claude-code marketplace.json` or `claude-plugins marketplace` to find active community aggregators.
2. Open an issue or PR on the aggregator repo referencing this repo and the `marketplace.json`.
3. No standardized submission process exists yet — each aggregator sets its own criteria.

---

## 4. OpenCode

OpenCode natively reads from `.claude/skills/` (and several other paths) without any additional packaging. The plugin layout in this repo is already compatible.

**Global install (all projects):**
```bash
mkdir -p ~/.config/opencode/skills
cp -r /path/to/authentic-digital-twin-content/skills/authentic-digital-twin-content \
    ~/.config/opencode/skills/
```

**Project-local install:**
```bash
mkdir -p .claude/skills
cp -r /path/to/authentic-digital-twin-content/skills/authentic-digital-twin-content \
    .claude/skills/
```

**Recommended `opencode.json` permissions** (add to your project's `opencode.json`):
```json
{
  "permissions": {
    "skills": {
      "authentic-digital-twin-content": {
        "allow": ["Read", "Write", "Edit"]
      }
    }
  }
}
```

The skill uses `Read` to load substrate files and `Write`/`Edit` to produce annotated output. No network access or shell execution is required.

---

## 5. Generic agent clients

Because this skill conforms to the [agentskills.io specification](https://agentskills.io/specification), it works without modification in every client that implements the standard. No per-client registration is needed. Clients discover skills by reading `SKILL.md` frontmatter.

| Client | Discovery mechanism | Notes |
|---|---|---|
| Cursor | `.cursor/skills/` or project skills directory | Copy `skills/authentic-digital-twin-content/` to the discovery path |
| Goose | `.goose/skills/` | Same pattern |
| Gemini CLI | `~/.gemini/skills/` | Same pattern |
| Junie (JetBrains) | `.junie/skills/` | Same pattern |
| GitHub Copilot / VS Code | `.github/copilot/skills/` | Same pattern |
| Amp | Skills directory per Amp docs | Same pattern |

For all of these: copy or symlink `skills/authentic-digital-twin-content/` into the client's skill discovery path. The `SKILL.md` name and description drive automatic activation.

---

## 6. npm registry (optional, future)

The Claude Code plugin system supports npm as a plugin source. Publishing to npm enables `source: { "source": "npm", "package": "@know-me-tools/authentic-digital-twin-content" }` in marketplace entries.

**When this makes sense:** if the plugin grows to include scripts or executable tooling that benefits from npm dependency management. For the current documentation-and-prompt skill, npm is unnecessary overhead.

**Steps when ready:**
1. Add a `package.json` at the plugin root with `name: "@know-me-tools/authentic-digital-twin-content"` and `version` matching `plugin.json`.
2. `npm publish --access public`
3. Update `marketplace.json` plugin source to `{ "source": "npm", "package": "@know-me-tools/authentic-digital-twin-content" }`.

---

## Update checklist for each release

When bumping to a new version:

- [ ] Update `version` in `.claude-plugin/plugin.json`
- [ ] Update `metadata.version` in `skills/authentic-digital-twin-content/SKILL.md`
- [ ] Update `version` in `.claude-plugin/marketplace.json` plugin entry
- [ ] Add a `CHANGELOG.md` entry with date and changes
- [ ] Commit and push — GitHub source-based installs pick up the new commit automatically
- [ ] If submitted to the official Anthropic marketplace: re-submit via the in-app form if any metadata changed
- [ ] If published to npm: `npm publish`
