"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  placeholder,
  resetPage,
}: {
  placeholder: string;
  resetPage?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (resetPage) params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (resetPage) params.set("page", "1");
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (resetPage) params.set("page", "1");
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePriorityChange = (priority: string) => {
    const params = new URLSearchParams(searchParams);
    if (resetPage) params.set("page", "1");
    if (priority) {
      params.set("priority", priority);
    } else {
      params.delete("priority");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (sortOrder: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortOrder) {
      params.set("sort", sortOrder);
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query") || ""}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="mt-4 flex space-x-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            className="mt-1 block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2"
            defaultValue={searchParams.get("category") || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value=""></option>
            <option value="Hardware Problem">Hardware Problem</option>
            <option value="Software Problem">Software Problem</option>
            <option value="Application Development">
              Application Development
            </option>
            <option value="Project">Project</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            className="mt-1 block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2"
            defaultValue={searchParams.get("status") || ""}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value=""></option>
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority"
            className="mt-1 block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2"
            defaultValue={searchParams.get("priority") || ""}
            onChange={(e) => handlePriorityChange(e.target.value)}
          >
            <option value=""></option>
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700"
          >
            Sort By Created At
          </label>
          <select
            id="sort"
            className="mt-1 block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2"
            defaultValue={searchParams.get("sort") || ""}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Select Sort Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}
