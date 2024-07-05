import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchContacts } from "./data";

export default async function TaxpayersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const contacts = await fetchContacts(query, currentPage);

  if (!contacts) notFound();

  const rowsToDisplay = 3;
  const blankRows = Array.from(
    { length: rowsToDisplay - contacts.length },
    (_, index) => (
      <tr
        key={`blank-${index}`}
        className="w-full border-b py-3 text-sm last-of-type:border-none h-16"
      >
        <td className="whitespace-nowrap py-3 pl-6 pr-3 h-16"></td>
        <td className="whitespace-nowrap px-3 py-3 h-16"></td>
        <td className="whitespace-nowrap px-3 py-3 h-16"></td>
        <td className="whitespace-nowrap px-3 py-3 h-16"></td>
      </tr>
    )
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          <div className="md:hidden">
            {contacts?.map((contact) => (
              <div
                key={contact.id}
                className="mb-2 w-full rounded-md border-b border-blue-400 p-4"
              >
                <div className="flex flex-col pb-4">
                  <div className="mb-2">
                    <Link href={`/contacts/${contact.id}/edit`}>
                      <p className="text-xl text-blue-400 font-semibold hover:underline">
                        {contact.name}
                      </p>
                    </Link>
                  </div>
                  <p>
                    <span className="text-gray-500">{contact.email}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">{contact.phone}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">{contact.address}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="">
              {contacts?.map((contact) => (
                <tr
                  key={contact.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none h-16 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 h-16">
                    <Link href={`/contacts/${contact.id}/edit`}>
                      <p className="text-blue-600 hover:underline">
                        {contact.name}
                      </p>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 h-16">
                    {contact.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 h-16">
                    {contact.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 h-16">
                    {contact.address}
                  </td>
                </tr>
              ))}
              {blankRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
