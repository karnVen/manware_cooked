import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/auth/callback
 * 
 * OAuth 2.0 Redirect Callback from MyAnimeList.
 * 
 * Query params received from MAL:
 * - code: Authorization code
 * - state: CSRF state string sent during login
 * 
 * Steps to implement:
 * 1. Extract `code` and `state` from request.nextUrl.searchParams.
 * 2. Retrieve cookies `mal_oauth_state` and `mal_code_verifier` from request.cookies.
 * 3. Validate state: if state is missing or doesn't match cookie, abort with 403 (CSRF attack prevention).
 * 4. Call `exchangeCodeForTokens()` with code, code_verifier, and redirect_uri.
 * 5. Store the returned tokens securely in the `mal_session` cookie (JSON stringified, HTTP-only).
 * 6. Clean up temporary cookies (`mal_oauth_state`, `mal_code_verifier`).
 * 7. Redirect user to `/` (or dashboard).
 */
export async function GET(_request: NextRequest) {
  // TODO: Implement OAuth callback validation, token exchange, and session cookie persistence
  return NextResponse.json(
    { error: "Not implemented: /api/auth/callback" },
    { status: 501 }
  );
}
