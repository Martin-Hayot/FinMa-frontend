import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
                port: "",
                pathname: "/gc-prd-institution_icons-production/**",
            },
            {
                protocol: "https",
                hostname: "cdn-logos.gocardless.com",
                port: "",
                pathname: "/ais/**",
            },
        ],
    },
    async headers() {
        return [];
    },
};

export default nextConfig;
