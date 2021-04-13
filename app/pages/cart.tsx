import React from 'react'
import {Container, createStyles, Grid, Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {GetServerSideProps, NextPage} from 'next'
import AppLayout from '../layouts/AppLayout'
import {Session} from 'next-auth'
import {getSession} from 'next-auth/client'
import CartItemList from '../components/CartItemList/CartItemList'
import OrderCreateForm from '../components/OrderCreateForm/OrderCreateForm'


type CartPageProps = {
    session: Session,
}

const useStyles = makeStyles(theme => createStyles({
    orderItem: {
        '& + &': {
            marginTop: '25px'
        }
    },
    cartRoot: {
        padding: '60px 0 112px 0'
    }
}))


const Cart: NextPage<CartPageProps> = ({session}) => {
    const classes = useStyles()
    return (
        <AppLayout title={'Cart'}>
            <section className={classes.cartRoot}>
                <Container maxWidth={'lg'}>
                    <Grid container justify={'center'} spacing={4}>
                        <Grid item xs={12} md={8}>
                            <CartItemList jwt={session?.jwt}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <OrderCreateForm session={session}/>
                        </Grid>
                    </Grid>
                </Container>
            </section>
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
    return {
        props: {
            session,
        }
    }
}

export default Cart