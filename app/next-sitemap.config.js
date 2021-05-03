module.exports = {
    siteUrl: 'https://lwaero.net',
    generateRobotsTxt: true,
    exclude: [
        '/admin/*',
        '/cabinet/*',
        '/server-sitemap.xml'
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/*']
            }
        ],
        additionalSitemaps: [
            'https://lwaero.net/server-sitemap.xml', // <==== Add here
        ],
    },
}