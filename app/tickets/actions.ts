"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertTicket = async (prevState: any, formData: FormData) => {
  const supabase = createServerActionClient({ cookies });
  const title = formData.get("title");
  const description = formData.get("description");
  const status = formData.get("status");
  const priority = formData.get("priority");
  const progress = formData.get("progress");
  const category = formData.get("category");
  const id = formData.get("id");

  const upsertData = {
    title,
    description,
    status,
    priority,
    progress,
    category,
  };
  if (id === "new") {
    const { error } = await supabase.from("tickets").insert(upsertData);
    if (error) {
      console.log(error);
      return { error: "Failed to create ticket" };
    }
  } else {
    const { error } = await supabase
      .from("tickets")
      .update(upsertData)
      .eq("id", id);
    if (error) {
      console.log(error);
      return { error: "Failed to update ticket" };
    }
  }
  //   revalidatePath("/tickets");
  //   revalidatePath(`/tickets/ticket/new`, "page");
  redirect("/tickets");
};
