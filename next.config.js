/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jbtjxauvtmrfh9rj.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
  // Server Actions became a stable feature in Next.js 14, and are enabled by default. 
  // However, if you are using an earlier version of Next.js, 
  // you can enable them by setting experimental.serverActions to true.
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
