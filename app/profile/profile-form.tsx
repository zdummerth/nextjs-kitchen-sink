"use client";
import { useState } from "react";
import Avatar from "./avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  async function updateProfile({
    website,
    avatar_url,
  }: {
    website: string | null;
    avatar_url: string | undefined;
  }) {
    try {
      setLoading(true);

      let res = await supabase
        .from("profiles")
        .update({
          website,
          avatar_url: avatar_url,
        })
        .eq("id", profile.id);
      if (res.error) throw res.error;
      router.refresh();
    } catch (error) {
      console.log("Error updating profile: ", error);
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 rounded-md border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
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
      <form
        className="flex flex-col gap-5.5 p-6.5"
        onSubmit={async (e) => {
          e.preventDefault();
          await updateProfile({ website, avatar_url });
        }}
      >
        <div>
          <label className="mb-3 block">Username</label>
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
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
