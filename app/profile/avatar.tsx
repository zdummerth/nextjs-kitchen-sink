"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import CameraIcon from "@/lib/svg-icons/camera";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: string;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<string>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setAvatarUrl(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error("No public url found for avatar");
      }
      onUpload(publicUrl);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative drop-shadow-2">
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full overflow-hidden"
            style={{ height: size, width: size }}
          />
        ) : (
          <div className="" style={{ height: size, width: size }} />
        )}
        <label
          htmlFor="profile"
          className={`absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2 ${
            uploading ? "animate-pulse cursor-wait" : ""
          }`}
        >
          <CameraIcon />
          <input
            type="file"
            name="profile"
            id="profile"
            className="sr-only"
            disabled={uploading}
            onChange={uploadAvatar}
          />
        </label>
      </div>
    </div>
  );
}
