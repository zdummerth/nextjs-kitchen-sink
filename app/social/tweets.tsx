"use client";
import Image from "next/image";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  // The following code is for realtime updates which is
  // commented out to reduce db usage while testing.

  //   const supabase = createClientComponentClient();
  //   const router = useRouter();

  //   useEffect(() => {
  //     const channel = supabase
  //       .channel("realtime tweets")
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "*",
  //           schema: "public",
  //           table: "tweets",
  //         },
  //         (payload) => {
  //           router.refresh();
  //         }
  //       )
  //       .subscribe();

  //     return () => {
  //       supabase.removeChannel(channel);
  //     };
  //   }, [supabase, router]);

  return tweets.map((tweet) => (
    <div
      key={tweet.id}
      className="border border-gray-800 border-t-0 px-4 py-8 flex"
    >
      <div className="h-12 w-12">
        <Image
          className="rounded-full"
          src={tweet.author.avatar_url}
          alt="tweet user avatar"
          width={48}
          height={48}
        />
      </div>
      <div className="ml-4">
        <p>
          <span className="font-bold">{tweet.author.username}</span>
        </p>
        <p>{tweet.title}</p>
        <Likes tweet={tweet} />
      </div>
    </div>
  ));
}
