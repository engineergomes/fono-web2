/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'lh3.googleusercontent.com'],
  },
  // scrollRestoration: false,
};

module.exports = nextConfig;
