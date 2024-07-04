import TicketForm from "../../(components)/ticket-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProfileOrRedirect } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const TicketPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const profile = await getProfileOrRedirect();

  if (!profile) {
    return <div>No profile found for session</div>;
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: ticket } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!ticket) {
    return <div>No ticket found for session</div>;
  }

  return <TicketForm ticket={ticket} />;
};

export default TicketPage;
