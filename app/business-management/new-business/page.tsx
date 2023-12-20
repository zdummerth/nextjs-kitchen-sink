import ContactForm from "../contact-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation";
import StripeAddressForm from "../../stripe-address-form";
import Autocomplete from "react-google-autocomplete";
import NewBusinessForm from "../create-business-form";

export default async function NewBusinessPage() {
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
      <div className="p-4">
        <h1>Add New Business</h1>
        {/* <StripeAddressForm /> */}
        <NewBusinessForm />
      </div>
    </div>
  );
}
