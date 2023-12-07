// import { getCart } from "lib/shopify";
import { cookies } from "next/headers";
import CartModal from "./modal";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    // Todo - get cart
    // cart = await getCart(cartId);
  }

  return <CartModal cart={cart} />;
}
