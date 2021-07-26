import React, { FC, useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  createStyles, Grid, makeStyles, Typography,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'

import { useTranslation } from '../../utils/localization'
// eslint-disable-next-line import/no-cycle
import CartItem from '../CartItem/CartItem'
import { getCart } from './__generated__/getCart'

type CartItemListProps = {
  jwt: Session['jwt']
}

export const GET_CART = gql`
    query getCart {
        getCart{
            id
            cartItems {
                id
                count
                product {
                    id
                    pn
                    uom
                    description_en
                    description_ru
                    color
                    mfg
                    price_en
                    price_ru
                    photo {
                        url
                        formats 
                    }
                    group {
                        name
                    }
                    consignments {
                        id
                        name
                    }
                }
            }
        }
    }
`

const useStyles = makeStyles(() => createStyles({
  root: {
    listStyle: 'none',
    paddingInlineStart: 0,
  },
}))

const CartItemList: FC<CartItemListProps> = ({ jwt }) => {
  const styles = useStyles()
  const { locale } = useRouter()
  const t = useTranslation(locale)
  const { data, loading } = useQuery<getCart>(GET_CART, {
    context: { headers: { authorization: `Bearer ${jwt}` } },
  })

  const Items = useMemo(() => !!data && data.getCart?.cartItems?.map((p) => (
    <Grid key={p?.id} item xs={12} component="li">
      <CartItem
        photo={p?.product?.photo}
        pn={p?.product?.pn as string}
        price={locale === 'ru' ? (p?.product?.price_ru ?? 0) : (p?.product?.price_en ?? 0)}
        uom={p?.product?.uom as string}
        description={(locale === 'ru' ? p?.product?.description_ru : p?.product?.description_en) as string}
        id={p?.product?.id as string}
        color={p?.product?.color as string}
        count={p?.count as number}
      />
    </Grid>
  )), [locale, data])

  if (loading) {
    return (
      <Grid container justifyContent="center">
        <Grid item>
          <img src="/Preloader.svg" alt="loading..." />
        </Grid>
      </Grid>
    )
  }
  if (data?.getCart?.cartItems?.length === 0) {
    return (
      <Grid container>
        <Grid item>
          <Typography variant="h3" component="h3">
            {t.components.CartItemList.empty}
          </Typography>
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid container spacing={3} component="ul" className={styles.root}>
      {Items}
    </Grid>
  )
}

export default CartItemList
