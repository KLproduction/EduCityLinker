/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"], // Add the allowed domain here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
