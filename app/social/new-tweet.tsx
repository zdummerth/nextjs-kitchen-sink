"use client";
import { addTweet } from "@/app/social/actions";
import Image from "next/image";
import { useRef, useState } from "react";
// import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import CameraIcon from "@/lib/svg-icons/camera";
import { ImageUpload } from "@/app/social/actions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function NewTweet({ profile }: { profile: Profile }) {
  // const [state, formAction] = useFormState<any>(addTweet, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<ImageUpload | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
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
      ref={ref}
      action={async (formData) => {
        const title = String(formData.get("title"));
        if (!title) {
          toast.error("Title is required!");
          return;
        }
        setUploading(true);
        let image_id = null;
        if (image) {
          const { error: imageUploadError } = await supabase.storage
            .from("tweet_images")
            .upload(image.file_name, image.file);
          if (imageUploadError) {
            console.log(imageUploadError);
            toast.error("Error uploading image!");
            setUploading(false);
            return;
          }
          const {
            data: { publicUrl },
          } = supabase.storage
            .from("tweet_images")
            .getPublicUrl(image.file_name);

          const { data: imageData, error: imageError } = await supabase
            .from("tweet_image")
            .insert({
              width: image.width,
              height: image.height,
              url: publicUrl,
              file_name: image.file_name,
            })
            .select()
            .single();
          if (imageError) {
            toast.error("Error uploading image!");
            setUploading(false);
            return;
          }
          image_id = imageData.id;
        }

        const { error: tweetError } = await supabase
          .from("tweets")
          .insert({ title, user_id: profile.id, image_id });
        if (tweetError) {
          console.log(tweetError);
          toast.error("Error inserting tweet!");
          return { error: "Error inserting tweet" };
        }
        router.refresh();
        ref.current?.reset();
        setImage(undefined);
        setUploading(false);
      }}
      className="block relative mx-2 my-4 pb-4 rounded-md bg-gray-3 dark:bg-boxdark dark:text-white"
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
            className="absolute top-1 right-1 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
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
      <div className="flex justify-end">
        <label
          htmlFor="profile"
          className={`mx-4 mt-4 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full border text-black dark:text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2`}
        >
          <CameraIcon />
          <input
            type="file"
            name="profile"
            id="profile"
            className="sr-only"
            disabled={uploading}
            onChange={onImageChange}
          />
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={uploading}
          className={`${
            uploading ? "animate-pulse cursor-wait" : ""
          } bg-primary text-white px-4 py-2 rounded-full mr-4 mt-2`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
