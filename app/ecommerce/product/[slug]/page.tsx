import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/supabase-server";
// import { GridTileImage } from "@/components/grid/tile";
// import Footer from "@/components/layout/footer";

// export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct({ slug: params.slug });

  if (!product) return notFound();

  const url = product.featured_image;
  const indexable = true;

  return {
    title: product.title,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
            },
          ],
        }
      : null,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProduct({ slug: params.slug });

  if (!product) {
    return <div>Not Found</div>;
  }

  console.log(product);
  const images = [
    {
      src: product.featured_image,
      altText: product.title,
    },
    ...product.variants.map((variant) => ({
      src: variant.image,
      altText: `${product.title} - ${variant.title}`,
    })),
  ];

  return (
    <>
      {/* <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery images={images} />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense> */}
      <h1>{product.title}</h1>
    </>
  );
}
