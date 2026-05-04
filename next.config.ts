import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // OpenAI / DALL-E 3 images (Azure Blob Storage)
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        pathname: "**",
      },
      {
        // OpenAI CDN alternative domain
        protocol: "https",
        hostname: "*.openai.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
