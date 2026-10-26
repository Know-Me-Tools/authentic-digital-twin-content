# 08 — Domain Anchors

> **Entity type:** `DomainFluency`
> **Source:** Topical concentration analysis across all conversations.
> **Use:** The subjects Travis is fluent in and the vocabulary that comes naturally within each. When generated content needs to land in one of these domains, this is the substrate that grounds it.

A digital twin without domain anchors produces voice-correct but topic-shallow output. These anchors are what make Travis's writing *informed*, not just *styled*.

---

## Anchor 1 — Rust Systems Programming

### Comfortable concepts (used without explanation)
- `async fn` / state machines / `.await` yield points
- `Arc<T>`, `Arc::clone` placement discipline (clone at boundary, not in hot path)
- `MaybeUninit`, `mem::take`, `std::mem::take` for state transitions
- `Pin`, `Box::pin()`, dyn-dispatch overhead vs state machine size
- `tokio` runtime, `parking_lot::Mutex`, `DashMap`
- Trait objects vs generics, monomorphization
- Crate workspace structure, feature flags
- `serde` derive, deserialization budgets
- `#[cold]`, `#[inline(never)]`, `#[repr(transparent)]`
- Custom global allocators (`mimalloc`, `jemalloc`)
- `slice::split_at_unchecked` for hot paths
- Axum 0.8 (preferred) extractors, middleware stack, SSE streaming
- `async_stream::stream!` macro
- `sqlx` query macros, Postgres 17, `LISTEN/NOTIFY`

### Travis-coined or Travis-favored patterns
- "yield-point compounding" — state machine size growth across nested async
- "boundary-clone discipline" — Arc cloning only at handler/task boundaries
- "thread-local staging buffer" — for zero-alloc hot paths

### Active projects in this domain
- `universal-agent-runtime` (UAR) — main Rust workspace, ~10+ crates
- `candle-vllm` (god-mode branch) — inference server with parking-lot scheduler
- `turboquant-rs` — KV cache compression
- `surreal-memory-server` — 42 MCP tools over SurrealDB + HNSW
- `prometheus-knowledge` — 8-crate Karpathy-pattern KB workspace
- `flint-gate` — Axum 0.8 API gateway
- `flint-realtime` — 6-channel WebSocket server
- `pbm-*` (Prometheus Banking Mesh) crates — `pbm-identity`, `pbm-vault`, `pbm-ory-bridge`, `pbm-gateway`

---

## Anchor 2 — LLM Inference Architecture

### Concepts
- Dense transformer vs hybrid SSM/attention (Mamba, Jamba, RWKV-7, Falcon-H1, Zamba2)
- KV cache: bytes saved, compression ratios, prefill vs decode
- TurboQuant (ICLR 2026), 3-bit SIMD FWHT, ~9.8× compression
- Q4_K_M, Q5_K_M GGUF quantization
- ISQ (in-situ quantization)
- Tokens-per-second, time-to-first-token, throughput vs latency
- Streaming via SSE, AG-UI token events
- Prompt caching (Anthropic specifically), `cache_control` blocks
- Extended thinking, structured outputs
- Tool calling normalization across providers
- BYOK (bring your own key) economics

### Travis-specific positions
- Dense transformer architecture is the right substrate for current frontier models; hybrid is for prosumer-hardware long-context multi-session use cases
- TurboQuant applies meaningfully only to dense models — Qwen3.5's GDN architecture dilutes its effect
- 1B model hard ceilings: 3-4 reasoning steps max, intent routing OK, regulated-domain knowledge density not OK
- $900 1B/100B-token from-scratch experiment recommended before $15K 3B run

### Active projects
- `candle-vllm` (god-mode branch)
- `mistral.rs` integration (Gemma 4, ISQ)
- `liter-llm` (142+ providers, OpenAI-compatible)
- Native `uar-anthropic` driver (Messages API direct)
- `uar-tool-normalizer` (Claude Sonnet 4.6 shim for any backend)

---

## Anchor 3 — Agent Orchestration Protocols

