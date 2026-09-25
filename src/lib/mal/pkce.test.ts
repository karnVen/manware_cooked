import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  generateCodeVerifier,
  generateCodeChallenge,
  generateState,
  createPKCECodes,
  buildMALAuthUrl,
} from "./pkce";

describe("MyAnimeList OAuth 2.0 PKCE Generator", () => {
  describe("generateCodeVerifier", () => {
    it("should generate a 128-character verifier by default", () => {
      const verifier = generateCodeVerifier();
      assert.equal(typeof verifier, "string");
      assert.equal(verifier.length, 128);
    });

    it("should allow custom lengths between 43 and 128", () => {
      const v43 = generateCodeVerifier(43);
      const v64 = generateCodeVerifier(64);
      const v128 = generateCodeVerifier(128);

      assert.equal(v43.length, 43);
      assert.equal(v64.length, 64);
      assert.equal(v128.length, 128);
    });

    it("should throw an error for lengths outside [43, 128]", () => {
      assert.throws(() => generateCodeVerifier(42), /length/i);
      assert.throws(() => generateCodeVerifier(129), /length/i);
    });

    it("should only contain RFC 7636 unreserved characters [A-Za-z0-9-._~]", () => {
      const verifier = generateCodeVerifier(128);
      const validCharsRegex = /^[A-Za-z0-9\-._~]+$/;
      assert.ok(
        validCharsRegex.test(verifier),
        `Verifier contains invalid characters: ${verifier}`
      );
    });

    it("should generate unique cryptographically random verifiers", () => {
      const v1 = generateCodeVerifier();
      const v2 = generateCodeVerifier();
      assert.notEqual(v1, v2);
    });
  });

  describe("generateCodeChallenge", () => {
    it("should return the exact verifier for MAL plain code challenge method", () => {
      const verifier = "test_verifier_string_1234567890_abcdefgh";
      const challenge = generateCodeChallenge(verifier);
      assert.equal(challenge, verifier);
    });
  });

  describe("generateState", () => {
    it("should generate a random state string of default length 32", () => {
      const state = generateState();
      assert.equal(typeof state, "string");
      assert.equal(state.length, 32);
    });

    it("should generate unique state values", () => {
      const s1 = generateState();
      const s2 = generateState();
      assert.notEqual(s1, s2);
    });
  });

  describe("createPKCECodes", () => {
    it("should generate a complete valid PKCE bundle", () => {
      const bundle = createPKCECodes();
      assert.ok(bundle.codeVerifier, "codeVerifier must be present");
      assert.ok(bundle.codeChallenge, "codeChallenge must be present");
      assert.ok(bundle.state, "state must be present");
      assert.equal(bundle.codeChallenge, bundle.codeVerifier);
    });
  });

  describe("buildMALAuthUrl", () => {
    it("should construct a properly formatted MyAnimeList authorization URL", () => {
      const clientId = "test-client-id-123";
      const redirectUri = "http://localhost:3000/api/auth/callback";
      const pkce = {
        codeVerifier: "sample_verifier_value",
        codeChallenge: "sample_verifier_value",
        state: "sample_state_value",
      };

      const authUrl = buildMALAuthUrl(clientId, redirectUri, pkce);
      const parsed = new URL(authUrl);

      assert.equal(parsed.origin, "https://myanimelist.net");
      assert.equal(parsed.pathname, "/v1/oauth2/authorize");
      assert.equal(parsed.searchParams.get("response_type"), "code");
      assert.equal(parsed.searchParams.get("client_id"), clientId);
      assert.equal(parsed.searchParams.get("code_challenge"), pkce.codeChallenge);
      assert.equal(parsed.searchParams.get("code_challenge_method"), "plain");
      assert.equal(parsed.searchParams.get("state"), pkce.state);
      assert.equal(parsed.searchParams.get("redirect_uri"), redirectUri);
    });
  });
});
