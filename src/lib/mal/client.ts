/**
 * MyAnimeList API v2 Client
 * 
 * Handles token exchange, token refresh, and authenticated user requests.
 * Docs: https://myanimelist.net/apiconfig/references/api/v2
 */

import { MALTokens, MALUser, MALUserAnimeListResponse } from "@/types/mal";

export const MAL_BASE_URL = "https://api.myanimelist.net/v2";
export const MAL_TOKEN_URL = "https://myanimelist.net/v1/oauth2/token";

/**
 * Exchanges authorization code from OAuth callback for Access & Refresh tokens.
 * 
 * MAL Token Exchange requirements:
 * POST https://myanimelist.net/v1/oauth2/token
 * Content-Type: application/x-www-form-urlencoded
 * Body params:
 *  - client_id
 *  - client_secret (if configured)
 *  - code
 *  - code_verifier
 *  - grant_type: 'authorization_code'
 *  - redirect_uri (must match the authorize redirect_uri)
 */


export async function exchangeCodeForTokens(params: {
  clientId: string;
  clientSecret?: string;
  code: string;
  codeVerifier: string;
  redirectUri: string;

  
}): Promise<MALTokens> {
  // TODO: Implement token exchange request using native fetch()

  const body = new URLSearchParams({
  client_id: params.clientId,
  code: params.code,
  code_verifier: params.codeVerifier,
  grant_type: "authorization_code",
  redirect_uri: params.redirectUri,
});

if (params.clientSecret) {
  body.set("client_secret", params.clientSecret);
}

const response = await fetch(MAL_TOKEN_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: body.toString(),
});
if (!response.ok) {
  const errorBody = await response.text();
  throw new Error(`Token exchange failed (${response.status}): ${errorBody}`);
}
  return (await response.json()) as MALTokens;
}

/**
 * Refreshes an expired access token using the refresh_token.
 */
export async function refreshAccessToken(_params: {
  clientId: string;
  clientSecret?: string;
  refreshToken: string;
}): Promise<MALTokens> {
  // TODO: Implement refresh token request using native fetch()
  throw new Error("Not implemented: refreshAccessToken");
}

/**
 * Fetches the authenticated user's profile and lifetime anime statistics.
 * GET https://api.myanimelist.net/v2/users/@me?fields=anime_statistics
 */
export async function fetchUserProfile(accessToken: string): Promise<MALUser> {
  // TODO: Implement authenticated profile fetch

const url = `${MAL_BASE_URL}/users/@me?fields=anime_statistics`;
fetch(url, Headers: {
  Authorization: `Bearer ${accessToken}`, 
}
)
  throw new Error("Not implemented: fetchUserProfile");
}

/**
 * Fetches a paginated page of the user's anime list with status, scores, and genres.
 * GET https://api.myanimelist.net/v2/users/@me/animelist?fields=list_status,genres,mean,num_episodes&limit={limit}&offset={offset}
 */
export async function fetchUserAnimePage(
  _accessToken: string,
  _limit = 100,
  _offset = 0
): Promise<MALUserAnimeListResponse> {
  // TODO: Implement paginated animelist fetch
  throw new Error("Not implemented: fetchUserAnimePage");
}
