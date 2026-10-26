# Source adapters and evidence limits

Checked 2026-10-26. Refresh current official documentation before implementation.
For SDK/API usage, use Context7 resolve-library-id, then concept-scoped query-docs;
fall back to official documentation if the service is not indexed.

| Source | Preferred route | Record and limitation |
|---|---|---|
| iMessage / Messages | Existing authorized read connector; supported export or observable Messages UI on an available source host | Preserve message sender, thread, edits, reactions and attachment context. OS permission and source-host availability are separate from the portable engine. Never assume direct database access. |
| Gmail | Connected read tools or scoped Gmail API | List/search results can be snippets; fetch the full message when the task needs original wording. Preserve message/thread IDs and raw MIME when available. |
| Outlook / Microsoft 365 | Connected read tools or Microsoft Graph | Preserve message ID, headers and thread context. MIME retrieval is available through the documented message content operation; use least sufficient read permissions. |
| Telegram | Authorized Telegram Desktop export | JSON or HTML exports are supported; desktop export availability differs from web/mobile clients. Preserve IDs and attachment links. |
| WhatsApp | User-selected chat export or available authorized read connector | Exported text/media are evidence artifacts, not a restorable native backup. Dates and sender labels may require locale-aware parsing. |
| Signal | Authorized visible content or a supported source export/backup workflow | Backup/transfer support is platform/version-specific. An encrypted backup is not plaintext evidence; do not invent decryption or key access. |
| Plain text, EML, HTML, PDF, image | User-provided files within configured roots | Record source format, encoding and transformations. OCR, extraction and HTML normalization are derivatives. |
| Other messenger | Discover installed service and documented export/read capabilities | Record capability probe and gaps. Do not treat a generic messaging connector as full-history access. |

## Primary sources

- [Apple: Full Disk Access changes](https://developer.apple.com/news/?id=p6zjojqw)
  describes broad access risks and additional explicit user controls; this is not
  permission to grant access programmatically.
- [Gmail message resource](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages)
  and [get method](https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/get)
  distinguish IDs, payload, snippets, and raw message formats.
- [Microsoft Graph get message](https://learn.microsoft.com/en-us/graph/api/message-get?view=graph-rest-1.0)
  documents read permissions and MIME retrieval.
- [Telegram export](https://telegram.org/blog/export-and-more?setln=en) documents
  desktop export of chats to JSON or HTML.
- [WhatsApp chat export](https://faq.whatsapp.com/1180414079177245/) describes
  exporting a selected chat with or without media.
- [Signal restore options](https://support.signal.org/hc/en-us/articles/10079541549850-How-to-restore-your-message-history)
  and [on-device backups](https://support.signal.org/hc/en-us/articles/10066926526362-Android-On-device-Backups)
  describe supported platform paths. Verify the installed version rather than
  relying on older general backup pages that may conflict with newer instructions.
