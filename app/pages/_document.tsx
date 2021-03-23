import React from 'react'
import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document'
import {ServerStyleSheets} from '@material-ui/styles'
import {GA_TRACKING_ID} from '../utils/gtag'
import {theme} from '../assets/theme'

class MyDocument extends Document {
    //hydrate styles: official example https://github.com/mui-org/material-ui/blob/master/examples/nextjs
    static async getInitialProps(ctx: DocumentContext) {

        // Render app and page and get the context of the page with collected side effects.
        const sheets = new ServerStyleSheets()
        const originalRenderPage = ctx.renderPage

        ctx.renderPage = () => originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        })

        const initialProps = await Document.getInitialProps(ctx)

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        }
    }

    render() {
        const isProduction = !this.props.isDevelopment

        return (
            <Html lang="ru" dir="ltr">
                <Head>
                    <meta charSet="utf-8"/>
                    <meta name="theme-color" content={theme.palette.primary.main}/>
                    {/* Add gtag script into production build */}
                    {isProduction && (
                        <>
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                            />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                      window.dataLayer = window.dataLayer || [];
                                      function gtag(){dataLayer.push(arguments);}
                                      gtag('js', new Date());
                                      gtag('config', '${GA_TRACKING_ID}', {
                                        page_path: window.location.pathname,
                                      });
                                  `
                                }}
                            />
                        </>
                    )}
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}


export default MyDocument