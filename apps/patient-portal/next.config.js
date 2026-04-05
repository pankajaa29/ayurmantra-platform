/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ayurmantra/ui'],
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:2600/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
