// next.config.js
import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  postcss: {
    plugins: ['tailwindcss', 'autoprefixer'],
  },
};

module.exports = config;
