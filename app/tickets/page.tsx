import Navigation from "@/components/navigation";
import TicketCard from "@/app/tickets/(components)/ticket-card";
import Link from "next/link";
import { TicketIcon } from "@heroicons/react/16/solid";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";
import { fetchTickets, fetchTicketPages } from "./data";
import Pagination from "@/app/contacts/pagination";
import Search from "./search";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    status?: string;
    priority?: number;
    category?: string;
    sort?: string;
  };
}) {
  const profile = await getProfileOrRedirect();
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const filters =
    searchParams?.status || searchParams?.priority || searchParams?.category
      ? {
          ...(searchParams.status && { status: searchParams.status }),
          ...(searchParams.priority && {
            priority: Number(searchParams.priority),
          }),
          ...(searchParams.category && { category: searchParams.category }),
        }
      : undefined;

  const tickets = await fetchTickets(
    query,
    currentPage,
    filters,
    searchParams?.sort
  );

  const totalPages = await fetchTicketPages(query, filters);

  // console.log(tickets);
  return (
    <div className="w-full">
      <Navigation profile={profile} />
      <Link
        href="/tickets/create"
        className="m-4 flex gap-2 w-fit bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
      >
        <TicketIcon className="w-5 h-5" />
        <span>Create Ticket</span>
      </Link>
      <div className="m-4 flex items-center justify-between gap-2 md:mt-8">
        <Search resetPage placeholder="Search tickets..." />
      </div>
      <div>
        {tickets && (
          <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            {tickets.map((filteredTicket: Ticket) => (
              <TicketCard key={filteredTicket.id} ticket={filteredTicket} />
            ))}
          </div>
        )}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
