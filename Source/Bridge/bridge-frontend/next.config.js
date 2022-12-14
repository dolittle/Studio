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
  async rewrites() {
    const rewrites = [
      {
        source: "/api/cats",
        destination: "https://meowfacts.herokuapp.com"
      }
    ];

    if(process.env.NODE_ENV === 'development') {
      rewrites.push(
        {
          source: "/api/:path*",
          destination: "http://localhost:5000/:path*" // Proxy to Backend on localhost
        });
    }
    return rewrites;
  }
}

module.exports = nextConfig
