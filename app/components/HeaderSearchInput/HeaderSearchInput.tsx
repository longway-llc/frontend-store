import React, {FC, FormEvent} from 'react'
import {createStyles, FormControl, Input, InputAdornment, InputLabel, makeStyles, Theme} from '@material-ui/core'
import {Search} from '@material-ui/icons'

import {useSearch} from '../../utils/useSearch'
import {HeaderMode, HeaderModeType} from '../Header/Header'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'

type StyleProps = {
    headerMode: HeaderMode
}

const useStyles = makeStyles<Theme, StyleProps>(theme => createStyles({
    root: {
        '& > .MuiInputLabel-root.Mui-focused': {
            color: props => (props.headerMode == 'main')
                ? theme.palette.common.white
                : theme.palette.common.black
        },
        '& > .MuiInput-underline:before': {
            borderColor: props => (props.headerMode == 'main')
                ? theme.palette.common.white
                : theme.palette.common.black,
        },
    },
    label: {
        color: props => (props.headerMode == 'main')
            ? theme.palette.common.white
            : theme.palette.common.black
    },
    input: {
        color: props => (props.headerMode == 'main')
            ? theme.palette.common.white
            : theme.palette.common.black,
        '&:focus': {
            color: props => (props.headerMode == 'main')
                ? theme.palette.common.white
                : theme.palette.common.black
        }
    },
    icon: {
        color: props => (props.headerMode == 'main')
            ? theme.palette.common.white
            : theme.palette.common.black
    }
}))

const HeaderSearchInput: FC<HeaderModeType> = ({headerMode = 'main'}) => {
    const styles = useStyles({headerMode})
    const {searchRequest, searchItem, setSearchRequest} = useSearch()

    const locale = useRouter()?.locale
    const t = useTranslation(locale)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchRequest(e.target.value)

    const setSearchItem = async (e:FormEvent) => {
        e.preventDefault()
        await searchItem()
    }

    return (
        <form onSubmit={setSearchItem}>
            <FormControl className={styles.root}>
                <InputLabel className={styles.label} htmlFor='search-header'>
                    {t.components.SearchField.shortLabel}
                </InputLabel>
                <Input
                    className={styles.input}
                    value={searchRequest}
                    id="search-header"
                    startAdornment={
                        <InputAdornment position="start" className={styles.icon}>
                            <Search type='submit'/>
                        </InputAdornment>
                    }
                    onChange={handleChange}
                />
            </FormControl>
        </form>
    )
}

export default HeaderSearchInput 