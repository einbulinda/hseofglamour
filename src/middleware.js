import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    if (!session && !path.includes("/auth")) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    if (session && path.includes("/auth")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  } catch (error) {
    console.error("Error authenticating user", error);
  }
}

export const config = {
  matcher: ["/", "/auth"],
};
