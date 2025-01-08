import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //output: "export",
  images: {
    domains: ["cards.scryfall.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cards.scryfall.io",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
