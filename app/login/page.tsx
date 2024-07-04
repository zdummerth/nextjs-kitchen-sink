import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GitHubButton from "@/app/login/components/github-button";
import Link from "next/link";
import AuthForm from "./components/auth-form";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Link
        className="flex flex-col items-center bg-emerald-700 hover:bg-emerald-500 p-4 rounded-xl"
        href="/login/demo"
      >
        View Demo
      </Link>
      {/* <AuthForm /> */}
    </div>
  );
}
