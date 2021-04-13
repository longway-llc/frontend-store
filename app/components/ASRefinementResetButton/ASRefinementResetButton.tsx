import { Button } from '@material-ui/core'
import React, {FC} from 'react'
import {connectCurrentRefinements, CurrentRefinementsProvided} from 'react-instantsearch-core'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'




const AsRefinementResetButton:FC<CurrentRefinementsProvided> = ({items, refine}) => {
    const locale = useRouter()?.locale
    const t = useTranslation(locale)
    const clickHandle = () => {
        refine(items)
    }
    
    if (items.length) {
        return (
            <Button variant='outlined' color='primary' onClick={clickHandle} disabled={!items.length} fullWidth>
                {t.components.ASRefinementResetButton.reset}
            </Button>
        )
    } else {
        return null
    }
    
    
}

export default connectCurrentRefinements(AsRefinementResetButton)