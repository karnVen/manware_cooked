import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/mal/client";
import { COOKIE_KEYS, getSecureCookieOptions } from "@/lib/mal/session";

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
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  const storedState = request.cookies.get(COOKIE_KEYS.OAUTH_STATE)?.value;
  const codeVerifier = request.cookies.get(COOKIE_KEYS.CODE_VERIFIER)?.value;

  if (!state || !storedState || state !== storedState) {
    return NextResponse.json(
      { error: "Invalid or missing OAuth state" },
      { status: 403 }
    );
  }

  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: "Missing authorization code or verifier" },
      { status: 400 }
    );
  }

  const tokens = await exchangeCodeForTokens({
    clientId: process.env.MAL_CLIENT_ID!,
    clientSecret: process.env.MAL_CLIENT_SECRET,
    code,
    codeVerifier,
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback`,
  });

  const response = NextResponse.redirect(new URL("/", request.nextUrl.origin));

  response.cookies.set(
    COOKIE_KEYS.SESSION,
    JSON.stringify(tokens),
    getSecureCookieOptions(tokens.expires_in)
  );

  response.cookies.delete(COOKIE_KEYS.OAUTH_STATE);
  response.cookies.delete(COOKIE_KEYS.CODE_VERIFIER);

  return response;
}

