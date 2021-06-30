import React, {useMemo} from 'react'
import AppLayout from '../layouts/AppLayout'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {productIndexName} from '../utils/searchClient'
import {GetServerSideProps, NextPage} from 'next'
import {findResultsState} from 'react-instantsearch-dom/server'
import AlgoliaSearch from '../components/AlgoliaSearch/AlgoliaSearch'
import {Container, createStyles, makeStyles} from '@material-ui/core'
import qs from 'qs'
import superjson from 'superjson'
import {searchClient} from '../utils/AlgoliaUtils'
import {useTranslation} from '../utils/localization'


const useStyles = makeStyles(theme => createStyles({
    root: {
        margin: theme.spacing(2, 'auto')
    }

}))

const Search: NextPage<SearchPageProps> = (props) => {
    const styles = useStyles()
    const router = useRouter()
    const t = useTranslation(router?.locale)
    const title = useMemo(() => router?.query.item
        ? ': "' + router.query.item + '"'
        : '',
        [router])

    return (
        <>
            <Head>
                <meta name="description" content={t.meta.search.description}/>
                <meta name="keywords" content={t.meta.search.keywords}/>
                <link rel="alternate" hrefLang="ru" href="https://lwaero.net/ru/search"/>
                <link rel="alternate" hrefLang="en" href="https://lwaero.net/search"/>
                <link rel="alternate" hrefLang="x-default" href="https://lwaero.net/search"/>
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
    resultsState: Record<string, unknown>,
    NEXT_PUBLIC_ALGOLIA_APP_ID: string
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: string
}

const getQueryStringFromReqUrl = (url: string | undefined): string => {
    return url?.split('?')[1] ?? ''
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const query = getQueryStringFromReqUrl(ctx.req.url)
    const searchState = qs.parse(query) as unknown as SearchState
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resultsState = await findResultsState(AlgoliaSearch, {
        searchClient,
        searchState,
        indexName: productIndexName
    })
    return {
        props: {
            resultsState: superjson.parse(superjson.stringify(resultsState)),
            searchState,
            indexName: productIndexName,
            NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
        }
    }
}

export default Search



