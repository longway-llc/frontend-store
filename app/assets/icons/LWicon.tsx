import {SvgIcon, SvgIconProps} from '@material-ui/core'
import React, {FC} from 'react'

const LWicon:FC<SvgIconProps> = (props) => {
    return (
        <SvgIcon {...props}>
            <path  d="M3.3,5.5h2.5l1.9,10h1.9l0.4,2H5.6L3.3,5.5z"/>
            <path  d="M11.1,5.5l1.3,9h0l1.4-9h2.4l1.4,9h0l1.3-9h2.4l-2.2,12h-2.8l-1.4-8h0l-1.4,8h-2.8l-2.2-12H11.1z"/>
        </SvgIcon>
    )
}

export default LWicon