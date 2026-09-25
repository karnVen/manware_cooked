/**
 * MyAnimeList OAuth Session & Cookie Manager
 * 
 * Securely stores access_token, refresh_token, and PKCE verifier across redirects
 * using HTTP-only cookies in Next.js Server Components / Route Handlers.
 */

import { MALTokens } from "@/types/mal";

export interface SessionData {
  tokens?: MALTokens;
  oauthState?: string;
  codeVerifier?: string;
}

/**
 * Cookie names used in the authentication flow
 */
export const COOKIE_KEYS = {
  OAUTH_STATE: "mal_oauth_state",
  CODE_VERIFIER: "mal_code_verifier",
  SESSION: "mal_session",
} as const;

/**
 * Helper to get cookie options for security
 */
export function getSecureCookieOptions(maxAgeSeconds = 3600) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
