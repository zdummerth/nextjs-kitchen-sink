import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "@/app/login/components/auth-button-server";
import { redirect } from "next/navigation";
import ProductListing, {
  ProductListingAlt,
} from "./components/product-listing";
import Navigation from "@/components/navigation";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    return <div>No profile found for session</div>;
  }

  const { data } = await supabase
    .from("products")
    .select("*, variants: product_variants(*)")
    .order("created_at", { ascending: false });

  if (!data) {
    return <div>No products found</div>;
  }

  return (
    <>
      <Navigation profile={profile} />
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        {data?.map((product) => (
          <div key={product.id}>
            <ProductListingAlt key={product.id} product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
