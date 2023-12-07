"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function CreateDemoUser() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "peter-doe@demo.com",
      password: "example-password",
      options: {
        emailRedirectTo: "http://localhost:3000/",
        data: {
          user_name: "peter-doe",
          avatar_url: "https://ui-avatars.com/api/?name=Peter+Doe",
        },
      },
    });

    if (error) {
      console.error(error);
      return;
    }
    if (!data) {
      return;
    }
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: data?.session?.access_token || "",
      refresh_token: data?.session?.refresh_token || "",
    });
    if (sessionError) {
      console.error(sessionError);
      return;
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex flex-col items-center bg-emerald-700 hover:bg-emerald-500 p-4 rounded-xl"
    >
      <span className="">View Demo</span>
    </button>
  );
}
