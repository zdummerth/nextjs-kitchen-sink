import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "@/app/login/components/auth-button-server";
import { redirect } from "next/navigation";
import ProductListing from "./components/product-listing";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("products")
    .select("*, variants: product_variants(*)")
    .order("created_at", { ascending: false });

  return (
    <div className="w-full max-w-3xl mx-auto p-2">
      <div className="flex justify-between items-center px-4 py-6 border border-gray-800 border-t-0">
        <h1 className="text-xl font-bold">Home</h1>
        <span>{session.user.user_metadata.user_name}</span>
        <AuthButtonServer />
      </div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {data?.map((product) => (
          <ProductListing key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
