"use server";

// import {
//   addToCart,
//   createCart,
//   getCart,
//   removeFromCart,
//   updateCart,
// } from "lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    // Todo - get cart
    // cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    // Todo - create cart
    // cart = await createCart();
    // cartId = cart.id;
    const cartId = "";
    if (!cartId) {
      return "Error creating cart";
    }
    cookies().set("cartId", cartId);
  }

  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    // Todo: Add quantity to cart
    // await addToCart(cartId, [
    //   { merchandiseId: selectedVariantId, quantity: 1 },
    // ]);
    revalidateTag("cart");
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    // Todo - remove from cart
    // await removeFromCart(cartId, [lineId]);
    revalidateTag("cart");
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      // Todo - remove from cart
      //   await removeFromCart(cartId, [lineId]);
      revalidateTag("cart");
      return;
    }

    // Todo - update cart
    // await updateCart(cartId, [
    //   {
    //     id: lineId,
    //     merchandiseId: variantId,
    //     quantity,
    //   },
    // ]);
    revalidateTag("cart");
  } catch (e) {
    return "Error updating item quantity";
  }
}
