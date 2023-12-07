import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // console.log("req url: ", req);
  const body = await req.json();
  console.log("body in login route: ", body);
  // const formData = await req.formData();
  // const email = formData.get("email");
  // const password = formData.get("password");
  // return NextResponse.redirect(new URL("/login/demo", req.url), {
  //   status: 302,
  // });

  if (!body?.email || !body?.password) {
    // return NextResponse.redirect(
    //   new URL("/login/demo?error=passwordrequired", req.url),
    //   {
    //     status: 302,
    //   }
    // );
    return NextResponse.json(
      { error: "password and email required", success: true },
      { status: 400 }
    );
  }
  // console.log("req email", formData.get("email"));
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // return NextResponse.redirect(new URL("/", req.url), {
    //   status: 302,
    // });
    return NextResponse.json({ error: false, success: true }, { status: 200 });
  }

  const { error, data } = await supabase.auth.signInWithPassword({
    email: String(body.email),
    password: String(body.password),
  });

  // console.log("data in login route: ", data.session);
  const {
    data: { session: s2 },
  } = await supabase.auth.getSession();

  console.log("s2 in login route: ", s2);

  if (error) {
    // return NextResponse.redirect(
    //   new URL("/login/demo?error=invalidcredentials", req.url),
    //   {
    //     status: 302,
    //   }
    // );
    return NextResponse.json(
      { error: "invalid credentials", success: false },
      { status: 400 }
    );
  }

  // const { data: sd, error: se } = await supabase.auth.setSession({
  //   access_token,
  //   refresh_token,
  // });

  return NextResponse.json({ error: false, success: true }, { status: 200 });
}
