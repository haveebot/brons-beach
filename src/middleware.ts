import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Bron's admin gate — HTTP basic auth on /admin/* routes.
 *
 * Operator-tier surfaces (dashboard, agreement generator, future tools)
 * are gated by ADMIN_PASSWORD env var. Username is "admin", password
 * is whatever ADMIN_PASSWORD resolves to. Browser prompts for creds
 * via native auth dialog.
 *
 * Public routes (everything not under /admin) bypass the gate.
 */

const REALM = "Bron's Admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const expectedPassword = process.env.ADMIN_PASSWORD || "";
  if (!expectedPassword) {
    // No password configured — block access until env var is set
    return new NextResponse("Admin not configured", { status: 503 });
  }

  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
    });
  }

  const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
  const [user, pass] = decoded.split(":");

  if (user === "admin" && pass === expectedPassword) {
    return NextResponse.next();
  }

  return new NextResponse("Invalid credentials", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
