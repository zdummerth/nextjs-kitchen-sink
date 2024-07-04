import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation";
import TicketCard from "@/app/tickets/(components)/ticket-card";
import Link from "next/link";
import { TicketIcon } from "@heroicons/react/16/solid";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    return <div>No profile found for session</div>;
  }

  const { data: tickets } = await supabase.from("tickets").select("*");

  if (!tickets) {
    return <p>No tickets.</p>;
  }

  const uniqueCategories = Array.from(
    new Set(tickets?.map(({ category }: { category: string }) => category))
  );

  return (
    <div className="w-full">
      <Navigation profile={profile} />
      <Link
        href="/tickets/new-ticket"
        className="m-4 flex gap-2 w-fit bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
      >
        <TicketIcon className="w-5 h-5" />
        <span>Create Ticket</span>
      </Link>
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory) => (
            <div key={uniqueCategory} className="m-4">
              <h2 className="mb-2">{uniqueCategory}</h2>
              <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter(
                    (ticket: Ticket) => ticket.category === uniqueCategory
                  )
                  .map((filteredTicket: Ticket) => (
                    <TicketCard
                      key={filteredTicket.id}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
