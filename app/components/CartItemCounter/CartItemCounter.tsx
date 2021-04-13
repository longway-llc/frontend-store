import {Box, Button, createStyles, makeStyles, TextField} from '@material-ui/core'
import React, {FC, useRef, useState} from 'react'
import {Add, Remove} from '@material-ui/icons'
import {gql, useMutation} from '@apollo/client'
import {setProductCountInCart, setProductCountInCartVariables} from './__generated__/setProductCountInCart'
import {useSession} from 'next-auth/client'
import {getCartCount} from '../ShoppingCartBadge/__generated__/getCartCount'
import {GET_CART_ITEMS_COUNT} from '../ShoppingCartBadge/ShoppingCartBadge'
import {getCart, getCart_getCart, getCart_getCart_cartItems} from '../CartItemList/__generated__/getCart'
import {GET_CART} from '../CartItemList/CartItemList'
import _ from 'lodash'
import {useSnackbar} from 'notistack'


const useStyles = makeStyles(theme => createStyles({
    root: {
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    counterButton: {
        minWidth: '24px',
        width: '24px',
        height: '24px'

    },
    count: {
        padding: '0 6px 0 6px'
    },
    inputBox: {
        width: '80px',
        padding: '0 10px'
    }
}))

type CartItemCounterProps = {
    productId: string
    count: number
}

export const SET_PRODUCT_COUNT_IN_CART = gql`
    mutation setProductCountInCart($productId:ID!, $count: Int!) {
        changeProductCountInCart(productId: $productId, count: $count) {
            cartItems {
                id
                count
            }
            id
        }
    }
`


const CartItemCounter: FC<CartItemCounterProps> = ({productId, count}) => {
    const classes = useStyles()
    const inputRef = useRef<HTMLInputElement>()
    const [session] = useSession()
    const {enqueueSnackbar} = useSnackbar()
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()

    const [setCount, {loading, error}] = useMutation<setProductCountInCart, setProductCountInCartVariables>(SET_PRODUCT_COUNT_IN_CART,
        {
            update: (cache, {data}) => {
                const count = data?.changeProductCountInCart?.cartItems?.reduce((acc, item) => acc + (item?.count ?? 0), 0) as number

                cache.writeQuery<getCartCount>({
                    query: GET_CART_ITEMS_COUNT,
                    data: {
                        countProductsInCart: count
                    }
                })

                const cart = cache.readQuery<getCart>({query: GET_CART})?.getCart as getCart_getCart
                const cartItems = _.cloneDeep(cart?.cartItems)

                cartItems?.forEach((item, index) => {
                    const modifyIndex = data?.changeProductCountInCart?.cartItems?.findIndex(i => i?.id == item?.id) as number
                    if (index >= 0) {
                        //@ts-ignore
                        cartItems[index].count = data?.changeProductCountInCart?.cartItems[modifyIndex].count
                    }
                })

                cache.writeQuery<getCart>({
                    query: GET_CART,
                    data: {
                        getCart: {
                            ...cart,
                            cartItems: cartItems as (getCart_getCart_cartItems | null)[]
                        }
                    }
                })

            }
        }
    )


    const dec = async () => {
        try {
            await setCount({
                variables: {productId, count: count - 1},
                context: {headers: {authorization: `Bearer ${session?.jwt}`}}
            })
            if (inputRef.current) inputRef.current.value = String(count - 1)
        } catch (e) {
            enqueueSnackbar(error?.message, {variant: 'error'})
        }
    }

    const inc = async () => {
        try {
            await setCount({
                variables: {productId, count: count + 1},
                context: {headers: {authorization: `Bearer ${session?.jwt}`}}
            })
            if (inputRef.current) inputRef.current.value = String(count + 1)
        } catch (e) {
            enqueueSnackbar(error?.message, {variant: 'error'})
        }
    }

    const set = async (value: number) => {
        try {
            if (value < 1) return
            await setCount({
                variables: {productId, count: value},
                context: {headers: {authorization: `Bearer ${session?.jwt}`}}
            })
            if (inputRef.current) inputRef.current.value = String(value)
        } catch (e) {
            enqueueSnackbar(error?.message, {variant: 'error'})
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (timer) {
            clearTimeout(timer)
        }
        const value = parseInt(event.target.value, 10)
        if (value > 0) {
            setTimer(setTimeout(async () => await set(value), 500))
        } else {
            setTimer(setTimeout(async () => await set(1), 500))
        }
    }


    return (
        <div className={classes.root}>
            <Button className={classes.counterButton} variant={'contained'} color={'primary'}
                    size={'small'} onClick={dec}
                    disabled={count <= 1 || loading}>
                <Remove/>
            </Button>
            <Box component={'div'} className={classes.inputBox}>
                <TextField
                    inputRef={inputRef}
                    defaultValue={count}
                    onChange={handleChange}
                    disabled={loading}
                />
            </Box>
            <Button className={classes.counterButton} variant={'contained'} color={'primary'} disabled={loading}
                    size={'small'} onClick={inc}>
                <Add fontSize={'small'}/>
            </Button>
        </div>
    )
}

export default CartItemCounter