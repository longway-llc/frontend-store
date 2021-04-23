import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {getSession} from 'next-auth/client'
import {Session} from 'next-auth'
import AppLayout from '../../layouts/AppLayout'
import {Container, createStyles, Grid, makeStyles, useMediaQuery, useTheme} from '@material-ui/core'
import CabinetMenu from '../../components/CabinetMenu/CabinetMenu'
import PhoneSetForm from '../../components/PhoneSetForm/PhoneSetForm'
import LocaleSetForm from '../../components/LocaleSetForm/LocaleSetForm'


const useStyles = makeStyles(theme => createStyles({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    card: {
        padding: theme.spacing(2, 3, 4)
    },
    title: {
        margin: theme.spacing(2, 1)
    }
}))

type SettingsPageProps = {
    session: Session
}

const Settings: NextPage<SettingsPageProps> = () => {
    const styles = useStyles()
    const theme = useTheme()
    const isPhone = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <AppLayout title={'Настройки'}>
            <Container maxWidth={'lg'} className={styles.root}>
                <Grid container spacing={3}>
                    <CabinetMenu/>
                    <Grid item xs={12} md={isPhone ? 11 : 9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <PhoneSetForm/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <LocaleSetForm/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </AppLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session?.user) {
        return {
            props: {},
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return {props: {session}}
}

export default Settings