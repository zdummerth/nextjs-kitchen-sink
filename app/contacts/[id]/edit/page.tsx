import ContactForm from "../../contact-form";
import Breadcrumbs from "@/components/breadcrumb";
import { fetchContactById } from "../../data";
import { notFound } from "next/navigation";
import Navigation from "@/components/navigation";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const profile = await getProfileOrRedirect();
  const contact = await fetchContactById(id);

  if (!contact) notFound();

  return (
    <main>
      <Navigation profile={profile} />
      <div className="p-4">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Contacts", href: "/contacts" },
            {
              label: contact.name || "Contact",
              href: `/contacts/${id}`,
            },
            {
              label: "Edit",
              href: `/contacts/${id}/edit`,
              active: true,
            },
          ]}
        />
        <ContactForm contact={contact} />
      </div>
    </main>
  );
}
