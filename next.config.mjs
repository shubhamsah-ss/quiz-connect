/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
        ],
    },
};

// export default nextConfig;
export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig);