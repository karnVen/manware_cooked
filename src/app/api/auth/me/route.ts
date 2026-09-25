import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/auth/me
 * 
 * Checks the current session cookie and returns authenticated state.
 */
export async function GET(_request: NextRequest) {
  // TODO: Check for mal_session cookie, return { authenticated: boolean, user?: ... }
  return NextResponse.json(
    { authenticated: false, message: "Not implemented: /api/auth/me" },
    { status: 200 }
  );
}
