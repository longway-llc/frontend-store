import React, { FC, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import {
  Box, createStyles, Grid, makeStyles, Typography,
} from '@material-ui/core'
import { green, grey, orange } from '@material-ui/core/colors'
import { MailOutline } from '@material-ui/icons'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { theme } from '../../assets/theme'
import { useTranslation } from '../../utils/localization'
import ConsignmentDisplay from '../ConsignmentDisplay/ConsignmentDisplay'
import { verifiedStatus } from './__generated__/verifiedStatus'

type ConsignmentStatusProps = {
  product: any
}

const GET_VERIFIED_STATUS = gql`
    query verifiedStatus {
        me {
            user {
                verifiedByAdmin
            }
        }
    }
`

const useStyles = makeStyles(() => createStyles({
  available: {
    color: green['700'],
    textAlign: 'center',
    border: `1px solid ${green['200']}`,
    borderRadius: `${theme.shape.borderRadius}px`,
  },
  notAvailable: {
    color: orange['700'],
    textAlign: 'center',
    border: `1px solid ${orange['200']}`,
    borderRadius: `${theme.shape.borderRadius}px`,
  },
  mt1: {
    marginTop: theme.spacing(1),
  },
  ml1: {
    marginLeft: theme.spacing(1),
    color: grey['500'],
  },
  bordered: {
    border: `1px solid ${grey['200']}`,
    borderRadius: `${theme.shape.borderRadius}px`,
  },
  pd1: {
    padding: theme.spacing(1),
  },
  contactLink: {
    color: green['700'],
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      textDecoration: 'underline',
    },
    '& > span': {
      marginLeft: theme.spacing(1),
    },
  },
}))

const ConsignmentStatus: FC<ConsignmentStatusProps> = ({ product }) => {
  const styles = useStyles()
  const { locale } = useRouter()
  const t = useTranslation(locale)
  const [session] = useSession()

  const { consignments, expectedDeliveryDate } = product

  const [invoke, { data }] = useLazyQuery<verifiedStatus>(GET_VERIFIED_STATUS)

  useEffect(() => {
    if (session) invoke({ context: { headers: { authorization: `Bearer ${session.jwt}` } } })
  }, [invoke, session])

  if (!session?.user) {
    return (
      <Typography variant="subtitle1" className={styles.available}>
        {t.components.ConsignmentStatus.available}
        !
      </Typography>
    )
  }

  const totalQuantity = consignments
    .flatMap((c: any) => c.placements)
    .map((p: any) => p.balance).reduce((acc: number, b: number) => acc + b, 0)

  return (
    <Grid container>
      <Grid item xs={12}>
        {consignments.length > 0
          ? (
            <>
              <Typography variant="subtitle1" className={styles.available}>
                {t.components.ConsignmentStatus.available}
                :
                {totalQuantity}
                {' '}
                <br />
                <a
                  className={styles.contactLink}
                  href={`mailto:sales@lwaero.net?subject=Request for detailing the quantity of ${product.pn} ${product.uom}`}
                >
                  <MailOutline />
                  {' '}
                  <span>{t.components.ConsignmentStatus.detail}</span>
                </a>
              </Typography>
              {
                            data?.me?.user?.verifiedByAdmin
                              ? (
                                <Box className={styles.mt1}>
                                  <ConsignmentDisplay consignments={consignments} />
                                </Box>
                              )
                              : (
                                <Box className={[styles.bordered, styles.mt1, styles.pd1].join(' ')}>
                                  <Typography variant="caption" className={styles.ml1}>
                                    <i>{t.components.ConsignmentStatus.verifiedRequirement}</i>
                                  </Typography>
                                </Box>
                              )
                        }
            </>
          )
          : (
            <>
              {
                            expectedDeliveryDate && (
                            <Typography variant="overline" className={styles.ml1}>
                              {t.components.ConsignmentStatus.expectedDelivery}
                              :
                              <b>{moment(expectedDeliveryDate).locale(locale ?? 'en').format('L')}</b>
                            </Typography>
                            )
                        }
              <Typography variant="subtitle1" className={styles.notAvailable}>
                {t.components.ConsignmentStatus.unavailable}
                !
              </Typography>
            </>
          )}
      </Grid>
    </Grid>
  )
}

export default ConsignmentStatus
