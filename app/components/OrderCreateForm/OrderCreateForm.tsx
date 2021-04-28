import React, {FC, useMemo} from 'react'
import {gql, useMutation, useQuery} from '@apollo/client'
import {createOrderFromCart, createOrderFromCartVariables} from './__generated__/createOrderFromCart'
import {Session} from 'next-auth'
import {Box, Button, Container, createStyles, Grid, Link, makeStyles, Paper, Typography} from '@material-ui/core'
import {getContactPhone} from './__generated__/getContactPhone'
import {getCart, getCart_getCart} from '../CartItemList/__generated__/getCart'
import {GET_CART} from '../CartItemList/CartItemList'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'
import NextLink from 'next/link'
import {useSnackbar} from 'notistack'
import {cartReset} from './__generated__/cartReset'
import {getCartCount} from '../ShoppingCartBadge/__generated__/getCartCount'
import {GET_CART_ITEMS_COUNT} from '../ShoppingCartBadge/ShoppingCartBadge'


const useStyles = makeStyles(theme => createStyles({
    header: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.common.black
    },
    mt20: {
        margin: theme.spacing(3, 0, -1)
    },
    contactField: {
        '& .MuiTextField-root': {
            width: '100%'
        }
    },
    contactLabel: {
        display: 'inline-block',
        width: 70
    },
    link: {
        cursor: 'pointer'
    }
}))

export const GET_CONTACT_PHONE = gql`
    query getContactPhone {
        me {
            user {
                customerInfo {
                    phone
                }
            }
        }
    }
`

export const CREATE_ORDER = gql`
    mutation createOrderFromCart($locale:String!) {
        createOrderFromCart(region: $locale) {
            id
        }
    }
`

export const RESET_CART = gql`
    mutation cartReset{
        resetCart {
            cartItems {
                id
            }
        }
    }
`

type OrderCreateFormProps = {
    session: Session
}


const OrderCreateForm: FC<OrderCreateFormProps> = ({session}) => {
    const styles = useStyles()

    const locale = useRouter().locale == 'ru' ? 'ru' : 'en'
    const t = useTranslation(locale)

    const {enqueueSnackbar} = useSnackbar()

    const {data: orderData, loading} = useQuery<getCart>(GET_CART, {
        context: {headers: {authorization: `Bearer ${session.jwt}`}}
    })

    const {data: phoneData} = useQuery<getContactPhone>(GET_CONTACT_PHONE, {
        context: {headers: {authorization: `Bearer ${session.jwt}`}}
    })

    const [createOrder, {loading: createLoading, error}] = useMutation<createOrderFromCart, createOrderFromCartVariables>(CREATE_ORDER, {
        context: {headers: {authorization: `Bearer ${session.jwt}`}}
    })

    const [resetCart, {loading: loadingReset,error: resetError}] = useMutation<cartReset>(RESET_CART, {
        context: {headers: {authorization: `Bearer ${session.jwt}`}},
        update: (cache) => {
            const cart = cache.readQuery<getCart>({query: GET_CART})?.getCart as getCart_getCart
            cache.writeQuery<getCart>({
                query: GET_CART,
                data: {
                    getCart: {
                        ...cart,
                        cartItems: []
                    }
                }
            })
            cache.writeQuery<getCartCount>({
                    query: GET_CART_ITEMS_COUNT,
                    data: {countProductsInCart: 0}
                }
            )
        }
    })

    const fullCount = useMemo(() => orderData && orderData.getCart
            .cartItems?.reduce((acc, item) => acc + (item?.count ?? 0), 0)
        , [orderData])

    const fullPrice = useMemo(() => orderData && orderData.getCart
            .cartItems?.reduce((acc, item) => {
                const price = locale == 'ru' ? item?.product?.price_ru : item?.product?.price_en
                return acc + (price ?? 0) * (item?.count ?? 0)
            }, 0)
        , [orderData, locale])

    const phone = phoneData?.me?.user?.customerInfo?.phone

    const handleReset = async () => {
        await resetCart()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            await createOrder({
                variables: {
                    locale: locale
                }
            })
            enqueueSnackbar(t.components.OrderCreateForm.orderSuccess, {
                variant: 'success',
                action: (key) => (<Button color='primary' onClick={handleReset}>
                    {t.components.OrderCreateForm.resetCart}
                </Button>)
            })
        } catch (e) {
            enqueueSnackbar(error?.message || resetError?.message, {variant: 'error'})
        }
    }
    return (
        <Paper component={'form'} onSubmit={handleSubmit}>
            <Box className={styles.header}>
                <Typography style={{color: 'white'}} variant={'subtitle1'} component={'span'}>
                    {t.components.OrderCreateForm.totalQuantity}: <b>{fullCount}</b>
                    <br/>
                    {t.components.OrderCreateForm.totalPrice}: <b>{Number(fullPrice).toLocaleString()}</b> USD
                </Typography>
            </Box>

            <Container>
                <Grid container justify={'center'} spacing={3} className={styles.contactField}>
                    <Grid item xs={12}>
                        <Typography className={styles.mt20} variant={'subtitle1'} component={'p'}>
                            {t.components.OrderCreateForm.contacts}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={styles.contactField}>
                        <Typography variant={'caption'} component={'span'} className={styles.contactLabel}><i>
                            {t.components.OrderCreateForm.email}:
                        </i></Typography>
                        <Typography variant={'body2'} component={'span'}>
                            {session?.user?.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={styles.contactField}>
                        <Typography variant={'caption'} component={'span'} className={styles.contactLabel}><i>
                            {t.components.OrderCreateForm.phone}:
                        </i></Typography>
                        {
                            phone ?
                                <Typography variant={'body2'} component={'span'}>
                                    {phone}
                                </Typography>
                                :
                                <NextLink href={'/cabinet/settings'}><Link className={styles.link}>
                                    {t.components.OrderCreateForm.fillInSettings}
                                </Link></NextLink>
                        }

                    </Grid>
                    <Grid item>
                        <Button type={'submit'}
                                disabled={loading || !phone || createLoading}
                                variant={'contained'}
                                color={'primary'}
                        >
                            {t.components.OrderCreateForm.checkout}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type={'button'}
                                disabled={loadingReset || createLoading}
                                variant={'text'}
                                color={'default'}
                                onClick={handleReset}
                        >
                            {t.components.OrderCreateForm.resetCart}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default OrderCreateForm