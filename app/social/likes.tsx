import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Likes({ tweet }: { tweet: TweetWithAuthor }) {
  const [loading, setLoading] = useState(false);
  const [dataState, setDataState] = useState({
    user_has_liked_tweet: tweet.user_has_liked_tweet,
    likes: tweet.likes,
  });

  const handleLikes = async () => {
    if (loading) return;
    const toastId = toast.loading("");
    setLoading(true);

    try {
      const supabase = createClientComponentClient<Database>();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        if (dataState.user_has_liked_tweet) {
          setDataState({
            ...dataState,
            user_has_liked_tweet: false,
            likes: dataState.likes - 1,
          });
          const { error } = await supabase
            .from("likes")
            .delete()
            .match({ user_id: user.id, tweet_id: tweet.id });
          if (error) {
            throw error;
          }
          toast.update(toastId, {
            render: "Unliked",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
        } else {
          setDataState({
            ...dataState,
            user_has_liked_tweet: true,
            likes: dataState.likes + 1,
          });
          const { error } = await supabase
            .from("likes")
            .insert({ user_id: user.id, tweet_id: tweet.id });
          if (error) {
            throw error;
          }
          toast.update(toastId, {
            render: "Liked",
            type: "success",
            isLoading: false,
            autoClose: 1500,
          });
        }
      }
    } catch (error) {
      setDataState({
        user_has_liked_tweet: tweet.user_has_liked_tweet,
        likes: tweet.likes,
      });
      toast.update(toastId, {
        render: "Error",
        type: "error",
        isLoading: false,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        disabled={loading}
        onClick={handleLikes}
        className="group flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`group-hover:fill-red-600 group-hover:stroke-red-600 ${
            dataState.user_has_liked_tweet
              ? "fill-red-600 stroke-red-600"
              : "fill-none stroke-black dark:stroke-white"
          }`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span
          className={`ml-2 text-sm group-hover:text-red-600 ${
            dataState.user_has_liked_tweet ? "text-red-600" : "text-gray-500"
          }`}
        >
          {dataState.likes}
        </span>
      </button>
    </>
  );
}
