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
        source: "/cats",
        destination: "https://meowfacts.herokuapp.com"
      },
    ];
  }
}

module.exports = nextConfig
