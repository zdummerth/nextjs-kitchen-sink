/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "zcawbibzjzctfvtfugpw.supabase.co",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "ui-avatars.com",
      },
      {
        hostname: "flowbite.s3.amazonaws.com",
      },
      {
        hostname: "tailwindui.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
