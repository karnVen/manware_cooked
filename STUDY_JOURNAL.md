# 📓 Manware Cooked — AI-bou Study & Development Journal

This journal tracks our exact pair-programming progress, lessons learned, architectural decisions, and current checkpoints so we can pick up seamlessly across sessions.

---

## 📌 Current Project Status

- **Project**: Manware Cooked (AI Anime Roast & Profile Diagnostics Engine)
- **Framework**: Next.js 15+ (App Router), TypeScript, Tailwind/Vanilla CSS tokens, Node.js `crypto`
- **Current Phase**: Phase 1 — Authentication & MAL OAuth 2.0 PKCE Flow
- **Current Test Status**: **10 / 10 Tests Passing (100%)** ✅

---

## 📅 Session Log: October 6, 2026

### 🎯 Milestone Achieved: Complete RFC 7636 OAuth 2.0 PKCE Engine
**File Implemented**: [`src/lib/mal/pkce.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/lib/mal/pkce.ts)
**Test Suite**: [`src/lib/mal/pkce.test.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/lib/mal/pkce.test.ts)

### 🧩 Functions Implemented & Tested:
1. `generateCodeVerifier(length = 128)`:
   - Validates length is between 43 and 128 characters.
   - Generates cryptographically secure random bytes via `crypto.randomBytes()`.
   - Uses RFC 7636 unreserved character set `[A-Za-z0-9-._~]` via modulo character mapping.
2. `generateCodeChallenge(verifier)`:
   - Implements MyAnimeList's native `plain` code challenge method (`challenge === verifier`).
3. `generateState(length = 32)`:
   - Generates random CSRF state strings using `crypto.randomBytes(length).toString("base64url").slice(0, length)`.
4. `createPKCECodes()`:
   - Bundles the 3 generation methods into a complete `{ codeVerifier, codeChallenge, state }` JavaScript object conforming to `PKCECodes`.
5. `buildMALAuthUrl(clientId, redirectUri, pkce)`:
   - Safely constructs the official MyAnimeList authorization URL using standard `URL` and `URLSearchParams` with 6 parameters (`response_type`, `client_id`, `code_challenge`, `code_challenge_method`, `state`, `redirect_uri`).

---

### 🧠 Core Concepts Learned Today:
- **PKCE Flow in Plain English**: Why public/single-page/client apps use PKCE instead of exposing client secrets during the initial authorize redirect.
- **Buffer vs String encoding in Node.js**: How `crypto.randomBytes(n)` produces a raw binary buffer, and how `.toString("base64url")` and `.toString("hex")` convert bytes to web-safe strings.
- **TypeScript `_param` Convention**: Leading underscores mark parameters intentionally unused during scaffolding to satisfy linters.
- **TypeScript `interface` vs Concrete JavaScript Objects**: An `interface` only exists at compile-time as a type blueprint; runtime returns must be object literals `{ key: value }`.
- **String Literals vs Variables**: Remembering that `"clientId"` evaluates to the static word `"clientId"`, whereas `clientId` evaluates to the variable's runtime value.
- **Clean Variable Naming**: Avoiding generic/reserved words like `final` or `temp` in favor of descriptive names (`state`) or direct returns.

---

## 🚀 Tomorrow's Starting Point (October 7, 2026)

### 📍 Next Milestone: Phase 1 — Next.js Login Route Handler
- **Target File**: [`src/app/api/auth/mal/login/route.ts`](file:///z:/home/karnven/AI-bou/main-project/manware_cooked/src/app/api/auth/mal/login/route.ts)
- **Goal**:
  1. Read `MAL_CLIENT_ID` and `NEXT_PUBLIC_APP_URL` from `process.env`.
  2. Call `createPKCECodes()` to generate verifier, challenge, and CSRF state.
  3. Call `buildMALAuthUrl(...)` to build the MAL redirect URL.
  4. Set HTTP-only cookies for `mal_code_verifier` and `mal_oauth_state` using `getSecureCookieOptions()`.
  5. Redirect the user to MyAnimeList's login page!
