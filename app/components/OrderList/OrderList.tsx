import React, {FC, useMemo, useState} from 'react'
import {Session} from 'next-auth'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    createStyles,
    Grid,
    Hidden,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core'
import {ExpandMore} from '@material-ui/icons'
import {gql, useQuery} from '@apollo/client'
import {getUserOrders} from './__generated__/getUserOrders'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'
import OrderSearch from '../OrderSearch/OrderSearch'


const useStyles = makeStyles(theme => createStyles({
    container: {
        paddingInlineStart: 0
    },
    listItem: {
        listStyle: 'none'
    },
    alignRight: {
        textAlign: 'right'
    },
    root: {
        width: '100%'
    },
    hoverRow: {
        transition: '.3s ease',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    scaleTable: {
        '& .MuiTableCell-root': {
            fontSize: '0.8rem !important',
            wordWrap: 'normal'
        }
    }
}))


type OrderListProps = {
    jwt: Session['jwt']
}

export const GET_USER_ORDERS = gql`
    query getUserOrders {
        me {
            user {
                orders {
                    id
                    invoice
                    status
                    saleProductData {
                        id
                        count
                        sellingPrice
                        product {
                            id
                            pn
                            uom
                            color
                            description_en
                            description_ru
                            group {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`

const OrderList: FC<OrderListProps> = ({jwt}) => {
    const router = useRouter()
    const t = useTranslation(router?.locale)
    const styles = useStyles()
    const theme = useTheme()
    const isSmallPhone = useMediaQuery(theme.breakpoints.down('xs'))

    const [filter, setFilter] = useState('')
    const [expanded, setExpanded] = useState<string>()

    const openOrder = (orderId: string) => (event: React.ChangeEvent<Record<string, unknown>>, isExpanded: boolean) => {
        setExpanded(isExpanded ? orderId : '')
    }

    const {
        data,
        loading,
        error
    } = useQuery<getUserOrders>(GET_USER_ORDERS, {context: {headers: {authorization: `Bearer ${jwt}`}}})

    const orders = useMemo(() => data && data?.me?.user?.orders?.filter(item => item?.invoice?.search(filter) != -1).map(item => item && (
        <Grid item key={item.id} xs={12} component="li" className={styles.listItem}>
            <Accordion expanded={expanded == item.id} onChange={openOrder(item.id)}>
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls={`${item.id}bh-content`}
                    id={`${item.id}bh-header`}
                >
                    <Grid container spacing={1} justify={'space-between'}>
                        <Grid item xs={12} sm={'auto'}>
                            <Typography>{t.components.OrderList.order}: {item.invoice}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={'auto'}><Typography>{t.components.OrderList.status}: <b>{item.status}</b></Typography></Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2} direction={'column'}>
                        <Grid item className={isSmallPhone ? styles.scaleTable : ''}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">PN</TableCell>
                                        <Hidden smDown>
                                            <TableCell align="left">UOM</TableCell>
                                            <TableCell align="left">{t.components.OrderList.description}</TableCell>
                                            <TableCell align="left">{t.components.OrderList.color}</TableCell>
                                        </Hidden>
                                        <TableCell align="right">{t.components.OrderList.sellingPrice}</TableCell>
                                        <TableCell align="right">{t.components.OrderList.count}</TableCell>
                                        <TableCell align="right">{t.components.OrderList.total}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.saleProductData?.map((p, i) => (
                                        <TableRow key={i} className={styles.hoverRow}
                                                  onClick={async () => await router.push('/products/[id]', `/products/${p?.product?.id}`)}>
                                            <TableCell>{p?.product?.pn}</TableCell>
                                            <Hidden smDown>
                                                <TableCell>{p?.product?.uom}</TableCell>
                                                <TableCell>{router?.locale == 'ru' ? p?.product?.description_ru : p?.product?.description_en}</TableCell>
                                                <TableCell>{p?.product?.color}</TableCell>
                                            </Hidden>
                                            <TableCell align="right">{p?.sellingPrice} USD</TableCell>
                                            <TableCell align="right">{p?.count}</TableCell>
                                            <TableCell
                                                align="right">{(p?.sellingPrice ?? 0) * (p?.count ?? 0)} USD</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12} className={styles.alignRight}>
                            <Typography variant={'subtitle1'}>
                                <b>{t.components.OrderList.total}:</b> {item.saleProductData?.reduce((acc, p) => acc + (p?.count ?? 0) * (p?.sellingPrice ?? 0), 0)} USD
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Grid>
    )), [filter, data, expanded, isSmallPhone, styles, t, router])


    if (error) return (
        <Grid container justify={loading ? 'center' : 'space-evenly'} spacing={1}>
            <Typography variant="subtitle1" color="error">{error.message}</Typography>
        </Grid>
    )

    return (
        <Grid container justify={loading ? 'center' : 'space-evenly'} className={styles.container} spacing={1}
              component="ul" direction={'column'}>
            {loading ?
                <img src="/Preloader.svg" alt="loading"/>
                :
                <>
                    <OrderSearch onChange={setFilter} value={filter}/>
                    {orders && (orders?.length > 0) ? orders :
                        <Typography variant={'overline'} color={'error'}>{t.components.OrderList.notFound}</Typography>
                    }
                </>
            }
        </Grid>
    )
}

export default OrderList
