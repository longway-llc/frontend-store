import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/client'
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { Provider as AuthProvider } from 'next-auth/client'
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/ban-ts-comment
// @ts-ignore
import withYM from 'next-ym'
import NextNprogress from 'nextjs-progressbar'
import { SnackbarProvider } from 'notistack'

import { theme } from '../assets/theme'
import { useApollo } from '../utils/ApolloClient'
import * as gtag from '../utils/gtag'
import { ymCode } from '../utils/yametrika'

// eslint-disable-next-line @typescript-eslint/no-shadow
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
}))

function MyApp({ Component, pageProps }: AppProps) {
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

  // hydrate styles: official example https://github.com/mui-org/material-ui/blob/master/examples/nextjs
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, breackboint=device-breackboint" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider session={pageProps.session}>
          <ApolloProvider client={apolloClient}>
            <SnackbarProvider maxSnack={3} classes={{ root: useStyles().root }}>
              <CssBaseline />
              <NextNprogress
                options={{ easing: 'ease', speed: 500 }}
                color="#C51D34"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
              />
              <Component {...pageProps} />
              <style global jsx>
                {`
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
                            `}
              </style>
            </SnackbarProvider>
          </ApolloProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default process.env.NODE_ENV === 'production' ? withYM(ymCode, Router)(MyApp) : MyApp
