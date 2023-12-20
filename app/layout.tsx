import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import { ToastContainer } from "react-toastify";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import Providers from "./themes/providers";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

// If loading a variable font, you don't need to specify the font weight
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Web Development Gallery",
  description: "Beyond the Source: A View into My Web Development World",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // let profile = null;
  // if (session) {
  //   const { data } = await supabase
  //     .from("profiles")
  //     .select("*")
  //     .eq("id", session.user.id)
  //     .single();
  //   profile = data;
  // }
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={robotoSlab.className}>
        <Providers>
          <div className="min-h-screen flex flex-col dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-600 dark:text-white">
            {children}
          </div>
          <ToastContainer className="flex justify-end" theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
