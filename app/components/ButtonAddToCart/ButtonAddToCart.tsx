import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, ButtonProps } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { SnackbarOrigin, useSnackbar } from 'notistack'

import { useTranslation } from '../../utils/localization'
import { GET_CART } from '../CartItemList/CartItemList'
import { getCartCount } from '../ShoppingCartBadge/__generated__/getCartCount'
import { GET_CART_ITEMS_COUNT } from '../ShoppingCartBadge/ShoppingCartBadge'
import { addToCart, addToCartVariables } from './__generated__/addToCart'

interface ButtonAddToCartProps extends ButtonProps {
  productId: string
  count: number
}

const ADD_TO_CART = gql`
    mutation addToCart($productId: ID!, $count: Int!) {
        addToCart(productId: $productId, count: $count) {
            cartItems {
                _id
                count
            }
        }
    }
`

const anchorOrigin: SnackbarOrigin = { horizontal: 'center', vertical: 'bottom' }

const ButtonAddToCart: FC<ButtonAddToCartProps> = ({ count, productId, ...props }) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const t = useTranslation(router.locale)
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const [addToCart, { loading: fetchLoading }] = useMutation<addToCart, addToCartVariables>(
    ADD_TO_CART,
    {
      refetchQueries: [{ query: GET_CART, context: { headers: { authorization: `Bearer ${session?.jwt}` } } }],
      update: (cache, { data }) => {
        cache.writeQuery<getCartCount>({
          query: GET_CART_ITEMS_COUNT,
          data: {
            countProductsInCart: data?.addToCart?.cartItems?.reduce(
              (acc, item) => acc + (item?.count ?? 0),
              0,
            ) as number,
          },
        })
      },
    },
  )
  const { enqueueSnackbar } = useSnackbar()

  // eslint-disable-next-line consistent-return
  const handleClick = async () => {
    try {
      if (!session?.user) {
        return await router.push('/login')
      }
      await addToCart({
        variables: { productId, count },
        context: { headers: { authorization: `Bearer ${session?.jwt}` } },
      })
      enqueueSnackbar(t.components.ButtonAddToCart.successMessage, {
        variant: 'success',
        anchorOrigin,
        'aria-label': t.components.ButtonAddToCart.successMessage,
      })
    } catch (e) {
      enqueueSnackbar(t.components.ButtonAddToCart.errorMessage, {
        variant: 'error',
        anchorOrigin,
        'aria-errormessage': t.components.ButtonAddToCart.errorMessage,
      })
    }
  }

  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...props} disabled={loading || fetchLoading} onClick={handleClick}>
      {t.components.ButtonAddToCart.addToCart}
    </Button>
  )
}

export default ButtonAddToCart
