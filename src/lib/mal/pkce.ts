/**
 * MyAnimeList OAuth 2.0 PKCE Utility
 * 
 * Spec: RFC 7636 & MyAnimeList API v2
 * Docs: https://myanimelist.net/apiconfig/references/api/v2
 * 
 * ARCHITECT NOTE:
 * Do not look up pre-made libraries for PKCE. Use Node.js built-in `crypto` module.
 * Implement each function according to the JSDoc requirements.
 */

import { PKCECodes } from "@/types/mal";
import crypto from "node:crypto";

/**
 * Generates a cryptographically secure code_verifier.
 * Must use unreserved characters: [A-Za-z0-9-._~]
 * Must be between 43 and 128 characters in length.
 * 
 * @param length - Desired length (default: 128, min: 43, max: 128)
 */
export function generateCodeVerifier(length = 128): string {
  // TODO: Implement using crypto.randomBytes() or web crypto
  // Hint: Convert random bytes to an allowed characters string
  // Ensure the length is within [43, 128]
  if (length < 43 || length > 128) {


    throw new Error("Invalid verifier length: length must be between 43 and 128");

  } else {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const bytes = crypto.randomBytes(length);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[bytes[i] % charset.length];
    }
    return result;



  }
}

/**
 * Generates a code_challenge from a code_verifier.
 * MAL v2 natively supports 'plain' code challenge, meaning code_challenge === code_verifier.
 * 
 * @param verifier - The code_verifier string
 */
export function generateCodeChallenge(verifier: string): string {
  // TODO: Implement code challenge generation (for 'plain' method, it directly matches verifier)
  return verifier; 
}

/**
 * Generates a random CSRF state string to prevent cross-site request forgery.
 * 
 * @param length - Desired length (default: 32)
 */
export function generateState(length = 32): string {
  // TODO: Implement random state generation
  const bytes = crypto.randomBytes(length);
  return bytes.toString("base64url").slice(0,length);
  
}

/**
 * Creates a complete PKCE bundle containing verifier, challenge, and CSRF state.
 */
export function createPKCECodes(): PKCECodes {
  // TODO: Combine generateCodeVerifier, generateCodeChallenge, and generateState
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState(); 
  return { codeChallenge, codeVerifier, state};
  
}

/**
 * Builds the official MyAnimeList OAuth 2.0 authorization URL.
 * 
 * Format:
 * https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id={clientId}&code_challenge={challenge}&code_challenge_method=plain&state={state}&redirect_uri={redirectUri}
 */
export function buildMALAuthUrl(
  clientId: string,
  redirectUri: string,
  pkce: PKCECodes
): string {
  // TODO: Use the URL and URLSearchParams Web API to construct the full auth URL
  // 1. Create the base URL object
const url = new URL("https://myanimelist.net/v1/oauth2/authorize");


// 2. Set search params using url.searchParams.set(key, value)
url.searchParams.set("response_type", "code");
url.searchParams.set("client_id", clientId);
url.searchParams.set("code_challenge", pkce.codeChallenge);
url.searchParams.set("code_challenge_method", "plain"); 
url.searchParams.set("state", pkce.state);
url.searchParams.set("redirect_uri", redirectUri);

// ... set the other 5 params ...


// 3. Return the full URL string
return url.toString();

}
