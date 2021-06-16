import {
    Box,
    Container,
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core'
import React, {useMemo, useState} from 'react'
import {GetServerSideProps, NextPage} from 'next'
import Image from 'next/image'
import AppLayout from '../../layouts/AppLayout'
import {useRouter} from 'next/router'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import ButtonAddToCart from '../../components/ButtonAddToCart/ButtonAddToCart'
import Price from '../../components/Price/Price'
import ProductDetails from '../../components/ProductDetails/ProductDetails'
import ConsignmentStatus from '../../components/ConsignmentStatus/ConsignmentStatus'
import {useTranslation} from '../../utils/localization'


const useStyles = makeStyles(theme => createStyles({
    root: {},
    imageBox: {
        position: 'relative',
        height: '100%',
        width: '100%',
        minHeight: '300px',
        maxHeight: '400px'
    },
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 120
    },
    priceWrapper: {
        padding: theme.spacing(1),
        background: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRadius: '8px',
        textAlign: 'center',
        [theme.breakpoints.only('md')]: {
            marginTop: theme.spacing(2)
        }
    },
    productDetailsWrapper: {
        marginLeft: theme.spacing(1)
    },
    longReadWrapper: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(2)
        }
    }
}))

type ProductPageProps = {
    products: any,
    id: string,
    host: string
}


const Product: NextPage<ProductPageProps> = ({products, id, host}) => {
    const styles = useStyles()
    const {locale} = useRouter()
    const t = useTranslation(locale)
    const [selectedProduct, setSelectedProduct] = useState(products.find((p: any) => p.id == id))
    const [count, setCount] = useState(1)

    const handleChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setSelectedProduct(products.find((p: any) => p.id == event.target.value))
    }

    const handleInputCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(event.target.value as unknown as number)
    }

    const handleInputBlur = () => {
        const value = parseInt(String(count), 10)
        if (value > 1) {
            setCount(value)
        } else {
            setCount(1)
        }
    }

    const price = useMemo(() => locale == 'ru'
        ? selectedProduct?.price_ru
        : selectedProduct?.price_en
        , [locale, selectedProduct])

    const photoSrc = useMemo(() => selectedProduct?.photo &&
        (host + (
            selectedProduct?.photo?.formats?.medium?.url
            || selectedProduct?.photo?.formats?.small?.url
            || selectedProduct?.photo.url
        ))
        , [host, selectedProduct])

    const uoms = useMemo(() => products.map((p: any) =>
        <MenuItem key={p.id} value={p.id}>{p.uom}</MenuItem>
    ), [products])

    return (
        <>
            <Head>
                <meta name="description"
                      content={`Product: ${selectedProduct.pn} UOM:${selectedProduct.uom} Description: ${selectedProduct.description_en}`}/>
                <link rel="alternate" hrefLang="ru" href={`https://lwaero.net/ru/products/${selectedProduct.id}`}/>
                <link rel="alternate" hrefLang="en" href={`https://lwaero.net/products/${selectedProduct.id}`}/>
                <link rel="alternate" hrefLang="x-default" href={`https://lwaero.net/products/${selectedProduct.id}`}/>
            </Head>
            <AppLayout title={selectedProduct.pn}>
                <Container maxWidth='lg'>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5} lg={4}>
                            <div className={styles.imageBox}>
                                <Image
                                    layout={'fill'}
                                    objectFit={'contain'}
                                    src={photoSrc ?? '/defaultProduct.png'}
                                    alt={selectedProduct.pn}/>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={7} lg={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h3' component='h1'><b>{selectedProduct.pn}</b></Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'
                                                component='span'>{selectedProduct[`description_${locale}`]}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='subtitle2'>{t.page.product_id.specifications}:</Typography>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Box className={styles.productDetailsWrapper}>
                                                <ProductDetails
                                                    group={selectedProduct.group?.name || selectedProduct.group && selectedProduct.group[0]?.name}
                                                    brand={selectedProduct.brand?.name || selectedProduct.brand && selectedProduct.brand[0]?.name}
                                                    color={selectedProduct.color}
                                                    mfg={selectedProduct.mfg}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <ConsignmentStatus consignments={selectedProduct.consignments}
                                                       expectedDeliveryDate={selectedProduct.expectedDeliveryDate}
                                                        availableOnVirtualStock={selectedProduct?.availableOnVirtualStock}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} lg={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={12}>
                                    <FormControl variant="outlined" className={styles.formControl} fullWidth>
                                        <InputLabel id="select-uom-label">UOM</InputLabel>
                                        <Select
                                            labelId="select-uom-label"
                                            id="select-uom"
                                            value={selectedProduct.id}
                                            onChange={handleChange}
                                            label="UOM"
                                        >
                                            {uoms}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6} lg={12}>
                                    <Price productId={selectedProduct.id} price={price}
                                           className={styles.priceWrapper}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <TextField
                                        id="add-to-cart-count"
                                        label={`${t.page.product_id.quantity}`}
                                        variant="standard"
                                        value={count}
                                        onChange={handleInputCount}
                                        onBlur={handleInputBlur}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} lg={8}>
                                    <ButtonAddToCart
                                        count={count}
                                        productId={selectedProduct.id}
                                        variant={'contained'}
                                        color={'primary'}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                        {selectedProduct[`longRead_${locale}`] &&
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant={'h5'} component={'h3'}>
                                        {t.page.product_id.productDescription}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className={styles.longReadWrapper}>
                                        <ReactMarkdown>
                                            {selectedProduct[`longRead_${locale}`]}
                                        </ReactMarkdown>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        }
                    </Grid>
                </Container>
            </AppLayout>
        </>
    )
}


type Params = {
    id: string
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {id} = ctx.params as Params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/reference/${id}`)
    const products = await res.json()
    return {
        props: {
            products,
            id,
            host: process.env.NEXT_PUBLIC_API_URL
        }
    }
}

export default Product