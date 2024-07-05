"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(10, "Phone number must be 10 characters")
    .max(10, "Phone number must be 10 characters"),
  address: z.string().min(3, "Address must be at least 3 characters"),
});

export type ContactState = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
  };
  message?: string | null;
};

export const createContact = async (
  prevState: ContactState,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  });

  if (!validatedFields.success) {
    console.log("validatedFields.error", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Taxpayer.",
    };
  }

  const { name, email, phone, address } = validatedFields.data;

  console.log({
    name,
    email,
    phone,
    address,
  });

  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase.from("contacts").insert({
    name,
    email,
    phone,
    address,
  });

  if (error) {
    return {
      message: "Database Error: Failed to Create Contact",
    };
  }
  revalidatePath("/contacts");
  redirect("/contacts");
};

export const updateContact = async (
  id: string,
  prevState: ContactState,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
  });

  if (!validatedFields.success) {
    console.log("validatedFields.error", validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Contact.",
    };
  }

  const { name, email, phone, address } = validatedFields.data;

  console.log({
    name,
    email,
    phone,
    address,
  });

  const supabase = createServerActionClient<Database>({ cookies });

  const { error } = await supabase
    .from("contacts")
    .update({ name, email, phone, address })
    .eq("id", id);

  if (error) {
    return {
      message: "Database Error: Failed to Update Contact",
    };
  }
  revalidatePath("/contacts");
  redirect(`/contacts/${id}`);
};
