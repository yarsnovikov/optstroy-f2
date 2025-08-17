/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enable ESLint checks during builds to catch potential issues
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Enable TypeScript checks during builds to catch type errors
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
