import AppLayout from '../layouts/AppLayout'
import {getCsrfToken, getProviders, getSession, signIn} from 'next-auth/client'
import {GetServerSideProps, NextPage} from 'next'
import {Session} from 'next-auth'
import React, {useEffect, useState} from 'react'
import {Avatar, Button, Container, Divider, Grid, makeStyles, TextField, Typography} from '@material-ui/core'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useRouter} from 'next/router'
import Head from 'next/head'
import {VpnKey} from '@material-ui/icons'
import {useSnackbar} from 'notistack'
import ButtonSignInGoogle from '../components/ButtonSignInGoogle/ButtonSignInGoogle'
import ButtonSignInFacebook from '../components/ButtonSignInFacebook/ButtonSignInFacebook'
import Link from 'next/link'
import {useTranslation} from '../utils/localization'


type LoginProps = {
    providers: Record<string, unknown>,
    session?: Session,
    csrfToken: string,
    error?: string
}

type FormData = {
    email: string,
    csrfToken: string
}

const schemaRu: yup.SchemaOf<FormData> = yup.object().shape({
    email: yup.string().email('Email format isn\'t correct').required('Email is required'),
    csrfToken: yup.string().required()
})

const schemaEn: yup.SchemaOf<FormData> = yup.object().shape({
    email: yup.string().email('Некорректный формат почты').required('Обязательное поле'),
    csrfToken: yup.string().required()
})

const useStyles = makeStyles(theme => ({
    mt: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1, 'auto'),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    policies: {
        marginTop: theme.spacing(1)
    }
}))

const Login: NextPage<LoginProps> = ({providers, session, csrfToken, error}) => {
    const styles = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const [fetching, setFetching] = useState(false)

    const router = useRouter()
    const t = useTranslation(router?.locale)

    const {register, errors, handleSubmit} = useForm<FormData>({
        mode: 'onBlur',
        resolver: yupResolver(router.locale == 'en' ? schemaEn : schemaRu)
    })

    const handleLogin = async ({email}: FormData) => {
        try {
            setFetching(true)
            const res = await signIn('email', {email, redirect: false})
            if (!res?.error) {
                enqueueSnackbar('На ваш почтовый ящик было отправлено письмо', {variant: 'info'})
            }
        } catch (e) {
            enqueueSnackbar(e.message, {variant: 'error'})
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        if (error) enqueueSnackbar(error == 'Callback'
            ? 'Войдите способом, который использовали  при регистрации'
            : 'Необработанная ошибка, обратитесь в поддержку'
            , {variant: 'error', autoHideDuration: 10000})
    }, [error, enqueueSnackbar])

    return (
        <>
            <Head>
                <meta name="description" content="Вход в личный кабинет LWAero"/>
                <meta name="keywords"
                      content="авиация, техническое обслуживание, самолёты, aviation, maintenance, aircraft, longway, лонгвей"/>
                <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
                <link rel="alternate" hrefLang="ru" href="https://lwaero.net/ru/login"/>
                <link rel="alternate" hrefLang="en" href="https://lwaero.net/login"/>
                <link rel="alternate" hrefLang="x-default" href="https://lwaero.net/login"/>
            </Head>
            <AppLayout logoVariant={'black'} title={'Login'}>
                <Container maxWidth="xs" className={styles.mt}>
                    <Grid container direction={'column'} alignItems={'center'} spacing={3}>
                        <Grid item>
                            <Avatar className={styles.avatar}>
                                <VpnKey/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Вход в личный кабинет
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container
                                  spacing={1}
                                  component={'form'}
                                  noValidate
                                  onSubmit={handleSubmit(handleLogin)}
                            >
                                <Grid item xs={12}>
                                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} ref={register}/>
                                    <TextField
                                        inputRef={register}
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email адрес"
                                        autoComplete="email"
                                        required
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={fetching}
                                        className={styles.submit}
                                    >
                                        Войти
                                    </Button>
                                </Grid>
                                <Divider variant='fullWidth' style={{width: '100%'}}/>
                                <Grid item xs={12}>
                                    <ButtonSignInGoogle provider={providers.google}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonSignInFacebook provider={providers.facebook}/>
                                </Grid>
                                <Typography variant='caption' className={styles.policies}>
                                    {t.page.login.policies}
                                    <Link href="/policies"><a>
                                        {t.page.login.policiesLink}
                                    </a></Link>.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </AppLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const error = context.query.error ?? null
    const session = await getSession(context)
    if (session?.user) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const csrfToken = await getCsrfToken(context)
    const providers = await getProviders()
    return {
        props: {
            session: null,
            providers,
            csrfToken,
            error
        }
    }
}

export default Login