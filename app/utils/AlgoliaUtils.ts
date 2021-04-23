import qs from 'qs'
import {SearchState} from 'react-instantsearch-core'
import algoliasearch from 'algoliasearch/lite'

export const createURL = (searchState: SearchState):string => `?${qs.stringify(searchState)}`


export const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
)