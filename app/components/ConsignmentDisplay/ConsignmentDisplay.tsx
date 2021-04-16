import {Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Typography} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React, {FC, useMemo} from 'react'
import {useRouter} from 'next/router'
import moment from 'moment'
import {useTranslation} from '../../utils/localization'


const ConsignmentDisplay: FC<any> = ({consignments}) => {
    const {locale} = useRouter()
    const t = useTranslation(locale)
    const consignmentsDisplay = useMemo(() => consignments.map((consignment:any) => (
        <Accordion key={consignment.id}>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls={`${consignment.name}-content`}
                id={consignment.id}
            >
                <Typography >{consignment.name} </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item>
                        <Typography>
                            {t.components.ConsignmentDisplay.inStock}
                        </Typography>
                        <Box>
                            {consignment.placements.map((p:any) => (
                                <Typography key={p.stock.name}>
                                    <b>{p.stock.name}</b> {t.components.ConsignmentDisplay.quantity} <b>{p.balance}</b>
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                    { (consignment.productionDate || consignment.validUntil) &&
                        <>
                        <Divider variant={'fullWidth'} style={{width:'100%'}}/>
                        <Grid item>
                            <Typography>
                                {t.components.ConsignmentDisplay.dateProduction}: <b>{consignment?.productionDate && moment(consignment?.productionDate).locale(locale ?? 'en').format('L')  }</b>
                            </Typography>
                            <Typography>
                                {t.components.ConsignmentDisplay.sellBy}: <b>{consignment?.validUntil && moment(consignment?.validUntil).locale(locale ?? 'en').format('L')}</b>
                            </Typography>
                        </Grid>
                        </>
                    }
                </Grid>

            </AccordionDetails>
        </Accordion>
    )) , [consignments, t, locale])

    return (consignmentsDisplay)
}

export default ConsignmentDisplay