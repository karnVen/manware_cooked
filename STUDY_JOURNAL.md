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

## 🚀 Next Starting Point: Phase 1 — Callback Route (`/api/auth/callback`)

### 📍 Next Milestone: OAuth Callback & Token Exchange
- **Target File**: [`src/app/api/auth/callback/route.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/app/api/auth/callback/route.ts)
- **Goal**:
  1. Extract `code` and `state` query params from the incoming MAL redirect.
  2. Read stored cookies (`mal_oauth_state`, `mal_code_verifier`).
  3. Validate CSRF state match (`incoming state === cookie state`).
  4. Call `exchangeCodeForTokens()` to exchange the authorization code for access and refresh tokens.
  5. Store the tokens in the `mal_session` cookie and redirect user to the app dashboard!

