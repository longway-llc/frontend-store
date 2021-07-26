import React, { FC } from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

import { useTranslation } from '../../utils/localization'

type ProductDetailsProps = {
  group?: string
  uom?: string
  color?: string
  mfg?: string
  brand?: string
}

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

const ProductDetails:FC<ProductDetailsProps> = ({
  brand, group, color, uom, mfg,
}) => {
  const styles = useStyles()
  const { locale } = useRouter()
  const t = useTranslation(locale)
  return (
    <div className={styles.root}>
      {group && (
      <Typography variant="caption" component="span">
        <i>
          {t.components.ASHitDetails.group}
          :
        </i>
        {' '}
        {group}
      </Typography>
      )}
      {uom && (
      <Typography variant="caption" component="span">
        <i>
          {t.components.ASHitDetails.uom}
          :
        </i>
        {' '}
        {uom}
      </Typography>
      )}
      {color && (
      <Typography variant="caption" component="span">
        <i>
          {t.components.ASHitDetails.color}
          :
        </i>
        {' '}
        {color}
      </Typography>
      )}
      {brand && (
      <Typography variant="caption" component="span">
        <i>
          {t.components.ASHitDetails.brand}
          :
        </i>
        {' '}
        {brand}
      </Typography>
      )}
      {mfg && (
      <Typography variant="caption" component="span">
        <i>
          {t.components.ASHitDetails.mfg}
          :
        </i>
        {' '}
        {mfg}
      </Typography>
      )}
    </div>
  )
}

export default ProductDetails
