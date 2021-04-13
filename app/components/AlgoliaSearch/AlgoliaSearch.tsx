import React, {FC, useState} from 'react'
import {SearchPageProps} from '../../pages/search'
import {useRouter} from 'next/router'
import ASBoxInput from '../ASBoxInput/ASBoxInput'
import Grid from '@material-ui/core/Grid'
import {makeStyles, Typography} from '@material-ui/core'
import ASHitList from '../ASHitList/ASHitList'
import {Configure, InstantSearch} from 'react-instantsearch-dom'
import {searchClient} from '../../utils/searchClient'
import {createURL} from '../../utils/AlgoliaUtils'
import {SearchState} from 'react-instantsearch-core'
import ASRefinementList from '../ASRefinementList/ASRefinementList'
import AsRefinementResetButton from '../ASRefinementResetButton/ASRefinementResetButton'
import ASPagination from '../ASPagination/ASPagination'
import {useTranslation} from '../../utils/localization'


const useStyles = makeStyles(theme => ({
    searchBox: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4)
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
    }
}))

const AlgoliaSearch: FC<SearchPageProps> = (props) => {
    const router = useRouter()
    const styles = useStyles()
    const t = useTranslation(router?.locale)
    const [searchState, setSearchState] = useState<SearchState>(props.searchState)


    const handleSearchStateChange = async (state: SearchState) => {
        setSearchState(state)
        const queryString = createURL(state)
        await router.push(`/${queryString}`, `/search${queryString}`, {shallow: true})
    }

    return (
        <InstantSearch
            {...props}
            createURL={createURL}
            onSearchStateChange={handleSearchStateChange}
            searchState={searchState}
            searchClient={searchClient}
        >
            <Configure hitsPerPage={9}/>
            <Grid container spacing={4}>
                <Grid item xs={12} className={styles.searchBox}>
                    <ASBoxInput mode={'black'}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9} component={'section'}>
                            <ASHitList/>
                        </Grid>
                        <Grid item xs={12} md={3} component={'aside'}>
                            <Grid container spacing={2} justify='center' direction='row'>
                                <Grid item xs={'auto'}>
                                    <Typography component='h2' variant='subtitle2'>
                                        {t.components.AlgoliaSearch.filters.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <ASRefinementList title={t.components.ASRefinementList.titles.group} attribute="group.name" limit={14}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <ASRefinementList title={t.components.ASRefinementList.titles.mfg} attribute="mfg"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <AsRefinementResetButton/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={styles.center}>
                    <ASPagination/>
                </Grid>
            </Grid>
        </InstantSearch>
    )
}

export default AlgoliaSearch