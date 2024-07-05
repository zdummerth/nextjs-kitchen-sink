import Breadcrumbs from "@/components/breadcrumb";
import { fetchTicketById } from "@/app/tickets/data";
import { notFound } from "next/navigation";
import Navigation from "@/components/navigation";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";
import TicketCard from "../(components)/ticket-card";
// import { UpdateContact } from "../buttons";
import {
  UserCircleIcon,
  GlobeAltIcon,
  AtSymbolIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const profile = await getProfileOrRedirect();
  const ticket = await fetchTicketById(id);

  if (!ticket) notFound();

  return (
    <main>
      <Navigation profile={profile} />
      <div className="p-4 max-w-2xl m-auto">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Tickets", href: "/tickets" },
            {
              label: ticket.id.slice(0, 8),
              href: `/tickets/${id}`,
              active: true,
            },
            {
              label: "Edit Ticket",
              href: `/tickets/${id}/edit`,
            },
          ]}
        />
        <TicketCard ticket={ticket} />
      </div>
    </main>
  );
}
