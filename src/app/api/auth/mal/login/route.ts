import { NextResponse } from "next/server";

/**
 * GET /api/auth/mal/login
 * 
 * Initiates the MyAnimeList OAuth 2.0 PKCE Authorization flow.
 * 
 * Steps to implement:
 * 1. Read MAL_CLIENT_ID and NEXT_PUBLIC_APP_URL from process.env.
 * 2. Generate PKCE codes (verifier, challenge, state) using `createPKCECodes()`.
 * 3. Construct redirect URI: `${NEXT_PUBLIC_APP_URL}/api/auth/callback`.
 * 4. Generate MAL auth URL with `buildMALAuthUrl()`.
 * 5. Create a redirect response to the auth URL.
 * 6. Set HTTP-only cookies for:
 *    - `mal_code_verifier` (needed during callback token exchange)
 *    - `mal_oauth_state` (needed during callback CSRF verification)
 * 7. Return the response.
 */
export async function GET() {
  // TODO: Implement login redirect with cookies
  return NextResponse.json(
    { error: "Not implemented: /api/auth/mal/login" },
    { status: 501 }
  );
}
