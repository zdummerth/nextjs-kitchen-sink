import { AddToCart } from "@/app/shop/components/cart/add-to-cart";
import Price from "@/app/shop/components/price";
import Prose from "@/components/prose";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.variants[0].price.toString()}
            currencyCode="USD"
          />
        </div>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          text={product.description}
        />
      ) : null}

      <AddToCart
        variants={product.variants}
        // availableForSale={product.availableForSale}
        availableForSale={true}
      />
    </>
  );
}
