"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="flex flex-col items-center hover:bg-gray-800 p-8 rounded-xl"
    >
      <span className="mb-4">Login With Github</span>
      <Image
        src="/github-mark-white.png"
        alt="GitHub logo"
        width={100}
        height={100}
      />
    </button>
  );
}
