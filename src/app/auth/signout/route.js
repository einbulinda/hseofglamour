import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function signOut(req) {
  const supabase = createRouteHandlerClient({ cookies });

  // check if there is a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/auth/signin", req.url), {
    status: 302,
  });
}
