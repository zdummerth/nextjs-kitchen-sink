import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation";
import DualImageWithContent from "@/components/sections/dual-image-with-content";
import DefaultHero from "@/components/sections/default-hero";
import ImageWithContent from "@/components/sections/image-with-content";
import StickyImageWithContent from "@/components/sections/sticky-image-with-content";
import TripleImageWithContent from "@/components/sections/triple-image-with-content";
import ContentWithUspGrid from "@/components/sections/content-with-usp-grid";

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
              A View into My Web Development World
            </p>
          </div>
        </div>
        <ImageWithContent
          image={{
            src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            alt: "Party",
            objectFit: "cover",
          }}
          title="Social Media"
          subtitle="A social media clone that enables users to post messages and images. The project highlights advanced web development techniques, including user authentication and database management."
          cta1={{
            text: "View Project",
            href: "/social",
          }}
        />

        <DualImageWithContent />
        <ContentWithUspGrid />
        <TripleImageWithContent />
        {/* <StickyImageWithContent /> */}
      </div>
    </div>
  );
}
