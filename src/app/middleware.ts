import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Jika tidak ada token atau role bukan admin, redirect ke home
  if (!token || token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Terapkan middleware hanya pada halaman admin
export const config = {
  matcher: ["/admin/:path*"],
};
