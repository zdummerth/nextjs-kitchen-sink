import TicketForm from "../(components)/ticket-form";
import Navigation from "@/components/navigation";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";
import Breadcrumbs from "@/components/breadcrumb";

const Page = async () => {
  const profile = await getProfileOrRedirect();

  return (
    <div>
      <Navigation profile={profile} />
      <div className="p-4 max-w-xl m-auto">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Tickets", href: "/tickets" },
            {
              label: "Create",
              href: `/tickets/create`,
            },
          ]}
        />
        <TicketForm />
      </div>
    </div>
  );
};

export default Page;
