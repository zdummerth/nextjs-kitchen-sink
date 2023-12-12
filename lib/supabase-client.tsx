import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type UploadFileProps = {
  bucket: string;
  folder_path?: string;
  file: File;
};

export const uploadFile = async ({
  bucket,
  folder_path = "",
  file,
}: UploadFileProps) => {
  if (folder_path && !folder_path.endsWith("/")) {
    return { error: "Folder path must end with a slash", url: null };
  }
  const supabase = createClientComponentClient<Database>();
  const fileExt = file.name.split(".").pop();
  const filePath = `${folder_path}${Math.random()}.${fileExt}`;
  let { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  if (uploadError) {
    return { error: uploadError, url: null };
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);
  if (!publicUrl) {
    return { error: "No public url found", url: null };
  }
  return {
    url: publicUrl,
    file_name: filePath,
  };
};
