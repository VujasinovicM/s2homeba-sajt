import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Isključi optimizaciju dok se ne dodaju prave slike
    unoptimized: true,
  },
};

export default nextConfig;
