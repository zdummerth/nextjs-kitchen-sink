"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

const TicketSchema = z.object({
  title: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  status: z.string().min(3, "Status must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  priority: z.number().min(1, "Priority must be at least 1"),
  progress: z.number().min(0, "Progress must be at least 0"),
});

export type TicketState = {
  errors?: {
    title?: string[];
    description?: string[];
    status?: string[];
    category?: string[];
    priority?: string[];
    progress?: string[];
  };
  message?: string | null;
};

export const createTicket = async (
  prevState: TicketState,
  formData: FormData
) => {
  const priorityInt = parseInt(formData.get("priority") as string);
  const progressInt = parseInt(formData.get("progress") as string);
  const validatedFields = TicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    category: formData.get("category"),
    priority: priorityInt,
    progress: progressInt,
    // assigned_to: formData.get("assigned_to"),
  });

  if (!validatedFields.success) {
    console.log("validatedFields.error", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Taxpayer.",
    };
  }

  const { title, description, status, category, priority, progress } =
    validatedFields.data;

  const supabase = createServerActionClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("tickets")
    .insert({
      title,
      description,
      status,
      category,
      priority,
      progress,
    })
    .select();

  if (error) {
    return {
      message: "Database Error: Failed to Create Ticket",
    };
  }

  console.log("data", data);
  revalidatePath("/tickets");
  redirect(`/tickets/${data[0].id}`);
};

export const updateTicket = async (
  id: string,
  prevState: TicketState,
  formData: FormData
) => {
  const priorityInt = parseInt(formData.get("priority") as string);
  const progressInt = parseInt(formData.get("progress") as string);
  const validatedFields = TicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    category: formData.get("category"),
    priority: priorityInt,
    progress: progressInt,
  });

  if (!validatedFields.success) {
    console.log("validatedFields.error", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Ticket.",
    };
  }

  const { title, description, status, category, priority, progress } =
    validatedFields.data;

  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase
    .from("tickets")
    .update({
      title,
      description,
      status,
      category,
      priority,
      progress,
    })
    .eq("id", id);

  if (error) {
    return {
      message: "Database Error: Failed to Update Ticket",
    };
  }
  revalidatePath("/tickets");
  redirect(`/tickets/${id}`);
};

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
