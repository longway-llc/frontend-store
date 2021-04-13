import {Checkbox, Container, createStyles, FormControlLabel, Grid, makeStyles, Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import React, {FC, useMemo} from 'react'
import {RefinementListProvided} from 'react-instantsearch-core'
import {connectRefinementList} from 'react-instantsearch-dom'


const useStyles = makeStyles(theme => createStyles({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    list: {
        listStyle: 'none'
    },
    itemCaption: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '150px'
        }
    },
    itemCaptionWrapper: {
        display: 'flex',
        alignItems: 'center',
        '& span + span': {
            marginLeft: theme.spacing(1)
        }
    }
}))


interface CustomRefinementList extends RefinementListProvided {
    title: string
}

const ASRefinementList: FC<CustomRefinementList> = ({items, currentRefinement, refine, title}) => {
    const styles = useStyles()
    const handleChange = (value: string[]) => (event: React.ChangeEvent<HTMLInputElement>) => {
        refine(value)
    }

    const listItems = useMemo(() => items.map(item => (
        <li key={item.label}>
            <FormControlLabel
                control={
                    <Checkbox checked={item.isRefined} onChange={handleChange(item.value)} color='primary'/>
                }
                label={
                    <div className={styles.itemCaptionWrapper}>
                        <Typography component='span' variant='body1' className={styles.itemCaption}>{item.label + '  '}</Typography>
                        <Typography component='span' variant='caption'>({item.count})</Typography>
                    </div>
                }
            />
        </li>
    )), [items])

    return (
        <Paper>
            <Container className={styles.root}>
                <Grid container spacing={2} justify='center'>
                    <Grid item xs={'auto'}>
                        <Typography variant={'subtitle2'} component={'h6'}>{title}</Typography>
                    </Grid>
                    <Grid item xs={12} component={'ul'} className={styles.list} zeroMinWidth>
                        {listItems}
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default connectRefinementList(ASRefinementList)