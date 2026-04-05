/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ayurmantra/ui'],
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:2600/api/v1',
  },
};

module.exports = nextConfig;
