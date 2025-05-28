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
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self' https://cdn.plaid.com/",
                            "script-src 'self' 'unsafe-inline' https://cdn.plaid.com/link/v2/stable/link-initialize.js",
                            "style-src 'self' 'unsafe-inline' https://cdn.plaid.com/",
                            "frame-src https://cdn.plaid.com/",
                            "connect-src 'self' http://localhost:8080 https://sandbox.plaid.com/ https://production.plaid.com/",
                        ].join("; "),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
