"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const loginUser = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email: String(email),
    password: String(password),
  });

  if (error) {
    console.log({ error: error.message });
    return { error: error.message };
  }
};
