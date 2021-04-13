import React from 'react'
import {GetServerSideProps, NextPage} from 'next'
import {Container, Grid, Hidden, Theme, Typography, useMediaQuery, useTheme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import CabinetMenu from '../../components/CabinetMenu/CabinetMenu'
import {getSession} from 'next-auth/client'
import AppLayout from '../../layouts/AppLayout'
import OrderList from '../../components/OrderList/OrderList'
import {Session} from 'next-auth'


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    alignRight: {
        textAlign: 'right'
    },
    root: {
        width: '100%'
    },
    hoverRow: {
        transition: '.3s ease',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    scaleTable: {
        '& .MuiTableCell-root': {
            fontSize: '0.8rem !important',
            wordWrap: 'normal'
        }
    }
}))

type OrdersPageProps = {
    session: Session
}

const Orders: NextPage<OrdersPageProps> = ({session}) => {
    const classes = useStyles()
    const theme = useTheme()
    const isPhone = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <AppLayout title={'Мои заказы'}>
            <Container maxWidth={'lg'} className={classes.container}>
                <Grid spacing={3} container>
                    <Hidden mdUp>
                        <Grid item xs={12}>
                            <Typography variant={'h6'}><b>Мои заказы</b></Typography>
                        </Grid>
                    </Hidden>
                    <CabinetMenu/>
                    <Grid item xs={12} md={isPhone ? 11 : 9}>
                        <OrderList jwt={session.jwt}/>
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

export default Orders