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

  // console.log(tweets[0]);

  return tweets.map((tweet) => (
    <div
      key={tweet.id}
      className="px-4 py-4 flex rounded-md shadow-sm shadow-cyan-200 bg-zinc-100 dark:bg-zinc-600 dark:text-white"
    >
      <div className="relative w-8 flex-none">
        <Image
          className="rounded-full w-full"
          src={tweet.author.avatar_url}
          alt="tweet user avatar"
          width={48}
          height={48}
        />
      </div>
      <div className="ml-2">
        <p>
          <span className="font-bold">{tweet.author.username}</span>
        </p>
        <p className="mb-1">{tweet.title}</p>
        {tweet.image && (
          <div className="rounded-md overflow-hidden mb-2">
            <Image
              src={tweet.image.url}
              alt="tweet image"
              width={tweet.image.width}
              height={tweet.image.height}
            />
          </div>
        )}
        <Likes tweet={tweet} />
      </div>
    </div>
  ));
}
