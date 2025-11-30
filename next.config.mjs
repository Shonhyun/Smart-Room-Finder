// next.config.mjs
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}

export default nextConfig