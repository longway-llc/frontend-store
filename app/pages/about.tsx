import React from 'react'
import {
  Container,
  createStyles, Grid, makeStyles, Typography, useMediaQuery, useTheme,
} from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { useTranslation } from '../utils/localization'

const useStyles = makeStyles((theme) => createStyles({
  header: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2, 0),
      padding: theme.spacing(4),
    },
  },
  headerLogo: {
    padding: theme.spacing(1),
    minHeight: '80px',
    position: 'relative',
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
      minHeight: '120px',
      padding: theme.spacing(2),
    },
  },
  backgroundImg: {
    zIndex: -1,
    filter: 'saturate(70%) brightness(1.2)',
  },
  mask: {
    zIndex: -1,
    background: '#FFFFFF88',
    mixBlendMode: 'hard-light',
    position: 'fixed',
    minHeight: '100vh',
    minWidth: '100vw',
  },
  section: {
    minHeight: '100vh',
    position: 'relative',
  },
  titleWrapper: {
    background: theme.palette.primary.main,
    padding: theme.spacing(1),
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(11),
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(13),
      padding: theme.spacing(2),
    },
  },
  contactsWrapper: {
    background: theme.palette.common.black,
  },
  titleText: {
    color: theme.palette.common.white,
  },
  paragraphText: {
    textShadow: '2px 2px 2px rgba(206,89,55,0), 0.5px 2px 1px #47474733',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  bottomBottom: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },
}))

const About = () => {
  const styles = useStyles()
  const router = useRouter()
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'))
  const t = useTranslation(router.locale)
  return (
    <>
      <Head>
        <meta name="description" content={t.meta.about.description} />
        <meta name="keywords" content={t.meta.about.keywords} />
        <title>{t.meta.about.title}</title>
        <link rel="alternate" hrefLang="ru" href="https://lwaero.net/ru/about" />
        <link rel="alternate" hrefLang="en" href="https://lwaero.net/about" />
        <link rel="alternate" hrefLang="x-default" href="https://lwaero.net/about" />
      </Head>
      <section id="welcome" className={styles.section}>
        <Image
          src="/AirplaneZip.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.backgroundImg}
        />
        <div className={styles.mask} />
        <Header headerMode="black" />
        <Container maxWidth="lg">
          <Grid container justifyContent="center" spacing={isPhone ? 4 : 6}>
            <Grid item className={styles.titleWrapper}>
              <Typography
                className={styles.titleText}
                align="center"
                variant={isPhone ? 'h5' : 'h3'}
                component="h1"
              >
                GLOBAL MRO SUPPLY MANAGEMENT
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={styles.paragraphText}
                align={isPhone ? 'center' : 'left'}
                variant={isPhone ? 'h6' : 'h4'}
                component="p"
              >
                Всё для технического обслуживания и ремонта
                {' '}
                <br />
                Круглосуточная поддержка клиентов
                {' '}
                <br />
                24 в сутки - 365 дней в году
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={[styles.paragraphText, styles.bottomBottom].join(' ')}
                align={isPhone ? 'center' : 'right'}
                variant={isPhone ? 'h5' : 'h4'}
                component="p"
              >
                AOG: +7 (812) 426-79-59
                {' '}
                <br />
                info@lwaero.net
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section id="products" className={styles.section}>
        <Container maxWidth="lg">
          <Grid container justifyContent={isPhone ? 'center' : 'flex-start'}>
            <Grid item className={styles.titleWrapper}>
              <Typography
                className={styles.titleText}
                align="center"
                variant={isPhone ? 'h5' : 'h3'}
                component="h1"
              >
                Продуктовая линейка
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
      {/* <Grid component="header" container spacing={1}
      justifyContent="center" className={styles.header}> */}
      {/*  <Grid item xs className={styles.headerLogo}> */}
      {/*    <Image */}
      {/*      src="/logo/LWAERO_general_logo_black.svg" */}
      {/*      alt="Lwaero logotype" */}
      {/*      layout="fill" */}
      {/*    /> */}
      {/*  </Grid> */}
      {/* </Grid> */}
      {/* <Container> */}
      {/*  <Grid component="main" container direction="row" spacing={2}> */}
      {/*    <Grid component="section" item> */}
      {/*      <Typography variant="h4" component="h1"
      align="center">{t.page.about.overview.title}</Typography> */}
      {/*      <Typography variant="body1">{t.page.about.overview.text1}</Typography> */}
      {/*      <Typography variant="body1">{t.page.about.overview.text2}</Typography> */}
      {/*    </Grid> */}
      {/*    <Grid component="section" item> */}
      {/*      <Typography variant="h4" component="h1"
      align="center">{t.page.about.contacts.title}</Typography> */}
      {/*      <Typography variant="body1">{t.page.about.overview.text1}</Typography> */}
      {/*      <Typography variant="body1">{t.page.about.overview.text2}</Typography> */}
      {/*    </Grid> */}
      {/*  </Grid> */}
      {/* </Container> */}
      {/* <Grid component="footer" container direction="row" alignContent="center"> */}
      {/*  <Grid item xs> */}
      {/*    footer */}
      {/*  </Grid> */}
      {/* </Grid> */}
      <Footer />
    </>
  )
}

export default About
