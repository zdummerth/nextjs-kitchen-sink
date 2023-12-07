"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginUser = async (formData: FormData) => {
  console.log(" in login action");
  const email = formData.get("email");
  const password = formData.get("password");
  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email: String(email),
    password: String(password),
    // password: "wrong",
  });

  if (error) {
    console.log({ error: error.message });
    return { error: error.message };
  }
};
