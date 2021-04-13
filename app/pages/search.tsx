import React, {useMemo} from 'react'
import AppLayout from '../layouts/AppLayout'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {productIndexName, searchClient} from '../utils/searchClient'
import {GetServerSideProps, NextPage} from 'next'
import {findResultsState} from 'react-instantsearch-dom/server'
import AlgoliaSearch from '../components/AlgoliaSearch/AlgoliaSearch'
import {Container, createStyles, makeStyles} from '@material-ui/core'
import qs from 'qs'



const useStyles = makeStyles(theme => createStyles({
    root: {
        margin: theme.spacing(2, 'auto')
    },

}))

const Search: NextPage<SearchPageProps> = (props) => {
    const styles = useStyles()
    const router = useRouter()
    const title = useMemo(() => router?.query.item
        ? ': "' + router.query.item + '"'
        : '',
        [router])

    return (
        <>
            <Head>
                <meta name="description"
                      content="Поиск среди товаров магазина LWAero для технического обслуживания авиационной техники"/>
                <meta name="keywords"
                      content="авиация, магазин, техническое обслуживание, самолёты, aviation, maintenance, aircraft, shop, longway, лонгвей"/>

            </Head>
            <AppLayout title={`Поиск${title}`}>
                <Container maxWidth={'lg'} className={styles.root}>
                    <AlgoliaSearch {...props}/>
                </Container>
            </AppLayout>
        </>
    )
}

type SearchState = {
    query: string,
    page: number
}

export type SearchPageProps = {
    indexName: string
    searchState: SearchState
    resultsState: Record<string, unknown>
}

const getQueryStringFromReqUrl = (url: string | undefined): string => {
    return url?.split('?')[1] ?? ''
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const query = getQueryStringFromReqUrl(ctx.req.url)
    const searchState = qs.parse(query) as unknown as SearchState
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resultsState = await findResultsState(Search, {
        searchClient,
        searchState,
        indexName: productIndexName
    })
    return {
        props: {
            resultsState: JSON.parse(JSON.stringify(resultsState)),
            searchState,
            indexName: productIndexName
        }
    }
}

export default Search

// Search.getInitialProps = async (context: NextPageContext): Promise<SearchPageProps> => {
//     const query = getQueryStringFromReqUrl(context?.req?.url)
//     const searchState = qs.parse(query) as unknown as SearchState
//     // const searchState = context.query as unknown as SearchState
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     const resultsState = await findResultsState(Search, {
//         searchClient,
//         searchState,
//         indexName: productIndexName
//     })
//     return {
//         resultsState,
//         searchState,
//         indexName: productIndexName
//     }
// }
//
// export default withInstantSearch({
//     indexName: productIndexName,
//     searchClient
// })(Search)



