import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { exchangeCodeForTokens, MAL_TOKEN_URL } from "./client";

describe("MyAnimeList Client - exchangeCodeForTokens", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should send correct POST request to MAL token endpoint and return tokens", async () => {
    const mockTokens = {
      token_type: "Bearer",
      expires_in: 2678400,
      access_token: "mock_token_abc",
      refresh_token: "mock_refresh_xyz",
    };

    let capturedUrl = "";
    let capturedOptions: RequestInit | undefined;

    globalThis.fetch = async (url, options) => {
      capturedUrl = url.toString();
      capturedOptions = options;
      return new Response(JSON.stringify(mockTokens), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const result = await exchangeCodeForTokens({
      clientId: "test_client_id",
      clientSecret: "test_client_secret",
      code: "test_auth_code",
      codeVerifier: "test_verifier",
      redirectUri: "http://localhost:3000/api/auth/callback",
    });

    assert.equal(capturedUrl, MAL_TOKEN_URL);
    assert.equal(capturedOptions?.method, "POST");
    assert.equal(
      (capturedOptions?.headers as Record<string, string>)["Content-Type"],
      "application/x-www-form-urlencoded"
    );

    const bodyParams = new URLSearchParams(capturedOptions?.body as string);
    assert.equal(bodyParams.get("client_id"), "test_client_id");
    assert.equal(bodyParams.get("client_secret"), "test_client_secret");
    assert.equal(bodyParams.get("code"), "test_auth_code");
    assert.equal(bodyParams.get("code_verifier"), "test_verifier");
    assert.equal(bodyParams.get("grant_type"), "authorization_code");
    assert.equal(bodyParams.get("redirect_uri"), "http://localhost:3000/api/auth/callback");

    assert.deepEqual(result, mockTokens);
  });

  it("should throw an error when token exchange returns non-200 status", async () => {
    globalThis.fetch = async () => {
      return new Response("Invalid code verifier", { status: 400 });
    };

    await assert.rejects(
      async () => {
        await exchangeCodeForTokens({
          clientId: "test_client_id",
          code: "bad_code",
          codeVerifier: "bad_verifier",
          redirectUri: "http://localhost:3000/api/auth/callback",
        });
      },
      /Token exchange failed \(400\)/
    );
  });
});

describe("MyAnimeList Client - fetchUserProfile", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("should fetch user profile with Bearer authorization and return MALUser", async () => {
    const mockUser = {
      id: 12345,
      name: "AnimeFan99",
      picture: "https://myanimelist.net/images/user.jpg",
      anime_statistics: {
        num_items_watching: 3,
        num_items_completed: 150,
        num_items_on_hold: 2,
        num_items_dropped: 12,
        num_items_plan_to_watch: 50,
        num_items: 217,
        num_days_watched: 45.2,
        num_days_watching: 1.1,
        num_days_completed: 40.5,
        num_days_on_hold: 0.8,
        num_days_dropped: 2.8,
        num_days: 45.2,
        mean_score: 7.84,
      },
    };

    let capturedUrl = "";
    let capturedOptions: RequestInit | undefined;

    globalThis.fetch = async (url, options) => {
      capturedUrl = url.toString();
      capturedOptions = options;
      return new Response(JSON.stringify(mockUser), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    const user = await (await import("./client")).fetchUserProfile("valid_access_token_123");

    assert.equal(
      capturedUrl,
      "https://api.myanimelist.net/v2/users/@me?fields=anime_statistics"
    );
    assert.equal(
      (capturedOptions?.headers as Record<string, string>)["Authorization"],
      "Bearer valid_access_token_123"
    );
    assert.deepEqual(user, mockUser);
  });

  it("should throw an error when fetchUserProfile fails", async () => {
    globalThis.fetch = async () => {
      return new Response("Unauthorized", { status: 401 });
    };

    await assert.rejects(
      async () => {
        const { fetchUserProfile } = await import("./client");
        await fetchUserProfile("expired_token");
      },
      /Failed to fetch user profile \(401\)/
    );
  });
});

