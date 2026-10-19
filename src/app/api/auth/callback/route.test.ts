import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { GET } from "./route";
import { COOKIE_KEYS } from "@/lib/mal/session";

describe("GET /api/auth/callback", () => {
  const originalEnv = { ...process.env };
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    process.env.MAL_CLIENT_ID = "test_client_id_12345";
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    globalThis.fetch = originalFetch;
  });

  it("should return 403 when state is missing or does not match cookie (CSRF protection)", async () => {
    // Incoming state differs from cookie state
    const req = new NextRequest("http://localhost:3000/api/auth/callback?code=test_code&state=incoming_state_123", {
      headers: {
        cookie: `${COOKIE_KEYS.OAUTH_STATE}=different_state_456; ${COOKIE_KEYS.CODE_VERIFIER}=test_verifier`,
      },
    });

    const response = await GET(req);
    assert.equal(response.status, 403);

    const body = await response.json();
    assert.match(body.error, /state/i);
  });

  it("should return 400 when authorization code or code_verifier cookie is missing", async () => {
    // Valid state, but missing code query param
    const req = new NextRequest("http://localhost:3000/api/auth/callback?state=valid_state", {
      headers: {
        cookie: `${COOKIE_KEYS.OAUTH_STATE}=valid_state; ${COOKIE_KEYS.CODE_VERIFIER}=test_verifier`,
      },
    });

    const response = await GET(req);
    assert.equal(response.status, 400);

    const body = await response.json();
    assert.match(body.error, /code/i);
  });

  it("should exchange code for tokens, save session cookie, delete temp cookies, and redirect to /", async () => {
    const mockTokens = {
      token_type: "Bearer",
      expires_in: 2678400,
      access_token: "mock_access_token_abc",
      refresh_token: "mock_refresh_token_xyz",
    };

    // Mock fetch to simulate MAL token endpoint response
    globalThis.fetch = async (url, options) => {
      // Verify request was sent to MAL token endpoint
      assert.equal(url.toString(), "https://myanimelist.net/v1/oauth2/token");
      assert.equal(options?.method, "POST");
      return new Response(JSON.stringify(mockTokens), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const req = new NextRequest(
      "http://localhost:3000/api/auth/callback?code=valid_auth_code&state=valid_state_123",
      {
        headers: {
          cookie: `${COOKIE_KEYS.OAUTH_STATE}=valid_state_123; ${COOKIE_KEYS.CODE_VERIFIER}=valid_verifier_456`,
        },
      }
    );

    const response = await GET(req);

    // Should redirect to root /
    assert.ok(response.status === 307 || response.status === 302 || response.status === 303);

    const location = response.headers.get("location");
    assert.ok(location, "Location header must be present");
    const locUrl = new URL(location);
    assert.equal(locUrl.pathname, "/");

    // Session cookie should be set with stringified tokens
    const sessionCookie = response.cookies.get(COOKIE_KEYS.SESSION);
    assert.ok(sessionCookie, "Session cookie must be set");
    assert.equal(sessionCookie.httpOnly, true);
    const parsedTokens = JSON.parse(sessionCookie.value);
    assert.equal(parsedTokens.access_token, "mock_access_token_abc");
    assert.equal(parsedTokens.refresh_token, "mock_refresh_token_xyz");

    // Temporary cookies should be cleared
    const stateCookie = response.cookies.get(COOKIE_KEYS.OAUTH_STATE);
    const verifierCookie = response.cookies.get(COOKIE_KEYS.CODE_VERIFIER);
    assert.ok(
      !stateCookie || stateCookie.value === "" || stateCookie.maxAge === 0,
      "State cookie should be cleared"
    );
    assert.ok(
      !verifierCookie || verifierCookie.value === "" || verifierCookie.maxAge === 0,
      "Verifier cookie should be cleared"
    );
  });
});