### Standards (Travis implements, doesn't invent)
- **A2A** (Google) — 17.7k stars, Linux Foundation, agent-to-agent
- **AG-UI** (CopilotKit + Oracle Agent Spec) — UI streaming protocol
- **A2UI** (Google) — v0.8 stable, agent-to-UI rendering
- **MCP** (Anthropic) — Model Context Protocol, the integration substrate
- **ACP** (Zed) — Agent Client Protocol, editor-portability layer
- **PMPO** — Travis's own cognitive loop (Spec → Plan → Execute → Reflect + Compile → Evaluate → Optimize → Promote)

### Travis-specific architecture positions
- UAR is a *protocol implementer*, not a protocol inventor
- A2A handles agent-to-agent; AG-UI handles agent-to-UI; UAR sits above both
- The previous AAP/APP designs are deprecated — those borrowed AT Protocol patterns inappropriately
- did:uar uses W3C DID Core 1.0 with secp256k1, compatible with `did:key` resolvers
- Federated registry on SurrealDB replaces centralized plc.directory

### Active projects
- UAR's A2A implementation in `uar/api/a2a`
- AG-UI event streaming in handlers and SSE endpoints
- A2UI rendering integration with Flint, OpenFang
- MCP server: `surreal-memory-server` (42 tools), `prometheus-knowledge` MCP

---

## Anchor 4 — Identity & Governance

### Stack components
- **Ory Kratos** — identity management (registration, recovery, MFA, WebAuthn)
- **Ory Hydra** — OAuth2/OIDC server, DID-as-subject claim injection
- **Ory Oathkeeper** — identity-aware API gateway
- **Cedar** — AWS policy engine, PDP/PEP architecture
- **W3C DID Core 1.0** — decentralized identifiers
- **W3C VCs** — verifiable credentials (Kaia issues these under `did:kaia:`)

### DID hierarchy
- `did:uar:` — agents and runtime identity
- `did:prometheus:` — platform-level identity (people, services)
- `did:kaia:` — certification issuer for verifiable credentials
- `did:key:` — base interoperability layer

### Cedar policy patterns
- Intent-Based Access Control (IBAC) — policies generated from PMPO plan output
- Task-scoped policy teardown after execution
- Cedar budget policies bounding retry loops
- Cedar action policies governing tool calls

### Active projects
- `prometheus-identity-access-standard` (HTML spec in project knowledge)
- `pbm-identity` (Banking Mesh identity crate)
- `kaia` MVP (CLI architecture, market viability documented)
- Identity schema generator with Kratos integration

---

## Anchor 5 — Community Banking & Financial Services

### Regulatory landscape (working knowledge)
- **CFPB Section 1033** — Open Banking rule finalized 2024
- **FFIEC** compliance — multi-agency examination framework
- **BIAN** — Banking Industry Architecture Network reference model
- **FIS Global** — community-bank core system vendor (the Citizens National incumbent)
- **Jack Henry** — alternative community-bank core
- Federation: account aggregation, payment initiation, identity verification

### Market structure
- ~4,500 community banks in US
- Capture math: 1% at $5K/mo = $2.7M ARR; 2% = $5.4M ARR
- FIS/Jack Henry conversion cycle creating CIO anxiety windows
- ICBA, state banking associations as channel partners

### Named relationships in this space
- **Neil Henry** — President, Citizens National Bank (Meridian, MS)
- CIO at CNB — overwhelmed by FIS conversion, structural blocker
- **Nandish Hulikantimath** — Bank of America (former Mark Cuban/Yahoo colleague)

### Travis's product positioning
- Prometheus Banking Mesh: BIAN-compliant, AI-native, customer-permissioned data layer
- Operates *outside* the bank perimeter — zero CIO involvement required
- Phase 1: 25-customer no-IT-lift pilot
- Phase 2: bank-branded customer experience
- Phase 3 (optional): core integration

---

## Anchor 6 — Healthcare Administration

### Working knowledge
- Healthcare workflow gaps (administrative time burden, fragmented information)
- HIPAA-adjacent privacy and data residency
- The specific role of an RN/MSN in administration (Brittney Attaway is the customer voice)
- Mississippi state public health (TribeHealth's COVID tracking-and-tracing deployment)

### Product positioning
- TribeHealth.ai: healthcare AI applications
- KnowMe healthcare features: targeting administrative professionals
- Ethics-first framing — "AI for care"

---

## Anchor 7 — Brand & Design Systems

### Travis's brand vocabulary
- **Sacred Fire** (#CE3012), **Ember** (#E96A12), **Gold** (#F49E12) — Prometheus/travisjames.ai fire palette
- **Muted Ember** (#E04E28), bright **Ember** (#FF6A3D) — accent variations
- **Deep Charcoal** (#0B0F14), **Mist** (#E8EDF3) — neutral foundation
- **Neural Cyan** (#00C2DC) — AI-state only signaling
- **Cinzel** (wordmark), **Syne** (headings), **DM Sans** (body), **JetBrains Mono** (technical) — type stack
- **Flat 2.0** — zero borders/lines, surfaces differentiated by background color, no ghost/outline buttons
- **WCAG compliance** — non-negotiable

### Other brand systems Travis maintains
- **Flint** — IBM Plex Sans/Mono, ember+spark accents
- **Logos** — Cinzel + IBM Plex
- **San Saba Royalty** — distinct branding with own template
- **HotSeaters** — Zen Dots/Michroma/Montserrat/Syncopate, navy/teal/tan/red
- **KnowMe** — minimalist mark, monogram-based

### Design principles
- Single-accent restraint
- Architectural precision (deliberate spacing, structural grids)
- "Polished concrete, not construction site"
- Warmth + technicality (not cold, not raw)

---

## Anchor 8 — Methodology (KDD, PMPO, Sycophancy Correction)

### KDD — Knowledge-Driven Development
- Goal: eliminate translation loss between domain experts and software
- Implementation: Dify KBs + Surreal Memory + Claude Code + Claude Cowork
- Every coding session starts with KB context, ends with KB ingestion
- Karpathy-style flat-file knowledge base pattern

### PMPO — Prometheus Meta-Prompting Orchestration
- v1: Plan → Monitor → Plan → Optimize (legacy framing)
- v2: Task Loop (Spec → Plan → Execute → Reflect) + Evolution Loop (Compile → Evaluate → Optimize → Promote)
- Critic context isolation: artifact-only, no generation history
- Phase discipline: hard boundaries, no cross-phase output

### Sycophancy correction skill
- 8 canonical patterns (S-01 through S-08)
- Three correction modes: `detect_only`, `rewrite`, `full_restructure`
- S-04 (Self-Rationalization), S-08 (Reflect Phase Inversion) most critical for PMPO
- Cedar-governed promotion gating

---

## Anchor 9 — Frontend & Mobile Stack

### Web (preferred)
- React 19, Vite 7+ (preference is Vite 8)
- TanStack Router, TanStack Query, TanStack Table
- Zustand 5 for state
- shadcn/ui + Tailwind 4
- TSX (.tsx) always, never JSX (.jsx)

### Mobile / Desktop
- Tauri 2.10.3 for desktop
- Flutter for mobile via `flutter_rust_bridge` v2
- `gen_ui_core` Rust crate as shared substrate (Flutter FFI + Tauri React)
- Riverpod for Flutter state

### Deprecated / avoided
- Material UI (too opinionated)
- Plain Bootstrap
- Vue (used, but not preferred)
- Webpack (Vite preferred)

---

## Anchor 10 — Deployment & Operations

### Stack
- K3s (single-node, sometimes multi-node)
- ArgoCD v3+ via Envoy Gateway
- GKE, AKS as managed K8s
- Azure File Storage
- GitHub Actions — **build/promote only**, never owns deployment alongside ArgoCD
- NVIDIA GPU Operator for K3s

### Hardware
- GCP L4 VM (g2-standard-8, 24GB VRAM)
- Local RTX 4070 Ti (12GB VRAM, 32GB RAM) at `10.0.0.39`
- Mac Pro Intel Xeon 96GB RAM
- Minisforum MS-S1 Max prospective (Ryzen AI Max+ 395, 128GB unified)

### Self-hosted services
- Matrix server at `matrix.know-me.tools` / `chat.know-me.tools`
- Kratos at `auth.travisjames.ai`
- UAR at `uar.travisjames.ai`
- boss-sync-relay (Y.js CRDT + WebRTC + EncryptedRelayProvider)
