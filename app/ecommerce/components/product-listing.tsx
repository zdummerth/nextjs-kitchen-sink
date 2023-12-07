import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default function ProductListing({ product }: { product: Product }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("product_images")
    .getPublicUrl(product.featured_image || "");

  const imageUrl = publicUrl || "https://placehold.co/600";

  return (
    <Link
      href={`shop/product/${product.title_slug}`}
      className="relative block group overflow-hidden rounded"
    >
      <Image
        src={imageUrl}
        alt={product.title}
        width={600}
        height={600}
        className="group-hover:scale-110 transition-all duration-500"
      />
      <h1 className="absolute bottom-2 left-2 rounded-full bg-slate-900/90 py-2 px-4 text-lg font-semibold">
        {product.title}
      </h1>
    </Link>
  );
}
