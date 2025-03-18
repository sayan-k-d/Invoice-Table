/** @type {import('next').NextConfig} */
import { createProxyMiddleware } from "http-proxy-middleware";
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `https://openaiservices-dfamawfaeacmhhax.canadacentral-01.azurewebsites.net/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        // Matching all API routes
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Allow all origins
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,HEAD,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Origin, X-Requested-With, Content-Type, Accept",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
