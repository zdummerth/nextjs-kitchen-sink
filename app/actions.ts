"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const addTweet = async (formData: FormData) => {
  try {
    const title = String(formData.get("title"));
    const userId = String(formData.get("user_id"));
    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.from("tweets").insert({ title, user_id: userId });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
