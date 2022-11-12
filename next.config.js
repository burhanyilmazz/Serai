/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   swcMinify: true,
   experimental: {
      images: {
         unoptimized: true,
      },
      styledComponents: true
   },
   images: {
      domains: ['serai.ozanuzer.com']
   }
}

module.exports = nextConfig
