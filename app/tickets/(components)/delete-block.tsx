"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const DeleteBlock = ({ id }: { id: number }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const deleteTicket = async () => {
    const { error } = await supabase.from("tickets").delete().match({ id: id });
    if (!error) {
      router.refresh();
    }
  };

  return (
    <XMarkIcon
      className="w-5 h-5 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
