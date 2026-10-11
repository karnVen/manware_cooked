import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { GET } from "./route";
import { COOKIE_KEYS } from "@/lib/mal/session";

describe("GET /api/auth/mal/login", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.MAL_CLIENT_ID = "test_client_id_12345";
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("should return 500 when MAL_CLIENT_ID is missing", async () => {
    delete process.env.MAL_CLIENT_ID;

    const response = await GET();
    assert.equal(response.status, 500);

    const data = await response.json();
    assert.match(data.error, /MAL_CLIENT_ID is not configured/);
  });

  it("should return a redirect response to MyAnimeList authorization URL", async () => {
    const response = await GET();

    // NextResponse.redirect produces 307 (Temporary Redirect) by default
    assert.equal(response.status, 307);

    const locationHeader = response.headers.get("location");
    assert.ok(locationHeader, "Location header must be present");

    const authUrl = new URL(locationHeader);
    assert.equal(authUrl.origin, "https://myanimelist.net");
    assert.equal(authUrl.pathname, "/v1/oauth2/authorize");
    assert.equal(authUrl.searchParams.get("response_type"), "code");
    assert.equal(authUrl.searchParams.get("client_id"), "test_client_id_12345");
    assert.equal(authUrl.searchParams.get("code_challenge_method"), "plain");
    assert.equal(authUrl.searchParams.get("redirect_uri"), "http://localhost:3000/api/auth/callback");

    const stateParam = authUrl.searchParams.get("state");
    const codeChallengeParam = authUrl.searchParams.get("code_challenge");
    assert.ok(stateParam, "state query param must be present");
    assert.ok(codeChallengeParam, "code_challenge query param must be present");

    // Verify cookies attached
    const verifierCookie = response.cookies.get(COOKIE_KEYS.CODE_VERIFIER);
    const stateCookie = response.cookies.get(COOKIE_KEYS.OAUTH_STATE);

    assert.ok(verifierCookie, "mal_code_verifier cookie must be set");
    assert.ok(stateCookie, "mal_oauth_state cookie must be set");

    // Verify cookie values align with query params
    assert.equal(stateCookie.value, stateParam);
    assert.equal(verifierCookie.value, codeChallengeParam);
    assert.equal(verifierCookie.httpOnly, true);
    assert.equal(stateCookie.httpOnly, true);
  });
});
