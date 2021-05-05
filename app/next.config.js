// eslint-disable-next-line @typescript-eslint/no-var-requires
const withCss = require('@zeit/next-css')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPlugins = require('next-compose-plugins')


module.exports = withPlugins([
    [
        withCss,
        {
            webpack: function (config) {
                config.module.rules.push({
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: '[name].[ext]',
                        },
                    },
                })
                return config
            },
        },
    ],
], {
    images: {
        domains: ['api.lwaero.net', 'lwaero.net', 'localhost']
    },
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        localeDetection: true,
    },
    future: {
        webpack5: true,
        strictPostcssConfiguration: true
    }
})