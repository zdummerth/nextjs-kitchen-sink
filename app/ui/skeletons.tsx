// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-16">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3 h-16">
        <div className="flex items-center gap-3 h-full">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3 h-16">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3 h-16">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3 h-16">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md p-4 h-auto">
      <div className="flex flex-col border-b border-gray-100 pb-8">
        <div className="flex items-center mb-2">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="mb-2">
          <div className="h-6 w-48 rounded bg-gray-100"></div>
        </div>
        <div className="mb-2">
          <div className="h-6 w-48 rounded bg-gray-100"></div>
        </div>
        <div className="mb-2">
          <div className="h-6 w-48 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function ContactsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
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
            <tbody>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
