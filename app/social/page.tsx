import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../login/components/auth-button-server";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation";

import NewTweet from "./new-tweet";
import Tweets from "./tweets";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id), image: tweet_image(*)")
    .order("created_at", { ascending: false });

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    return <div>No profile found for session</div>;
  }

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];

  return (
    <div className="w-full">
      <Navigation profile={profile} />
      <div className="max-w-xl mx-auto px-2">
        <NewTweet profile={profile} />
        <div className="flex flex-col gap-6 mt-4">
          <Tweets tweets={tweets} />
        </div>
      </div>
    </div>
  );
}
