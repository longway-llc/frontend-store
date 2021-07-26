import React, { FC } from 'react'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'
import {
  createStyles, makeStyles, Theme, Typography, TypographyProps,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useSnackbar } from 'notistack'

import { useTranslation } from '../../utils/localization'
import { sendRequesQuote, sendRequesQuoteVariables } from './__generated__/sendRequesQuote'

type StyleProps = {
  loading: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => createStyles({
  root: {
    cursor: (props) => (props.loading ? 'auto' : 'pointer'),
    backgroundColor: (props) => (props.loading
      ? theme.palette.text.disabled
      : theme.palette.text.primary),
  },
}))

type PriceProps = {
  price?: number,
  productId: string
} & TypographyProps

const REQUEST_QUOTE = gql`
    mutation sendRequesQuote($productId: ID!) {
        requestQuote(id: $productId)
    }
`

const Price: FC<PriceProps> = ({ price, productId, ...props }) => {
  const router = useRouter()
  const t = useTranslation(router.locale)
  const isNotQuote = price && price > 0
  const [session] = useSession()

  const [
    requestQuote,
    { loading },
  ] = useMutation<sendRequesQuote, sendRequesQuoteVariables>(REQUEST_QUOTE)

  const styles = useStyles({ loading })
  const { enqueueSnackbar } = useSnackbar()

  const handleClick = async () => {
    try {
      if (loading) return
      if (!session) {
        await router.push('/login')
        return
      }

      await requestQuote({
        variables: { productId },
        context: { headers: { authorization: `Bearer ${session?.jwt}` } },
      })
      enqueueSnackbar(t.components.Price.success, { variant: 'success' })
    } catch (e) {
      enqueueSnackbar(t.components.Price.error, { variant: 'error' })
    }
  }

  if (isNotQuote) {
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
      <Typography {...props}>
        <b>{price}</b>
        {' '}
        USD
      </Typography>
    )
  }
  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography {...props} className={[props.className, styles.root].join(' ')} onClick={handleClick}>
      {!loading ? <i>{t.components.Price.quote}</i> : <i>{t.components.Price.sending}</i>}
    </Typography>
  )
}

export default Price
