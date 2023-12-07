import { ensureStartsWith } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";

export async function createCart(): Promise<Cart> {
  let cart = {
    id: "",
    lines: [],
    total_price: 0,
    total_quantity: 0,
  };

  // Todo - create cart
  return cart;
}

export async function addToCart(
  cartId: string,
  lines: { variantId: string; quantity: number }[]
): Promise<Cart> {
  // Todo - add to cart
  return {
    id: "",
    lines: [],
    total_price: 0,
    total_quantity: 0,
  };
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  // Todo - remove from cart

  return {
    id: "",
    lines: [],
    total_price: 0,
    total_quantity: 0,
  };
}

export async function updateCart(
  cartId: string,
  lines: { id: string; variantId: string; quantity: number }[]
): Promise<Cart> {
  // Todo - update cart

  return {
    id: "",
    lines: [],
    total_price: 0,
    total_quantity: 0,
  };
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  // Todo - get cart
  let res;

  // Old carts becomes `null` when you checkout.
  if (!res) {
    return undefined;
  }

  return {
    id: "",
    lines: [],
    total_price: 0,
    total_quantity: 0,
  };
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  // Todo - get product

  return {
    id: "",
    title: "",
    description: "",
    title_slug: "",
    featured_image: "",
    created_at: "",
    tagline: "",
    variants: [],
  };
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  // Todo - get products

  return [
    {
      id: "",
      title: "",
      description: "",
      title_slug: "",
      featured_image: "",
      created_at: "",
      tagline: "",
      variants: [],
    },
  ];
}
