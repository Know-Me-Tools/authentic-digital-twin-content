# Observable computer control

Use the host's actual native-app or browser-control capability. This skill supplies
the procedure; it does not bundle or claim a desktop automation engine.

1. Inventory only the authorized application/account/surface. Honor an explicit
   user-selected browser or app. Read the tool's initialization documentation.
2. Observe current UI state before choosing an action. Use accessible text or a
   verified DOM locator when available; use visible coordinates only against the
   current screenshot. Never invent selectors or reuse stale coordinates.
3. Open the scoped conversation/search result, verify sender and context, and read
   only enough surrounding messages to interpret attribution and quotations.
4. Avoid composer controls. Sending, reacting, forwarding, deleting, marking read,
   or exporting to another recipient is a separate action, not an incidental
   evidence-collection step. Note unavoidable read-state side effects of opening
   a message when the adapter cannot suppress them.
5. Save a source pointer, capture timestamp, screenshot/text correlation, viewport
   coverage, and known omissions. Treat OCR as uncertain until checked against
   visible text; preserve edits and ellipses rather than filling gaps.
6. Stop at authentication, consent, or OS permission barriers the user must resolve.
   Do not change privacy settings or bypass access controls to complete a capture.
7. Record the adapter and tool evidence. Distinguish observed UI content from a
   complete native export. Do not label UI capture exhaustive.

If Codex supplies its browser skill or computer-use tool, use that documented API.
Other clients may supply Playwright, BrowserOS, Kimi computer control, or an
equivalent MCP service. Their names and capabilities must be discovered, not
assumed portable. Prefer read connectors when they supply better message identity,
thread boundaries, and timestamps than screen scraping.

Do not download or execute a computer-control runtime automatically. Missing tools
are a capability gap; a user-provided export is often an adequate alternative.
