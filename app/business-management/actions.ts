"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const createAddresss = async (prev: any, formData: any) => {
  try {
    const house_number = String(formData.get("house_number"));
    const street_name = String(formData.get("street_name"));
    const secondary_address = String(formData.get("secondary_address"));
    const city = String(formData.get("city"));
    const state = String(formData.get("state"));
    const zip = String(formData.get("zip"));

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.from("addresses").insert({
      house_number,
      street_name,
      secondary_address,
      city,
      state,
      zip,
    });
    // revalidatePath("/");
    // console.log("prev in form action: ", prev);
    return { ...prev, success: true };
  } catch (error) {
    console.log(error);
    return { ...prev, error: true };
  }
};

export const createContact = async (prev: any, formData: any) => {
  try {
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const phone = String(formData.get("phone"));
    const business_id = String(formData.get("business_id"));

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.from("contacts").insert({
      name,
      email,
      phone,
      business_id,
    });
    // revalidatePath("/");
    // console.log("prev in form action: ", prev);
    return { ...prev, success: true };
  } catch (error) {
    console.log(error);
    return { ...prev, error: true };
  }
};
