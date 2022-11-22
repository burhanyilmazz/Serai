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
   },
   env: {
      API_URL: 'https://serai.ozanuzer.com/api',
      CLIENT_ID: 'AZODvpwOqZ7yxEzQu-MOi3TKRpE9NJg5tSLYjLa9NhecH8lyV_qvtSKGqfURan9l3b_SSjjhv_LRIqa8'
    },
}

module.exports = nextConfig
