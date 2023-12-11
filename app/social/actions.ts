"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type ImageUpload = {
  width: number;
  height: number;
  url: string;
  file_name: string;
  file: File;
};

export const addTweet = async (
  formData: FormData,
  image?: ImageUpload | undefined
) => {
  try {
    const title = String(formData.get("title"));
    const userId = String(formData.get("user_id"));
    if (!title) {
      return { error: "Missing title" };
    }
    const supabase = createServerActionClient<Database>({ cookies });
    let tweetImageId = null;
    if (image) {
      const { error } = await supabase.storage
        .from("tweet_image")
        .upload(image.file_name, image.file);
      if (error) {
        console.log(error);
        return { error: "Error uploading image" };
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("tweet_image").getPublicUrl(image.file_name);
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
        console.log(imageError);
        return { error: "Error inserting image" };
      }
      tweetImageId = imageData.id;
    }

    const { error: tweetError } = await supabase
      .from("tweets")
      .insert({ title, user_id: userId, image_id: tweetImageId });
    if (tweetError) {
      console.log(tweetError);
      return { error: "Error inserting tweet" };
    }
    revalidatePath("/social");
    return { error: "" };
  } catch (error) {
    console.log(error);
    return { error: "Unknown Error" };
  }
};
