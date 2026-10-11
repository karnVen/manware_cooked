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

## 🎯 Completed Task: `GET /api/auth/mal/login` 🏆
- Completed login route handler with guard clauses, PKCE generation, and secure HTTP-only cookies.
- Verified test suite: 12/12 tests passing.

---

## 🎯 Next Task: `GET /api/auth/callback`
When resuming:
1. Student opens `src/app/api/auth/callback/route.ts`.
2. Extract query params `code` and `state`.
3. Validate CSRF state against `mal_oauth_state` cookie.
4. Exchange code for access & refresh tokens via `exchangeCodeForTokens`.
5. Persist tokens into `mal_session` cookie and redirect to dashboard.

