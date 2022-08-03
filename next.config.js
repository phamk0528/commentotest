module.exports = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['api.playitright.tv'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    env: {
        NEXT_PUBLIC_BASE_URL: 'https://api.playitright.tv',
        NEXT_PUBLIC_BASE_URL_PRODUCT: 'https://api.playitright.com',
        NEXT_PUBLIC_BASE_URL_SALES_PRODUCT: 'https://playitright.com',
        NEXT_PUBLIC_BASE_URL_CLIENT: 'https://playitright.tv',
    },
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
        ];
    },
};
