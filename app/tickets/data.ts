import { unstable_noStore as noStore } from "next/cache";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Add noStore() to prevent the response from being cached.
// This is equivalent to in fetch(..., {cache: 'no-store'}).

export async function fetchTicketById(id: string) {
  noStore();

  try {
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("tickets")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch ticket.");
    }

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ticket.");
  }
}

type ColumnFilters = {
  status?: string;
  priority?: number;
  category?: string;
};
const ITEMS_PER_PAGE = 5;
export async function fetchTickets(
  query: string,
  currentPage: number,
  filters?: ColumnFilters,
  sort?: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endingPage = offset + ITEMS_PER_PAGE - 1;

  try {
    const supabase = createServerComponentClient<Database>({ cookies });
    const ascending = sort === "asc" ? true : false;

    const dbCall = filters
      ? supabase
          .from("tickets")
          .select("*")
          .match(filters)
          .or(
            `status.ilike.%${query}%,category.ilike.%${query}%,title.ilike.%${query}%,description.ilike.%${query}%`
          )
          .order("created_at", { ascending })
          .range(offset, endingPage)
      : supabase
          .from("tickets")
          .select("*")
          .or(
            `status.ilike.%${query}%,category.ilike.%${query}%,title.ilike.%${query}%,description.ilike.%${query}%`
          )
          .order("created_at", { ascending })
          .range(offset, endingPage);

    const { data, error } = await dbCall;

    if (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch tickets.");
    }

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tickets.");
  }
}

export const fetchTicketPages = async (
  query: string,
  filters?: ColumnFilters
) => {
  noStore();

  try {
    const supabase = createServerComponentClient<Database>({ cookies });

    const dbCall = filters
      ? supabase
          .from("tickets")
          .select("*", { count: "exact", head: true })
          .match(filters)
          .or(
            `status.ilike.%${query}%,category.ilike.%${query}%,title.ilike.%${query}%,description.ilike.%${query}%`
          )
      : supabase
          .from("tickets")
          .select("*", { count: "exact", head: true })
          .or(
            `status.ilike.%${query}%,category.ilike.%${query}%,title.ilike.%${query}%,description.ilike.%${query}%`
          );

    const { count, status, statusText } = await dbCall;

    if (status !== 200) {
      console.error("Database Error:", statusText);
      throw new Error("Failed to fetch contact pages.");
    }

    if (count === null) {
      throw new Error("Failed to fetch ticket pages. Count is null.");
    }

    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch ticket pages.");
  }
};
