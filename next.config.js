/** @type {import('next').NextConfig} */
const disableStaticExport = process.env.DISABLE_STATIC_EXPORT === 'true'

const nextConfig = {
  // GitHub Pages needs a static export. Set DISABLE_STATIC_EXPORT=true to keep
  // the GraceLLM Route Handler (e.g. local `next start` or a Vercel deploy).
  ...(disableStaticExport ? {} : { output: 'export' }),
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
