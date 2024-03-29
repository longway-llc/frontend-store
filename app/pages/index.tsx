import React, { FC } from 'react'
import {
  Container, createStyles, Grid, makeStyles, Typography, useMediaQuery, useTheme,
} from '@material-ui/core'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { typographyColor } from '../assets/theme'
import SearchField from '../components/SearchField/SearchField'
import MainLayout from '../layouts/AppLayout'
import { useTranslation } from '../utils/localization'

const useStyles = makeStyles((theme) => createStyles({
  title: {
    fontSize: '4rem',
    fontWeight: 'lighter',
    color: theme.palette.secondary.main,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  subtitle: {
    fontSize: '2rem',
    fontWeight: 'lighter',
    color: 'white',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.6rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  container: {
    marginTop: 100,
    marginBottom: 100,
    [theme.breakpoints.down('md')]: {
      marginTop: 60,
      marginBottom: 60,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
}))

const Home: FC = () => {
  const styles = useStyles()
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'))
  const { locale } = useRouter()
  const t = useTranslation(locale)
  return (
    <>
      <Head>
        <meta name="description" content={t.meta.index.description} />
        <meta name="keywords" content={t.meta.index.keywords} />
        <link rel="alternate" hrefLang="ru" href="https://lwaero.net/ru" />
        <link rel="alternate" hrefLang="en" href="https://lwaero.net" />
        <link rel="alternate" hrefLang="x-default" href="https://lwaero.net" />
      </Head>

      <MainLayout logoVariant="main" title="LWAero">
        <Container>
          <Grid container direction="column" alignItems="center" spacing={isPhone ? 4 : 8} className={styles.container}>
            <Grid item xs>
              <Typography variant="h1" className={styles.title}>
                {t.page.index.title}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h2" className={styles.subtitle}>
                {t.page.index.subtitle}
              </Typography>
            </Grid>
            <Grid item xs>
              <SearchField mode="main" />
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
      <style global jsx>
        {`
        body {
          background: linear-gradient(180deg, ${typographyColor} 0%, rgba(196, 196, 196, 0) 100%),
            url('/AirplaneZip.jpg') no-repeat center;
          background-size: cover;
          background-blend-mode: darken;
        }
        @media screen and (max-width: ${theme.breakpoints.values.md}px) {
          body {
            background-position: 80% 50%;
          }
        }
      `}
      </style>
    </>
  )
}

export default Home
