import { unstable_noStore as noStore } from "next/cache";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Add noStore() to prevent the response from being cached.
// This is equivalent to in fetch(..., {cache: 'no-store'}).

export async function fetchContactById(id: string) {
  noStore();

  try {
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("contacts")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch contact.");
    }

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch contact.");
  }
}

const ITEMS_PER_PAGE = 3;
export async function fetchContacts(query: string, currentPage: number) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endingPage = offset + ITEMS_PER_PAGE - 1;

  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .or(
        `name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%,address.ilike.%${query}%`
      )
      .range(offset, endingPage);

    if (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch taxpayers.");
    }

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export const fetchContactPages = async (query: string) => {
  noStore();

  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { count, status, statusText } = await supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .or(
        `name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%,address.ilike.%${query}%`
      );

    if (status !== 200) {
      console.error("Database Error:", statusText);
      throw new Error("Failed to fetch contact pages.");
    }

    if (count === null) {
      throw new Error("Failed to fetch contact pages. Count is null.");
    }

    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch contact pages.");
  }
};
