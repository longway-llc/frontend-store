import React, {FC} from 'react'
import {Typography, TypographyProps} from '@material-ui/core'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'


const quote = {
    cursor: 'pointer'
}


type PriceProps = {
    price?: number,
} & TypographyProps

const Price: FC<PriceProps> = ({price, ...props}) => {

    const router = useRouter()
    const t = useTranslation(router.locale)
    const isNotQuote = price && price > 0

    if (isNotQuote) {
        return (
            <Typography  {...props}>
                <b>{price}</b> USD
            </Typography>
        )
    }
    return (
        <Typography {...props} style={quote}>
            <i>{t.components.Price.quote}</i>
        </Typography>
    )
}

export default Price