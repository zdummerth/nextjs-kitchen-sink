import TicketForm from "../(components)/ticket-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type FormTicket = {
  [K in keyof Ticket]: K extends "id" ? string | number : Ticket[K];
};

let defaultTicket: FormTicket = {
  id: "new",
  title: "",
  description: "",
  priority: 1,
  progress: 0,
  status: "not started",
  category: "Hardware Problem",
  created_at: "",
};
const NewTicketPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
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

  return <TicketForm ticket={defaultTicket} />;
};

export default NewTicketPage;
