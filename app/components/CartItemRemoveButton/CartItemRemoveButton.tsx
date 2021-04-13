import React, {FC} from 'react'
import {CircularProgress, IconButton} from '@material-ui/core'
import {Cancel} from '@material-ui/icons'
import {gql, useMutation} from '@apollo/client'
import {deleteProductFromCart, deleteProductFromCartVariables} from './__generated__/deleteProductFromCart'
import {useSnackbar} from 'notistack'
import {GET_CART} from '../CartItemList/CartItemList'
import {getCart, getCart_getCart, getCart_getCart_cartItems} from '../CartItemList/__generated__/getCart'
import {getCartCount} from '../ShoppingCartBadge/__generated__/getCartCount'
import {GET_CART_ITEMS_COUNT} from '../ShoppingCartBadge/ShoppingCartBadge'
import {useSession} from 'next-auth/client'


type CartItemRemoveButtonProps = {
    productId: string
}

const DELETE_PRODUCT_FROM_CART = gql`
    mutation deleteProductFromCart($productId: ID!){
        deleteProductFromCart(productId: $productId){
            cartItems {
                id
                count
            }
        }
    }
`

const CartItemRemoveButton: FC<CartItemRemoveButtonProps> = ({productId}) => {
    const [session] = useSession()
    const [removeItem, {loading, error}] = useMutation<deleteProductFromCart, deleteProductFromCartVariables>(DELETE_PRODUCT_FROM_CART, {
        update: (cache, {data}) => {
            const cart = cache.readQuery<getCart>({query: GET_CART})?.getCart as getCart_getCart
            const ids = data?.deleteProductFromCart?.cartItems?.map(i => i?.id) as string[]
            const count = data?.deleteProductFromCart?.cartItems?.reduce((acc, item) => acc + (item?.count ?? 0), 0) as number
            cache.writeQuery<getCart>({
                query: GET_CART,
                data: {
                    getCart: {
                        ...cart,
                        cartItems: cart?.cartItems?.filter(item => ids.includes(item?.id as string)) as (getCart_getCart_cartItems | null)[] | null
                    }
                }
            })
            cache.writeQuery<getCartCount>({
                query: GET_CART_ITEMS_COUNT,
                data: {
                    countProductsInCart: count
                }
            })
        }
    })

    const {enqueueSnackbar} = useSnackbar()

    const handleClick = async () => {
        try {
            await removeItem({variables: {productId}, context:{headers:{authorization:`Bearer ${session?.jwt}`}}})
        } catch (e) {
            enqueueSnackbar(error?.message, {variant: 'error'})
        }
    }

    return (
        <IconButton aria-label={'remove'} onClick={handleClick}>
            {loading ? <CircularProgress color={'primary'}/> : <Cancel/>}
        </IconButton>
    )
}

export default CartItemRemoveButton