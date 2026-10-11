# 📌 Session Handover & Memory Checkpoint (October 8, 2026)

## 📍 Workspace Information
- **Workspace**: `manware_cooked` (`/home/karnven/AI-bou/main-project/manware_cooked`)
- **Active File**: `src/app/api/auth/mal/login/route.ts`
- **Active Branch**: `main`

---

## 🎓 AI-bou Teaching Protocol (Reminder for Next Session)
- **Do NOT provide direct code snippets in responses.**
- Guide conceptually with mental models, flow diagrams, and guiding questions.
- Let the student implement the code in their editor.
- Run `npx tsx --test` to provide diagnostic feedback.

---

## 🎯 Completed Tasks:
1. **PKCE Generator (`src/lib/mal/pkce.ts`)**: 10/10 tests passing.
2. **Login Route (`src/app/api/auth/mal/login/route.ts`)**: 2/2 tests passing.
3. **Token Exchange Client (`src/lib/mal/client.ts`)**: 2/2 tests passing (`exchangeCodeForTokens`).
   - Obsidian Note: `docs/notes/03-mal-token-exchange.md`

---

## ⚡ Mandatory End-of-Task Protocol (Locked in Memory)
At the end of every completed task:
1. Final polish & cleanups in codebase.
2. Descriptive multi-bullet git commit & push to GitHub.
3. Simple, readable Obsidian note created in `docs/notes/`.
4. Update journal and checkpoint.

---

## 🎯 Next Task: `GET /api/auth/callback`
When resuming:
1. Student opens `src/app/api/auth/callback/route.ts`.
2. Extract query params `code` and `state`.
3. Validate CSRF state against `mal_oauth_state` cookie.
4. Call `exchangeCodeForTokens` to get tokens.
5. Persist tokens into `mal_session` cookie and redirect to `/`.

