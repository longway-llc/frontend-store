import React, {FC} from 'react'
import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, makeStyles,
    Radio,
    Typography,
    withStyles
} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'

const GreenRadio = withStyles(theme => ({
    root: {
        color: grey[400],
        '&$checked': {
            color: theme.palette.primary.main,
        },
    },
    checked: {},
}))((props) => <Radio color="default" {...props} />)


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1)
    },
    ml1: {
        marginLeft: theme.spacing(1)
    },
    p1: {
        paddingTop: theme.spacing(1)
    }
}))

const AvailableOnVirtualStock: FC<Props> = ({availableOnVirtualStock}) => {
    const styles = useStyles()
    const router = useRouter()
    const t = useTranslation(router.locale)


    // FEATURE
    // const [value, setValue] = React.useState('')
    //
    // const handleChange = (event) => {
    //     setValue(event.target.value)
    // }

    // const variants = availableOnVirtualStock.map(variant => (
    //     <FormControlLabel key={variant.id} value={variant.virtual_stock.id} control={<GreenRadio />} label={`${variant.virtual_stock.name} ${variant.price} usd`} />
    // ))

    const variants = availableOnVirtualStock.map(variant => (
        <ListItem key={variant.id}>
            <ListItemAvatar>
                <Avatar>
                    <LocalShippingIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={<span>{variant.virtual_stock.name} {t.components.AvailableOnVirtualStock.for} <b>{variant.price}</b> USD</span>}
                secondary={
                    `${variant.virtual_stock.address}`
                }/>
        </ListItem>
    ))
    return (

        <Grid container direction={'column'} className={styles.root}>
            <Typography variant={'subtitle2'}>{t.components.AvailableOnVirtualStock.option}:</Typography>
            <Grid item >
                {/*FEATURE*/}
                {/*<FormControl component="fieldset">*/}
                {/*    <FormLabel component="legend" className={styles.p1}>*/}
                {/*        Также можете запросить этот товар со следующих складов:*/}
                {/*    </FormLabel>*/}
                {/*    <RadioGroup aria-label="want from another stock" name="virtualStock" value={value} onChange={handleChange}>*/}
                {/*        {variants}*/}
                {/*    </RadioGroup>*/}
                {/*</FormControl>*/}
                <List>
                    {variants}
                </List>
            </Grid>
        </Grid>

    )
}

type Props = {
    availableOnVirtualStock: Array<any>
}

export default AvailableOnVirtualStock
