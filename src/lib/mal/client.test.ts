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
