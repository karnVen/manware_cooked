import { NextResponse } from "next/server";
import { buildMALAuthUrl, createPKCECodes } from "@/lib/mal/pkce";
import { COOKIE_KEYS, getSecureCookieOptions } from "@/lib/mal/session";

/**
 * GET /api/auth/mal/login
 * 
 * Initiates the MyAnimeList OAuth 2.0 PKCE Authorization flow.
 * 
 * Steps to implement:
 * 1. Read MAL_CLIENT_ID and NEXT_PUBLIC_APP_URL from process.env.
 *    - If MAL_CLIENT_ID is missing, return NextResponse.json with error and status 500.
 * 2. Construct the redirect URI: `${appUrl}/api/auth/callback`.
 * 3. Generate PKCE codes (verifier, challenge, state) using `createPKCECodes()`.
 * 4. Generate MAL auth URL with `buildMALAuthUrl(clientId, redirectUri, pkce)`.
 * 5. Create a redirect response to the auth URL using `NextResponse.redirect(authUrl)`.
 * 6. Set HTTP-only cookies on the response using `response.cookies.set()`:
 *    - COOKIE_KEYS.CODE_VERIFIER -> pkce.codeVerifier (with getSecureCookieOptions(600))
 *    - COOKIE_KEYS.OAUTH_STATE   -> pkce.state (with getSecureCookieOptions(600))
 * 7. Return the response.
 */
export async function GET() {
  const clientId = process.env.MAL_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!clientId) {
    return NextResponse.json(
      { error: "Server configuration error: MAL_CLIENT_ID is not configured." },
      { status: 500 }
    );
  }

  const pkce = createPKCECodes();
  const redirectUri = `${appUrl}/api/auth/callback`;
  const authUrl = buildMALAuthUrl(clientId, redirectUri, pkce);
  const response = NextResponse.redirect(authUrl);

  response.cookies.set(
    COOKIE_KEYS.CODE_VERIFIER,
    pkce.codeVerifier,
    getSecureCookieOptions(600)
  );

  response.cookies.set(
    COOKIE_KEYS.OAUTH_STATE,
    pkce.state,
    getSecureCookieOptions(600)
  );

  return response;
}

