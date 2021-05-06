import React, {FC, useMemo} from 'react'
import {Box, Button, createStyles, Divider, Grid, makeStyles, Paper, Typography} from '@material-ui/core'
import {getCart_getCart_cartItems_product} from '../CartItemList/__generated__/getCart'
import CartItemCounter from '../CartItemCounter/CartItemCounter'
import CartItemRemoveButton from '../CartItemRemoveButton/CartItemRemoveButton'
import Link from 'next/link'
import Price from '../Price/Price'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'


const useStyles = makeStyles(theme => createStyles({
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 5000
    },
    imageBox: {
        position: 'relative',
        height: '100%',
        objectFit: 'contain',
        [theme.breakpoints.down('sm')]: {
            minHeight: 200
        }
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    counterButton: {
        minWidth: '24px',
        width: '24px',
        height: '24px'
    },
    divider: {
        margin: '10px 0'
    },
    cost: {
        fontWeight: 'bold'
    },
    price: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'center'
        }
    },
    priceWrapper: {
        padding: theme.spacing(1),
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRadius: '8px',
        textAlign: 'center',
    }
}))

interface CartItemProps extends Partial<getCart_getCart_cartItems_product> {
    price: number
    description: string
    count: number
}

const host = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.lwaero.net'

const CartItem: FC<CartItemProps> = ({photo, pn, uom, count, description, color, id, price}) => {
    const classes = useStyles()
    const {locale} = useRouter()
    const t = useTranslation(locale)
    const imgSrc = useMemo(() => photo?.url
        ? `${host}${
            photo.formats?.small?.url 
            || photo.formats?.medium?.url
            || photo.url}`
        : '/defaultProduct.png'
        , [photo])

    return (
        <Paper className={classes.paper}>
            <Grid container justify={'space-around'} spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Box className={classes.imageBox}>
                        <Image
                            layout={'fill'}
                            objectFit={'contain'}
                            src={imgSrc}
                            alt={pn as string}/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grid container justify={'space-between'} alignItems={'center'}>
                        <Grid item md={7} xs={12}>
                            <Typography variant={'h6'} component={'h6'}>
                                {pn}
                            </Typography>
                            <Typography variant={'caption'} component={'span'}>
                                {`UOM: ${uom} Colour: ${color} ${description}`}
                            </Typography>
                        </Grid>
                        <Grid item md={4}>
                            <CartItemCounter count={count} productId={id as string}/>
                        </Grid>
                        <Grid item md={1}>
                            <CartItemRemoveButton productId={id as string}/>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider}/>
                    <Grid container justify={'space-between'} alignItems={'center'}>
                        <Grid item xs={12} sm={5}>
                            <Link href={'/products/[id]'} as={`/products/${id}`}>
                                <a style={{textDecoration: 'none'}}>
                                    <Button variant={'text'} color={'primary'}>
                                        {t.components.CartItem.productPage}
                                    </Button>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Grid container spacing={1} alignItems={'center'}>
                                <Grid item xs={12} sm={4} lg={6} className={classes.price}>
                                    <Typography variant={'body1'} component={'span'}>
                                        {t.components.CartItem.price}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8} lg={6}>
                                    <Price productId={id as string} className={classes.priceWrapper}  price={price * count}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CartItem