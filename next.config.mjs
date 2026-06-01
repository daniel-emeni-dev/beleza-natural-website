/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'supreme-goldfish-jx5q5jjpp65fpjx7-3000.app.github.dev' // Your explicit Codespaces domain
      ],
    },
  },
}

export default nextConfig