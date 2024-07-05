import Breadcrumbs from "@/components/breadcrumb";
import { fetchContactById } from "@/app/contacts/data";
import { notFound } from "next/navigation";
import Navigation from "@/components/navigation";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";
import { UpdateContact } from "../buttons";
import {
  UserCircleIcon,
  GlobeAltIcon,
  AtSymbolIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

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
              active: true,
            },
          ]}
        />
        <UpdateContact id={id} />
        <div className="border border-gray-800 p-4">
          {/* Contact Name */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Name</label>
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-[18px] w-[18px] text-gray-500" />
              <span>{contact.name}</span>
            </div>
          </div>

          {/* Contact Email */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <div className="flex items-center space-x-2">
              <AtSymbolIcon className="h-[18px] w-[18px] text-gray-500" />
              <span>{contact.email}</span>
            </div>
          </div>

          {/* Contact Phone */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-[18px] w-[18px] text-gray-500" />
              <span>{contact.phone}</span>
            </div>
          </div>

          {/* Contact Address */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Address</label>
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="h-[18px] w-[18px] text-gray-500" />
              <span>{contact.address}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
