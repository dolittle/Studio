/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
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
