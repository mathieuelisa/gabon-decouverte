import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		qualities: [10, 25, 50, 75]
	},
	/* config options here */
	transpilePackages: ['jotai-devtools']
}

export default nextConfig
