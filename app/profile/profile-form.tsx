"use client";
import { useState } from "react";
import Avatar from "./avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const isDemoUser = (username: string) =>
  ["peter-doe", "john-doe", "tracy-doe"].includes(username);

export default function AccountForm({ profile }: { profile: Profile }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [website, setWebsite] = useState<string | null>(profile.website);
  const [avatar_url, setAvatarUrl] = useState<string | undefined>(
    profile.avatar_url
  );
  const [username, setUsername] = useState<string | null>(profile.username);

  console.log("profile in AccountForm: ", avatar_url);
  async function updateProfile({
    website,
    avatar_url,
  }: {
    website: string | null;
    avatar_url: string | undefined;
  }) {
    try {
      setLoading(true);
      console.log("update params: ", { website, avatar_url });

      let res = await supabase
        .from("profiles")
        .update({
          website,
          avatar_url: avatar_url,
        })
        .eq("id", profile.id);
      console.log("res in updateProfile: ", res);
      if (res.error) throw res.error;
    } catch (error) {
      console.log("Error updating profile: ", error);
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col items-center border-b border-stroke py-16 dark:border-strokedark">
        <Avatar
          uid={profile.id}
          url={avatar_url || ""}
          size={100}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ website, avatar_url: url });
          }}
        />
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Username
          </label>
          <span className="text-red-600">
            {isDemoUser(profile.username) && "Disbaled for demo users"}
          </span>
          <input
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isDemoUser(profile.username)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Website
          </label>
          <input
            type="text"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://www.example.com"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div>
          <button
            onClick={() => updateProfile({ website, avatar_url })}
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
