import React, {ChangeEvent, FC, FormEvent} from 'react'
import {
    createStyles,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles, Theme,
    withWidth
} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import {useSearch} from '../../utils/useSearch'
import {HeaderMode} from '../Header/Header'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'


type SearchFieldProps = {
    width:string,
    mode: HeaderMode,
}

type StyleProps = {
    mode: HeaderMode,
    width: string
}

const useStyles = makeStyles<Theme, StyleProps>(theme => createStyles({
    root: {
        '& > .MuiFilledInput-root':{
            minWidth: props => ['lg', 'xl', 'md'].includes(props.width)
                ? 600 : props.width == 'sm'
                    ? 450 : 280,
            color: props => (props.mode == 'main')
                ? theme.palette.common.white
                : theme.palette.common.black
        },
        '& > .MuiInputLabel-root':{
            color: props => (props.mode == 'main')
                ? theme.palette.common.white
                : theme.palette.primary.main,
            fontSize: props => ['sm', 'xs'].includes(props.width)
                ? '0.8rem'
                : '1rem'
        },
        '& > .MuiFilledInput-underline:before':{
            borderColor: props => (props.mode == 'main')
                ? theme.palette.common.white
                : theme.palette.primary.main,
        }
    },
    icon: {
        color: props => (props.mode == 'main')
            ? theme.palette.common.white
            : theme.palette.primary.main
    }
}))



const SearchField:FC<SearchFieldProps> = ({width = '', mode = 'main'}) => {
    const styles = useStyles({mode, width})
    const {searchRequest, searchItem, setSearchRequest} = useSearch()

    const {locale} = useRouter()
    const t = useTranslation(locale)

    const setSearchItem = async (e:FormEvent) => {
        e.preventDefault()
        await searchItem()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchRequest(e.target.value)
    }

    return (
        <form onSubmit={setSearchItem}>
            <FormControl variant="filled" className={styles.root}>
                <InputLabel htmlFor="mainSearch">
                    {t.components.SearchField.label}
                </InputLabel>
                <FilledInput
                    autoFocus={false}
                    id='mainSearch'
                    type='text'
                    value={searchRequest}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position='end' >
                            <IconButton
                                className={styles.icon}
                                aria-label={t.components.SearchField.shortLabel}
                                type='submit'
                                edge='end'
                                onClick={setSearchItem}
                            >
                                <Search/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </form>
    )
}

export default withWidth()(SearchField)