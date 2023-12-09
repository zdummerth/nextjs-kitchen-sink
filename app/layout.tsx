import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import { ToastContainer } from "react-toastify";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en" className={inter.className}>
    <html lang="en" className={robotoSlab.className}>
      <body>
        <div className="min-h-screen flex flex-col dark:bg-boxdark dark:text-white">
          {children}
        </div>
        <ToastContainer className="flex justify-end" theme="dark" />
      </body>
    </html>
  );
}
