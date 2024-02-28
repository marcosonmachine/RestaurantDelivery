/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['mistertako.ru', 'assets.materialup.com']
  }
}

module.exports = nextConfig
