import React, {FC} from 'react'
import {useSession} from 'next-auth/client'
import {Box, createStyles, Grid, makeStyles, Typography} from '@material-ui/core'
import {green, orange} from '@material-ui/core/colors'
import {theme} from '../../assets/theme'
import ConsignmentDisplay from '../ConsignmentDisplay/ConsignmentDisplay'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'


type ConsignmentStatusProps = {
    consignments: Array<any>
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
    }
}))

const ConsignmentStatus: FC<ConsignmentStatusProps> = ({consignments}) => {
    const styles = useStyles()
    const {locale} = useRouter()
    const t = useTranslation(locale)
    const [session, loading] = useSession()

    if (!session?.user) {
        return <Typography variant={'subtitle1'} className={styles.available}>{t.components.ConsignmentStatus.available}!</Typography>
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
                    <Typography variant={'subtitle1'} className={styles.notAvailable}>
                        {t.components.ConsignmentStatus.unavailable}!
                    </Typography>
                }
            </Grid>
        </Grid>
    )
}

export default ConsignmentStatus