import React, {FC} from 'react'
import Head from 'next/head'
import MainLayout from '../layouts/AppLayout'
import {typographyColor} from '../assets/theme'
import SearchField from '../components/SearchField/SearchField'
import {Container, createStyles, Grid, makeStyles, Typography, useMediaQuery, useTheme} from '@material-ui/core'


const useStyles = makeStyles(theme => createStyles({
    title: {
        fontSize: '4rem',
        fontWeight: 'lighter',
        color: theme.palette.secondary.main,
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: '3rem'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem'
        }
    },
    subtitle: {
        fontSize: '2rem',
        fontWeight: 'lighter',
        color: 'white',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.6rem'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.3rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem'
        }
    },
    container: {
        marginTop: 100,
        marginBottom: 100,
        [theme.breakpoints.down('md')]: {
            marginTop: 60,
            marginBottom: 60
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
        }
    }
}))

const Home: FC = () => {
    const theme = useTheme()
    const isPhone = useMediaQuery(theme.breakpoints.down('md'))
    const styles = useStyles()
    return (
        <>
            <Head>
                <meta name="description"
                    content="Магазин специализированных материалов для технического обслуживания авиационной техники"/>
                <meta name="keywords"
                    content="авиация, техническое обслуживание, самолёты, aviation, maintenance, aircraft, longway, лонгвей"/>
            </Head>

            <MainLayout logoVariant={'main'} title={'LWAero | Главная'}>
                <Container>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        spacing={isPhone ? 4 : 10}
                        className={styles.container}
                    >
                        <Grid item xs>
                            <Typography variant={'h1'} className={styles.title}>
                                GLOBAL MRO SUPPLY MANAGEMENT
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant={'h2'} className={styles.subtitle}>
                                we will help you purchase the right product at a great price
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <SearchField mode={'main'}/>
                        </Grid>
                    </Grid>
                </Container>
            </MainLayout>
            <style global jsx>{`
                body {
                    background: linear-gradient(180deg, ${typographyColor} 0%, rgba(196, 196, 196, 0) 100%),
                                url("/AirplaneZip.jpg") no-repeat center; 
                    background-size: cover;
                    background-blend-mode: darken;
                }
                @media screen and (max-width: ${theme.breakpoints.values.md}px) {
                    body {
                        background-position: 80% 50%;
                    }
                }
            `}</style>
        </>
    )
}

export default Home