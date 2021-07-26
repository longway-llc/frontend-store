import React, { FC, useEffect, useMemo } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import {
  Badge, createStyles, IconProps, Theme, withStyles,
} from '@material-ui/core'
import { ShoppingCart, ShoppingCartOutlined } from '@material-ui/icons'
import { useSession } from 'next-auth/client'

import { getCartCount } from './__generated__/getCartCount'

const StyledBadge = withStyles((theme: Theme) => createStyles({
  badge: {
    right: '-4',
    top: 8,
    backgroundColor: theme.palette.primary.main,
    padding: '0 4px',
    color: 'white',
    border: (props: { border: boolean }) => (props.border ? `2px solid ${theme.palette.background.paper}` : 'none'),
  },
}))(Badge)

export const GET_CART_ITEMS_COUNT = gql`
    query getCartCount {
        countProductsInCart
    }
`

interface StyledBadgeProps extends IconProps {
  outlined?: any,
  border?: any
  color?: any
}

const ShoppingCartBadge: FC<StyledBadgeProps> = ({
  border, outlined, fontSize, color,
}) => {
  const [session] = useSession()

  const [invoke, { data, loading }] = useLazyQuery<getCartCount>(GET_CART_ITEMS_COUNT)

  useEffect(() => {
    if (session?.user) {
      invoke({ context: { headers: { authorization: `Bearer ${session?.jwt}` } } })
    }
  }, [session, invoke])

  const count = useMemo(() => data && data.countProductsInCart, [data])

  return (
    <StyledBadge
      border={border}
      badgeContent={count}
      color={loading ? 'secondary' : 'primary'}
      variant={loading ? 'dot' : 'standard'}
    >
      {outlined
        ? (
          <ShoppingCartOutlined
            fontSize={fontSize ?? 'default'}
            color={color}
          />
        )
        : (
          <ShoppingCart
            fontSize={fontSize ?? 'default'}
            color={color}
          />
        )}

    </StyledBadge>
  )
}

export default ShoppingCartBadge
