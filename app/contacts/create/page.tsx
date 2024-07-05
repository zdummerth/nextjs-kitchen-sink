import Navigation from "@/components/navigation";
import Breadcrumbs from "@/components/breadcrumb";
import ContactForm from "../contact-form";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";

export default async function Page() {
  const profile = await getProfileOrRedirect();

  return (
    <div>
      <Navigation profile={profile} />
      <div className="p-4 max-w-xl m-auto">
        <Breadcrumbs
          breadcrumbs={[
            { label: "Contacts", href: "/contacts" },
            {
              label: "Create Contact",
              href: "/contacts/create",
              active: true,
            },
          ]}
        />
        <div className="mt-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
