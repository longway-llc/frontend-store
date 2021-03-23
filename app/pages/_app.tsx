import {AppProps} from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import {CssBaseline, ThemeProvider} from '@material-ui/core'
import {theme} from '../assets/theme'
import {Provider as AuthProvider} from 'next-auth/client'
import React, {useEffect} from 'react'
import Head from 'next/head'
import {Router, useRouter} from 'next/router'
import * as gtag from '../utils/gtag'
import {ymCode} from '../utils/yametrika'
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../utils/ApolloClient'

const withYM = require('next-ym')


function MyApp({Component, pageProps}: AppProps) {
    const apolloClient = useApollo(pageProps.initialApolloState)
    const router = useRouter()

    // gtag watcher
    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    //hydrate styles: official example https://github.com/mui-org/material-ui/blob/master/examples/nextjs
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <AuthProvider session={pageProps.session}>
                <ApolloProvider client={apolloClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <NextNprogress
                            options={{easing: 'ease', speed: 500}}
                            color={theme.palette.primary.main}
                            startPosition={0.3}
                            stopDelayMs={200}
                            height={3}
                        />
                        {/*<AuthProvider>*/}
                        <Component {...pageProps} />
                        {/*</AuthProvider>*/}

                        <style global jsx>{`
                        body {
                            letter-spacing: 0.015em;
                            min-height: 100vh;
                        }
                    
                        #__next{
                            min-height: inherit;
                            display: flex;
                            flex-direction: column;
                        }
                        a, a:hover {
                            text-decoration: none;
                        }
                    `}</style>
                    </ThemeProvider>
                </ApolloProvider>
            </AuthProvider>
        </>
    )
}

export default process.env.NODE_ENV === 'production' ? withYM(ymCode, Router)(MyApp) : MyApp

