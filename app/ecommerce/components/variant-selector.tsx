"use client";

import clsx from "clsx";
import { createUrl } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function VariantSelector({ variants }: { variants: ProductVariant[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  <dl className="mb-8">
    <dd className="flex flex-wrap gap-3">
      {variants.map((variant) => {
        const variantTitleLowerCase = variant.title.toLowerCase();

        // Base option params on current params so we can preserve any other param state in the url.
        const titleSearchParams = new URLSearchParams(searchParams.toString());

        titleSearchParams.set("title", variantTitleLowerCase);
        const variantUrl = createUrl(pathname, titleSearchParams);

        // The option is active if it's in the url params.
        const isActive =
          searchParams.get(variantTitleLowerCase) === variantTitleLowerCase;

        return (
          <button
            key={variantTitleLowerCase}
            //   aria-disabled={!isAvailableForSale}
            //   disabled={!isAvailableForSale}
            onClick={() => {
              router.replace(variantUrl, { scroll: false });
            }}
            title={variantTitleLowerCase}
            className={clsx(
              "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
              {
                "cursor-default ring-2 ring-blue-600": isActive,
                "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ":
                  !isActive,
              }
            )}
          >
            {variantTitleLowerCase}
          </button>
        );
      })}
    </dd>
  </dl>;
}
