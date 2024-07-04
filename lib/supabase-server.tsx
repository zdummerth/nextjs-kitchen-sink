import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getPublicUrl = (supabase: any, path: string) => {
  const placeholderImage = "https://placehold.co/600/png?text=No+Image";
  if (!path) return placeholderImage;
  const {
    data: { publicUrl },
  } = supabase.storage.from("product_images").getPublicUrl(path);
  const imageUrl = publicUrl || placeholderImage;

  return imageUrl;
};

const redirectToLogin = (supabase: any) => {
  return async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/login");
    }
  };
};

export const getProfileOrRedirect = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (!profile) {
    return null;
  }

  return profile;
};

export async function getProduct({
  id,
  slug,
  redirectOnNoSession = false,
}: {
  id?: string;
  slug: string;
  redirectOnNoSession?: boolean;
}) {
  if (!id && !slug) return undefined;
  // Todo - get product
  const supabase = createServerComponentClient<Database>({ cookies });
  if (redirectOnNoSession) redirectToLogin(supabase);
  let query;
  if (id) {
    query = supabase
      .from("products")
      .select("*, variants: product_variants(*)")
      .eq("id", id);
  } else if (slug) {
    query = supabase
      .from("products")
      .select("*, variants: product_variants(*)")
      .eq("title_slug", slug);
  } else {
    return undefined;
  }

  const { data, error } = await query;
  if (error) return undefined;

  const placeholderImage = "https://placehold.co/600/png?text=No+Image";

  return {
    ...data[0],
    featured_image: getPublicUrl(
      supabase,
      data[0].featured_image || placeholderImage
    ),
    variants: data[0].variants.map((variant: any) => ({
      ...variant,
      price: variant.price / 100,
      image: getPublicUrl(supabase, variant.image || placeholderImage),
    })),
  };
}
