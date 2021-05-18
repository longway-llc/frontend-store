module.exports = {
    client: {
        excludes: ['**/.next/**/*', '**/public/**/*', '**/assets/**/*', '**/__tests__/**/*', '**/node_modules/**/*'],
        includes: ['**/*.ts*'],
        service: {
            name: 'strapi-cms',
            url: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
            localSchemaFile: '.graphql/schema.graphql',
            output: './app/__generated__',
        }
    }
}