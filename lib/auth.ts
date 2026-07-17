import "server-only";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "vm_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 4; // 4 hours

function getSecretKey() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_JWT_SECRET is missing or too short. Set a long random value in your environment."
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Issues a signed, short-lived session token for the admin vault.
 * This token is what gets stored in the HttpOnly cookie - never trust
 * anything else (like a client-side flag) to gate /admin.
 */
export async function signAdminSession() {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

/**
 * Verifies a session token. Returns null on any failure (expired,
 * tampered, wrong secret) so callers can treat it as "not authenticated".
 */
export async function verifyAdminSession(token: string | undefined | null) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export const adminCookieOptions = {
  name: ADMIN_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_DURATION_SECONDS,
};
