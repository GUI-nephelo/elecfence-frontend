/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/apis/:path*', destination: 'http://111.67.193.80:8888/:path*' }
        ]
    }
}

module.exports = nextConfig

