# 📓 Manware Cooked — AI-bou Study & Development Journal

This journal tracks our exact pair-programming progress, lessons learned, architectural decisions, and current checkpoints so we can pick up seamlessly across sessions.

---

## 📌 Project Status Snapshot

- **Project**: Manware Cooked (AI Anime Roast & Profile Diagnostics Engine)
- **Architecture Stack**: Next.js 15+ (App Router), TypeScript, Tailwind/Vanilla CSS, Node.js `crypto`
- **Active Phase**: Phase 1 — Authentication & MyAnimeList OAuth 2.0 PKCE Handshake
- **Core Rule & Protocol**: **AI-bou Student-Led Pair Programming**
  - **Zero spoon-feeding**: The AI explains concepts and guides with targeted questions; **the student writes 100% of the code**.
  - **Test-Driven Loop**: The student codes in the editor, the AI executes the automated test suite and provides diagnostic hints without revealing raw answers.

---

## 📅 Session Log: October 8, 2026

### 🎯 Milestone 1: Global AI-bou Protocol Locked In
- Enforced interactive pedagogical rules across [`AGENTS.md`](file:///z:/home/karnven/AI-bou/AGENTS.md), [`GEMINI.md`](file:///z:/home/karnven/AI-bou/GEMINI.md), and workspace root.
- Reverted all route logic back to interactive scaffolding with clean type definitions and JSDoc instructions.

### 🎯 Milestone 2: Login Route Handler Complete! 🏆
- **File**: [`src/app/api/auth/mal/login/route.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/app/api/auth/mal/login/route.ts)
- **Test File**: [`src/app/api/auth/mal/login/route.test.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/app/api/auth/mal/login/route.test.ts)
- **Test Status**: **2/2 tests passed (12/12 total passing across test suite)**.

#### 🧠 Concepts Mastered:
1. **Defensive Guard Clauses**:
   - Checking `if (!clientId)` right away to prevent broken external auth flows.
2. **Ephemeral Cookie Persistence**:
   - Securing `mal_code_verifier` and `mal_oauth_state` into HTTP-only, short-lived cookies (600s) on the redirect response before sending the user to MyAnimeList.
3. **Redirect Flow**:
   - Creating a 307 Temporary Redirect using `NextResponse.redirect(authUrl)` and returning the response with attached cookies.

---

### 🎯 Milestone 3: Token Exchange Client (`exchangeCodeForTokens`) Complete! 🏆
- **File**: [`src/lib/mal/client.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/lib/mal/client.ts)
- **Test File**: [`src/lib/mal/client.test.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/lib/mal/client.test.ts)
- **Test Status**: **2/2 tests passed (14/14 total active passing tests)**.
- **Obsidian Note**: [`docs/notes/03-mal-token-exchange.md`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/docs/notes/03-mal-token-exchange.md)

#### 🧠 Concepts Mastered:
1. **`URLSearchParams` vs JSON for OAuth**:
   - MAL token endpoint requires `application/x-www-form-urlencoded` format containing `client_id`, `code`, `code_verifier`, `grant_type: "authorization_code"`, and `redirect_uri`.
2. **Native Fetch POST Dispatches**:
   - Dispatching the token exchange request, checking `!response.ok`, and deserializing JSON tokens (`access_token`, `refresh_token`, `expires_in`).

---

### 🎯 Milestone 4: Repository Outer Look & README Enhancement (Gakki_Vault Standard) 🏆
- **File**: [`README.md`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/README.md) • [`LICENSE`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/LICENSE)
- **Obsidian Note**: [`docs/notes/04-repository-aesthetic-and-branding.md`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/docs/notes/04-repository-aesthetic-and-branding.md)
- **GitHub Repo**: Updated description and 9 topics (`nextjs`, `typescript`, `oauth2`, `pkce`, `myanimelist`, `ai-roast`, `anime`, `gemini-api`, `alvar-method`) via `gh repo edit`.

#### 🧠 Concepts Mastered:
1. **Visual Hierarchy & Product Branding**:
   - Centered hero banner, `for-the-badge` shields, punchy mission statement, and quick navigation bar.
2. **Dual-Layer Architecture Visualization**:
   - Boxed ASCII pipeline schematics for universal terminal readability + Mermaid sequence diagrams for GitHub/Obsidian rendering.
3. **Data-Dense Metrics Tables**:
   - "At a Glance" matrix organizing framework, auth protocol, security model, and test coverage.

---

### 🎯 Milestone 5: OAuth 2.0 Callback Route & Session Persistence Complete! 🏆
- **File**: [`src/app/api/auth/callback/route.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/app/api/auth/callback/route.ts)
- **Test File**: [`src/app/api/auth/callback/route.test.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/app/api/auth/callback/route.test.ts)
- **Test Status**: **3/3 tests passed (17/17 total passing tests across entire codebase)**.
- **Obsidian Note**: [`docs/notes/05-oauth-callback-and-session.md`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/docs/notes/05-oauth-callback-and-session.md)

#### 🧠 Concepts Mastered:
1. **CSRF State Verification**:
   - Matching URL `state` with cookie `mal_oauth_state` to prevent cross-site request forgery (returns HTTP 403 on mismatch).
2. **Missing Credential Defensive Checks**:
   - Guarding against missing `code` or `codeVerifier` (returns HTTP 400).
3. **End-to-End Token Exchange**:
   - Exchanging code via `exchangeCodeForTokens()` and sealing the response in `mal_session` cookie (HTTP-only, 31-day lifespan).
4. **Cookie Hygiene**:
   - Deleting ephemeral `mal_oauth_state` and `mal_code_verifier` cookies upon successful login.

---

## 🚀 Next Starting Point: Phase 2 — MAL Profile Ingestion & Animelist Scraper

### 📍 Next Milestone: Fetch Authenticated User Profile & Lifetime Stats
- **Target File**: [`src/lib/mal/client.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/lib/mal/client.ts) (`fetchUserProfile` & `fetchUserAnimePage`)
- **Goal**:
  1. Implement `fetchUserProfile(accessToken)`: GET `https://api.myanimelist.net/v2/users/@me?fields=anime_statistics`.
  2. Implement `fetchUserAnimePage(accessToken, limit, offset)`: GET paginated animelist with status, scores, and genres.
  3. Create route `GET /api/auth/me` to return the current user's profile and authentication status.




