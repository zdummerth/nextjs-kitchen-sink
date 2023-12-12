"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import PhotoIcon from "@/lib/svg-icons/photo";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/loading-dots";
import { uploadFile } from "@/lib/supabase-client";

type ImageUpload = {
  width: number;
  height: number;
  url: string;
  file_name: string;
  file: File;
};

export default function NewTweet({ profile }: { profile: Profile }) {
  const [image, setImage] = useState<ImageUpload | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const onImageChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const dataurl = URL.createObjectURL(file);
      const fileExt = file.name.split(".").pop();
      const file_name = `${profile.id}-${Math.random()}.${fileExt}`;
      var img: HTMLImageElement;
      img = document.createElement("img");

      img.onload = function () {
        setImage({
          width: img.naturalWidth,
          height: img.naturalHeight,
          url: dataurl,
          file_name,
          file,
        });
      };

      img.src = dataurl;
    } catch (error) {
      alert("Error reading image!");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!title) {
          toast.error("Title is required!");
          return;
        }
        setUploading(true);
        let image_id = null;
        if (image) {
          const { error: imageUploadError, url } = await uploadFile({
            bucket: "tweet_images",
            file: image.file,
          });
          if (!url) {
            console.log(imageUploadError);
            toast.error("Error uploading image!");
            setUploading(false);
            return;
          }

          const { data: imageData, error: imageError } = await supabase
            .from("tweet_image")
            .insert({
              width: image.width,
              height: image.height,
              url: url,
              file_name: image.file_name,
            })
            .select()
            .single();
          if (imageError) {
            toast.error("Error inserting image!");
            setUploading(false);
            return;
          }
          image_id = imageData.id;
        }

        const { error: tweetError } = await supabase
          .from("tweets")
          .insert({ title, user_id: profile.id, image_id });
        if (tweetError) {
          toast.error("Error inserting tweet!");
          return { error: "Error inserting tweet" };
        }
        setImage(undefined);
        setUploading(false);
        setTitle("");
        router.refresh();
      }}
      className="block relative my-4 rounded-md bg-gray-3 dark:bg-boxdark dark:text-white"
    >
      <Image
        src={profile.avatar_url}
        alt="user avatar"
        width={24}
        height={24}
        className="rounded-full absolute top-2 left-2"
      />
      <textarea
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows={3}
        className="resize-none block w-full bg-inherit rounded-t-md outline-none py-1.5 pl-12 pr-20"
        placeholder="What's happening?"
      />
      <input type="hidden" name="user_id" value={profile.id} />
      {image && (
        <div className="relative mx-2 mt-2">
          <button
            onClick={() => {
              setImage(undefined);
            }}
            type="button"
            className="absolute top-1 right-1 text-white bg-black/75 rounded-full w-6 h-6 flex items-center justify-center"
          >
            X
          </button>
          <Image
            src={image.url}
            alt="tweet image preview"
            width={image.width}
            height={image.height}
            className={`rounded-md overflow-hidden`}
          />
        </div>
      )}
      <div className="flex justify-between items-center py-2 mx-2 mt-2 border-t-[1px]">
        <label
          htmlFor="profile"
          className={`block h-8.5 w-8.5 flex justify-center items-center cursor-pointer text-black dark:text-white hover:text-cyan-400 sm:bottom-2 sm:right-2`}
        >
          <PhotoIcon />
          <input
            type="file"
            name="profile"
            id="profile"
            className="sr-only"
            disabled={uploading}
            onChange={onImageChange}
          />
        </label>
        <button
          type="submit"
          disabled={uploading}
          className={`${
            uploading ? "animate-pulse cursor-wait" : ""
          } bg-cyan-500 text-white w-18 h-10 rounded-full hover:bg-opacity-90`}
        >
          {uploading ? <LoadingDots /> : "Post"}
        </button>
      </div>
    </form>
  );
}
