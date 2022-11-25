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
      CLIENT_ID: 'ATP2kEeL36DeIOPmtFy_tejwLu8eLDomgrtBYMEHrsuGyC7MUbJw0U09Q_ViSFJ6zJnzUJk0Q3Ke1bKG'
    },
}

module.exports = nextConfig
