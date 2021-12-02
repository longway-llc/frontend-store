module.exports = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]',
                },
            },
        })
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        })
        return config
    },
    images: {
        domains: ['api.lwaero.net', 'lwaero.net', 'localhost']
    },
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        localeDetection: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
}
