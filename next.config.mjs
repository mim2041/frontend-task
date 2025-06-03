/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['backend.dodozo.co'],
    },
  }
  
  export default nextConfig