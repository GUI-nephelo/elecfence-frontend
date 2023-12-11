/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            afterFiles:
                [
                    // { source: '/api/notification', destination: 'http://127.0.0.1:8000/realTimeData/sse' }
                ]
        }
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig

