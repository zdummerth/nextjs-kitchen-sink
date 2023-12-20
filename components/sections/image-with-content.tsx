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

export default function ImageWithContent({
  image,
  title,
  subtitle,
  cta1,
  cta2,
}: Props) {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <Image
              alt="Party"
              src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className={`absolute inset-0 h-full w-full object-${
                image.objectFit || "cover"
              }`}
              fill
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
            {subtitle && (
              <p className="mt-4 text-gray-700 dark:text-gray-400">
                {subtitle}
              </p>
            )}

            {cta1 && (
              <div className="mt-4">
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
      </div>
    </section>
  );
}
