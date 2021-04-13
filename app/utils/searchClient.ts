import algoliasearch from 'algoliasearch/lite'



export const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID as string,
    process.env.ALGOLIA_SEARCH_API_KEY as string,
    {

    }
)

export const productIndexName = process.env.PRODUCT_INDEX ?? 'dev_PRODUCT'