import ContactForm from "./contact-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation";
import StripeAddressForm from "../stripe-address-form";
import Link from "next/link";

export default async function BusinessHomePage() {
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
  return (
    <div>
      <Navigation profile={profile} />
      <h1>Businesses</h1>
      <Link
        href="/business-management/new-business"
        className="block bg-blue-500 rounded-full text-center"
      >
        Add New Business
      </Link>
    </div>
  );
}
