import Image from "next/image";
import Link from "next/link";

interface Props {
  image: {
    src: string;
    alt: string;
    objectFit?: "cover" | "contain";
  };
  title: string;
  subtitle?: string;
  cta1?: {
    text: string;
    href: string;
  };
  cta2?: {
    text: string;
    href: string;
  };
}

export default function ImageOffsetWithContent({
  image,
  title,
  subtitle,
  cta1,
  cta2,
}: Props) {
  return (
    <section className="">
      <div className="bg-stone-300 dark:bg-stone-700 px-4">
        <div className="flex flex-col items-center py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32">
          <h1 className="text-5xl font-bold sm:text-6xl xl:max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl">
              {subtitle}
            </p>
          )}
          {cta1 && (
            <div className="mt-4 flex flex-wrap justify-center">
              <Link
                className="inline-block text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                href={cta1.href}
              >
                {cta1.text}
              </Link>
              {cta2 && (
                <Link
                  className="inline-block ml-4 text-center border-[1px] border-blue-700/50 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
                  href={cta2.href}
                >
                  {cta2.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="relative mx-4 h-64 lg:h-96  mb-12 -mt-20 rounded-lg overflow-hidden shadow-md lg:-mt-40 dark:bg-gray-500">
        <Image
          alt="Party"
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className={`object-${image.objectFit || "cover"}`}
          fill
        />
      </div>
    </section>
  );
}
