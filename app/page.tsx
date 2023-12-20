import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation";
import Image from "next/image";
import DualImageWithContent from "@/components/sections/dual-image-with-content";
import DefaultHero from "@/components/sections/default-hero";
import ImageWithContent from "@/components/sections/image-with-content";
import StickyImageWithContent from "@/components/sections/sticky-image-with-content";
import TripleImageWithContent from "@/components/sections/triple-image-with-content";
import ContentWithUspGrid from "@/components/sections/content-with-usp-grid";
import ImageOffsetWithContent from "@/components/sections/image-offset-with-content";

export default async function Home() {
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
    return <div>No profile found for session</div>;
  }

  const textGradient =
    "text-transparent bg-clip-text bg-gradient-to-br from-black dark:from-white via-cyan-300 dark:via-cyan-300 to-black dark:to-white";

  return (
    <div className="w-full">
      <Navigation profile={profile} />
      <div className="relative pt-36 ml-auto">
        <div className="lg:w-2/3 text-center mx-auto">
          <div className="px-4">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
              My Web Development <span className={textGradient}>Gallery.</span>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300 text-lg md:text-2xl">
              Beyond the Source: A View into My Web Development World
            </p>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <a
              href="#"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-base font-semibold text-white">
                Get started
              </span>
            </a>
            <a
              href="#"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span className="relative text-base font-semibold text-primary dark:text-white">
                Learn more
              </span>
            </a>
          </div>
          <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                The lowest price
              </h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                The fastest on the market
              </h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
            <div className="text-left">
              <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                The most loved
              </h6>
              <p className="mt-2 text-gray-500">Some text here</p>
            </div>
          </div>
        </div>
        <ImageOffsetWithContent
          image={{
            src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            alt: "Party",
            objectFit: "cover",
          }}
          title="Grow your audience"
          subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius quidem quam repellat."
          cta1={{
            text: "Get started",
            href: "#",
          }}
        />
        <ImageWithContent
          image={{
            src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            alt: "Party",
            objectFit: "cover",
          }}
          title="Grow your audience"
          subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius quidem quam repellat."
          cta1={{
            text: "Get started",
            href: "#",
          }}
          cta2={{
            text: "Learn more",
            href: "#",
          }}
        />

        <ContentWithUspGrid />
        <TripleImageWithContent />
        <DualImageWithContent />
        <DefaultHero />
        <StickyImageWithContent />
      </div>
    </div>
  );
}
