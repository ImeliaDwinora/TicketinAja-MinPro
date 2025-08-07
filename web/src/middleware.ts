import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const payload = await verifyJWT(accessToken);
  if (!payload) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const userRole = payload.role;

  if (pathname.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  if (
    pathname.startsWith("/dashboard/event-organizer") &&
    userRole !== "EVENT_ORGANIZER"
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/transactions"],
};
