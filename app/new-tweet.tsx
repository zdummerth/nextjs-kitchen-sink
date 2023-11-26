"use client";
import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { useFormState, useFormStatus } from "react-dom";
import { addTweet } from "@/app/actions";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  success: false,
};
export default function NewTweet({ user }: { user: User }) {
  // const [state, formAction] = useFormState<any>(addTweet, initialState);
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        const title = formData.get("title");
        if (!title) return;
        const toastId = toast.loading("");

        await addTweet(formData);
        ref.current?.reset();
        toast.update(toastId, {
          render: "Tweeted",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      }}
      className="border border-gray-800 border-t-0"
    >
      <div className="flex py-8 px-4">
        <div>
          <Image
            src={user.user_metadata.avatar_url}
            alt="user avatar"
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <input
          name="title"
          className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2"
          placeholder="What's happening?"
        />
        {/* Create hidden input with user id */}
        <input type="hidden" name="user_id" value={user.id} />
      </div>
    </form>
  );
}
