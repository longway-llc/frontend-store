import React from 'react'
import { ServerStyleSheets } from '@material-ui/styles'
import Document, {
  Head, Html, Main, NextScript,
} from 'next/document'

import { theme } from '../assets/theme'
import { GA_TRACKING_ID } from '../utils/gtag'

class MyDocument extends Document {
  render() {
    const isProduction = !this.props.isDevelopment

    return (
      <Html dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={theme.palette.primary.main} />

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
                                  `,
              }}
            />
          </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// // hydrate styles: official example https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  // eslint-disable-next-line no-param-reassign
  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (
      App,
      // eslint-disable-next-line react/jsx-props-no-spreading
    ) => (props) => sheets.collect(<App {...props} />),
  })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}

export default MyDocument
