/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../../'),
  },
  output: 'standalone',
  pageExtensions: ['page.tsx'],
  async rewrites() {
    return [
      {
        source: "/api/cats",
        destination: "https://meowfacts.herokuapp.com"
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/:path*" // Proxy to Backend
      },
    ];
  }
}

module.exports = nextConfig
