import { NextRequest, NextResponse } from "next/server";
import { passcodeSchema } from "@/lib/validations";
import { signAdminSession, adminCookieOptions } from "@/lib/auth";

// Very small in-memory throttle to slow down brute-forcing the passcode.
// This resets on server restart/redeploy - fine as a first line of defense,
// not a replacement for a real rate limiter (e.g. Upstash) in production.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function tooManyAttempts(key: string) {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (tooManyAttempts(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = passcodeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const expected = process.env.ADMIN_PASSCODE;

  if (!expected) {
    console.error("ADMIN_PASSCODE is not set in the environment.");
    return NextResponse.json(
      { success: false, message: "Vault is not configured." },
      { status: 500 }
    );
  }

  if (parsed.data.passcode !== expected) {
    return NextResponse.json(
      { success: false, message: "Incorrect passcode." },
      { status: 401 }
    );
  }

  let token: string;
  try {
    token = await signAdminSession();
  } catch (err) {
    console.error("Failed to sign admin session:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Vault session could not be created. Check ADMIN_JWT_SECRET on the server.",
      },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(adminCookieOptions.name, token, adminCookieOptions);
  return response;
}
