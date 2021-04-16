import {createStyles, Grid, makeStyles} from '@material-ui/core'
import React, {FC, useMemo} from 'react'
import {connectHits, HitsProvided} from 'react-instantsearch-core'
import ASHit from '../ASHit/ASHit'


const useStyles = makeStyles(() => createStyles({
    HitList: {
        listStyle: 'none',
        paddingLeft: 0
    }
}))

const ASHitList: FC<HitsProvided<unknown>> = ({hits}) => {
    const styles = useStyles()
    const items = useMemo(() => hits.map((hit) => (
        <Grid item component='li' key={hit.objectID}>
            <ASHit hit={hit}/>
        </Grid>
    )), [hits])

    return (
        <Grid container spacing={4} direction='column' component='ul' className={styles.HitList}>
            {items}
        </Grid>
    )
}

export default connectHits(ASHitList)