import React, { FC } from 'react'
import { createStyles, makeStyles } from '@material-ui/core'
import Head from 'next/head'

import { theme } from '../assets/theme'
import Footer from '../components/Footer/Footer'
import Header, { HeaderMode } from '../components/Header/Header'

type MainLayoutType = {
  // eslint-disable-next-line react/require-default-props
  logoVariant?: HeaderMode,
  // eslint-disable-next-line react/require-default-props
  title?: string
}

// eslint-disable-next-line @typescript-eslint/no-shadow
const useStyles = makeStyles((theme) => createStyles({
  main: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}))

const AppLayout: FC<MainLayoutType> = ({ children, logoVariant = 'black', title = 'LWAero' }) => {
  const styles = useStyles()
  return (
    <>
      <Head>
        <meta name="robots" content="index" />
        <title>{title}</title>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="icon" href="/favicon-192x192.png" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon-192x192.png" type="image/x-icon" />
      </Head>

      <Header headerMode={logoVariant} />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default AppLayout
