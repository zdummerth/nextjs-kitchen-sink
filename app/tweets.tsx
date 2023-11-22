"use client";
import Likes from "./likes";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  return tweets.map((tweet) => (
    <div key={tweet.id}>
      <p>{tweet.author.username}</p>
      <p>{tweet.title}</p>
      <Likes tweet={tweet} />
    </div>
  ));
}
