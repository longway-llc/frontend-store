import React, {FC} from 'react'
import {useSession} from 'next-auth/client'
import {Box, createStyles, Grid, makeStyles, Typography} from '@material-ui/core'
import {green, grey, orange} from '@material-ui/core/colors'
import {theme} from '../../assets/theme'
import ConsignmentDisplay from '../ConsignmentDisplay/ConsignmentDisplay'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'
import moment from 'moment'


type ConsignmentStatusProps = {
    consignments: Array<any>,
    expectedDeliveryDate: string
}


const useStyles = makeStyles(() => createStyles({
    available: {
        color: green['700'],
        textAlign: 'center',
        border: `1px solid ${green['200']}`,
        borderRadius: `${theme.shape.borderRadius}px`
    },
    notAvailable: {
        color: orange['700'],
        textAlign: 'center',
        border: `1px solid ${orange['200']}`,
        borderRadius: `${theme.shape.borderRadius}px`
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    ml1: {
        marginLeft: theme.spacing(1),
        color: grey['500']
    }
}))

const ConsignmentStatus: FC<ConsignmentStatusProps> = ({consignments, expectedDeliveryDate}) => {
    const styles = useStyles()
    const {locale} = useRouter()
    const t = useTranslation(locale)
    const [session] = useSession()

    if (!session?.user) {
        return <Typography variant={'subtitle1'}
                           className={styles.available}>{t.components.ConsignmentStatus.available}!</Typography>
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                {consignments.length > 0 ?
                    <>
                        <Typography variant={'subtitle1'} className={styles.available}>
                            {t.components.ConsignmentStatus.available}!
                        </Typography>
                        <Box className={styles.mt1}>
                            <ConsignmentDisplay consignments={consignments}/>
                        </Box>
                    </>
                    :
                    <>
                        {
                            expectedDeliveryDate && <Typography variant={'overline'} className={styles.ml1}>
                                {t.components.ConsignmentStatus.expectedDelivery}: <b>{moment(expectedDeliveryDate).locale(locale ?? 'en').format('L')}</b>
                            </Typography>
                        }
                        <Typography variant={'subtitle1'} className={styles.notAvailable}>
                            {t.components.ConsignmentStatus.unavailable}!
                        </Typography>
                    </>
                }
            </Grid>
        </Grid>
    )
}

export default ConsignmentStatus