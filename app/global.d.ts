import { Database as DB } from "@/lib/database.types";
import { type } from "os";
type Tweet = DB["public"]["Tables"]["tweets"]["Row"];
type DBProfile = DB["public"]["Tables"]["profiles"]["Row"];
type DBAddress = DB["public"]["Tables"]["addresses"]["Row"];
type DBProduct = DB["public"]["Tables"]["products"]["Row"];
type DBProductVariant = DB["public"]["Tables"]["product_variants"]["Row"];

declare global {
  type Database = DB;
  type Profile = DBProfile;
  type TweetWithAuthor = Tweet & {
    author: DBProfile;
    likes: number;
    user_has_liked_tweet: boolean;
  };
  type Address = DBAddress;
  type Product = DBProduct & {
    variants: DBProductVariant[];
  };
  type ProductVariant = DBProductVariant;
  // This is just a placeholder for cart items
  // I still need to create the table in the database
  type CartItem = {
    id: string;
    product: Product;
    variant: ProductVariant;
    quantity: number;
    total: number;
  };
  type Cart = {
    id: string;
    lines: CartItem[];
    total_price: number;
    total_quantity: number;
  };
}
