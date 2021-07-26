import React from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import { green, orange } from '@material-ui/core/colors'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { useTranslation } from '../../utils/localization'

const useStyles = makeStyles((theme) => createStyles({
  root: {
    marginRight: theme.spacing(1),
  },
  available: {
    padding: theme.spacing(0, 1),
    color: theme.palette.common.white,
    textAlign: 'center',
    backgroundColor: green['200'],
    borderRadius: `${theme.shape.borderRadius}px`,
  },
  notAvailable: {
    padding: theme.spacing(0, 1),
    color: theme.palette.common.white,
    textAlign: 'center',
    backgroundColor: orange['200'],
    borderRadius: `${theme.shape.borderRadius}px`,
  },
}))

const AsHitConsignmentStatus = ({ consignmnets }: any) => {
  const styles = useStyles()
  const [session] = useSession()
  const locale = useRouter()?.locale
  const t = useTranslation(locale)

  const available = consignmnets?.length > 0

  return (
    <div className={styles.root}>
      {available || !session?.user ? (
        <Typography variant="subtitle1" className={styles.available}>
          {t.components.AsHitConsignmentStatus.available}
        </Typography>
      ) : (
        <Typography variant="subtitle1" className={styles.notAvailable}>
          {t.components.AsHitConsignmentStatus.unavailable}
        </Typography>
      )}
    </div>
  )
}

export default AsHitConsignmentStatus
