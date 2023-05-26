/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig
