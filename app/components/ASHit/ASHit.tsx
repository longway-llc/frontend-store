import React, { FC, useMemo } from 'react'
import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useTranslation } from '../../utils/localization'
import AsHitConsignmentStatus from '../ASHitConsignmentStatus/ASHitConsignmentStatus'
import ButtonAddToCart from '../ButtonAddToCart/ButtonAddToCart'
import Price from '../Price/Price'
import ProductDetails from '../ProductDetails/ProductDetailsProps'

const useStyles = makeStyles((theme) => createStyles({
  root: {
    minHeight: '250px',
  },
  imageGrid: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: `${theme.spacing(2)}px !important`,
    },
  },
  imageBox: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '200px',
  },
  titleWrapper: {
    display: 'flex',
  },
  specificationsWrapper: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  image: {
    borderRadius: '3px',
  },
  divider: {
    width: '100%',

  },
  details: {
    height: '100%',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '400px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '800px',
    },
  },
  buttonSectionWrapper: {
    padding: theme.spacing(1, 1, 0, 1),
  },
  buttonScale: {
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.85)',
    },
  },
  priceWrapper: {
    padding: theme.spacing(1),
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRadius: '8px',
    textAlign: 'center',
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 0),
    },
  },
  mtAuto: {
    marginTop: 'auto',
  },
}))

const host = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.lwaero.net'

const ASHit:FC<{ hit:any }> = ({ hit }) => {
  const styles = useStyles()
  const router = useRouter()
  const t = useTranslation(router.locale)
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('xs'))

  // eslint-disable-next-line no-underscore-dangle
  const id = hit.id || hit._id.$oid

  const redirectToProduct = async () => router.push(`/products/${id}`, `/products/${id}`)

  const description = useMemo(() => (router.locale === 'ru' && Boolean(hit?.description_ru)
    ? hit?.description_ru
    : hit?.description_en),
  [hit, router])

  const price = useMemo(() => (router.locale === 'ru' && Boolean(hit?.price_ru)
    ? hit?.price_ru
    : hit?.price_en
                ?? 0),
  [hit, router])

  const imageSrc = useMemo(() => {
    let source = hit?.photo
    if (Array.isArray(hit.photo)) {
      source = hit?.photo[0]
    }
    if (source) {
      return `${host}${source?.formats?.small?.url ?? source?.url}`
    }
    return '/defaultProduct.png'
  }, [hit])

  return (
    <Paper>
      <Grid container spacing={2} className={styles.root}>
        <Grid item xs={12} sm={5} md={4} className={styles.imageGrid}>
          <div className={styles.imageBox}>
            <Image
              className={styles.image}
              layout="fill"
              objectFit="contain"
              src={imageSrc}
              alt={`Product ${hit.pn}`}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <Grid container className={styles.details}>
            <Grid item xs={12} className={styles.titleWrapper}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h6" component="h6">
                    {hit.pn}
                  </Typography>
                </Grid>
                <Grid item>
                  <AsHitConsignmentStatus consignmnets={hit.consignments} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={styles.titleWrapper}>
              <Typography variant="subtitle1" component="span" className={styles.description}>
                {description}
              </Typography>
            </Grid>
            <Divider className={styles.divider} />
            <Grid item xs={12} sm={7} md={9}>
              <Typography variant="subtitle2" component="span">
                {t.components.ASHit.specifications}
                :
              </Typography>
              <div className={styles.specificationsWrapper}>
                <ProductDetails
                  group={hit?.group?.name || (hit?.group && hit?.group[0]?.name)}
                  brand={hit?.brand?.name || (hit?.brand && hit?.brand[0]?.name)}
                  color={hit?.color}
                  uom={hit?.uom}
                  mfg={hit?.mfg}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={5} md={3}>
              <Price price={price} productId={id} className={styles.priceWrapper} />
            </Grid>
            <Divider className={[styles.divider, styles.mtAuto].join(' ')} />
            <Grid item xs={12} className={styles.buttonSectionWrapper}>
              <Grid container justifyContent={isPhone ? 'center' : 'flex-end'} spacing={1}>
                <Grid item className={styles.buttonScale}>
                  <Button
                    variant="text"
                    onClick={redirectToProduct}
                  >
                    {t.components.ASHit.buttons.link}
                  </Button>
                </Grid>
                <Grid item className={styles.buttonScale}>
                  <ButtonAddToCart
                    productId={id}
                    count={1}
                    variant="contained"
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ASHit
