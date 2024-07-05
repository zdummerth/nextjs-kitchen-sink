import TicketForm from "../../(components)/ticket-form";
import Navigation from "@/components/navigation";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";
import Breadcrumbs from "@/components/breadcrumb";
import { fetchTicketById } from "../../data";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const profile = await getProfileOrRedirect();
  const ticket = await fetchTicketById(params.id);
  if (!ticket) notFound();

  return (
    <div>
      <Navigation profile={profile} />
      <div className="p-4 max-w-2xl m-auto">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Tickets", href: "/tickets" },
            {
              label: ticket.id.slice(0, 8),
              href: `/tickets/${params.id}`,
            },
            {
              label: "Edit",
              href: `/tickets/${params.id}/edit`,
              active: true,
            },
          ]}
        />
        <TicketForm ticket={ticket} />
      </div>
    </div>
  );
};

export default Page;
