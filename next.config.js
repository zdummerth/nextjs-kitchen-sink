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
    ],
  },
};

module.exports = nextConfig;
