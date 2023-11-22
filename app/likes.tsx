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
      <button disabled={loading} onClick={handleLikes}>
        {dataState.likes} Likes
      </button>
    </>
  );
}
