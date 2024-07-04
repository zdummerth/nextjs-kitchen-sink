import Image from "next/image";
import Link from "next/link";

export default function DualImageWithContent() {
  return (
    <section className="">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-900 sm:text-lg dark:text-gray-200">
          <h2 className="text-3xl font-bold sm:text-4xl">Tickets App</h2>
          <p className="mb-4">A basic app for managing and tracking tickets</p>
          <Link
            className="inline-block my-8 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
            href="/tickets"
          >
            View Project
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
            alt="office content 1"
            width={500}
            height={500}
            className="w-full rounded-lg"
          />
          <Image
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
            alt="office content 2"
            width={500}
            height={500}
            className="mt-4 w-full lg:mt-10 rounded-lg"
          />
          {/* <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"> */}
          {/* <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"> */}
        </div>
      </div>
    </section>
  );
}
