import { NextResponse } from "next/server";

/**
 * Env diagnostic endpoint — surfaces whether expected env vars are set
 * and their CHARACTERISTICS (length, prefix) without exposing values.
 *
 * GET /api/diagnose
 *
 * Used to debug "is the env var actually present in the Vercel runtime"
 * questions without dumping secrets to logs or chat.
 */

export const dynamic = "force-dynamic";

function describe(value: string | undefined, expectedPrefix?: string) {
  if (!value) return { present: false };
  return {
    present: true,
    length: value.length,
    prefix: value.slice(0, Math.min(8, value.length)),
    hasTrailingWhitespace: value !== value.trim(),
    hasLiteralNewlineEscape: /\\n$/.test(value),
    matchesExpectedPrefix: expectedPrefix
      ? value.startsWith(expectedPrefix)
      : null,
  };
}

export async function GET() {
  return NextResponse.json({
    STRIPE_SECRET_KEY: describe(process.env.STRIPE_SECRET_KEY, "sk_test_"),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: describe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      "pk_test_",
    ),
    NEXT_PUBLIC_APP_URL: describe(process.env.NEXT_PUBLIC_APP_URL),
    ADMIN_PASSWORD: describe(process.env.ADMIN_PASSWORD),
    runtime: {
      node: process.version,
      vercel_env: process.env.VERCEL_ENV ?? "not-set",
      vercel_region: process.env.VERCEL_REGION ?? "not-set",
    },
  });
}
