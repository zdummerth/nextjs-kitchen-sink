import Navigation from "@/components/navigation";
import { Suspense } from "react";
import Table from "@/app/contacts/table";
import { ContactsTableSkeleton } from "../ui/skeletons";
import { fetchContactPages } from "./data";
import Pagination from "@/app/contacts/pagination";
import Search from "./search";
import { CreateContact } from "./buttons";
import getProfileOrRedirect from "@/lib/get-profile-or-redirect";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const profile = await getProfileOrRedirect();

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchContactPages(query);
  return (
    <div>
      <Navigation profile={profile} />
      <div className="m-4 flex items-center justify-between gap-2 md:mt-8">
        <Search resetPage placeholder="Search contacts..." />
        <CreateContact />
      </div>
      <Suspense key={query + currentPage} fallback={<ContactsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
