import React, {FC, useState} from 'react'
import {connectSearchBox} from 'react-instantsearch-dom'
import {
    createStyles,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    Theme,
    withWidth
} from '@material-ui/core'
import {Clear, Search} from '@material-ui/icons'
import {HeaderMode} from '../Header/Header'
import {SearchBoxProvided} from 'react-instantsearch-core'
import {useTranslation} from '../../utils/localization'
import {useRouter} from 'next/router'


interface StyleProps {
    mode: HeaderMode,
    width: string
}

const useStyles = makeStyles<Theme, StyleProps>(theme => createStyles({
    form: {
        width: '100%'
    },
    root: {
        '& > .MuiInput-root': {
            color: props => (props.mode == 'main')
                ? theme.palette.common.white
                : theme.palette.common.black
        },
        '& > .MuiInputLabel-root': {
            color: props => (props.mode == 'main')
                ? theme.palette.common.white
                : theme.palette.primary.main,
            fontSize: props => ['sm', 'xs'].includes(props.width)
                ? '0.8rem'
                : '1rem'
        },
        '& > .MuiInput-underline:before': {
            borderColor: props => (props.mode == 'main')
                ? theme.palette.primary.main
                : theme.palette.common.black
        },
        '& > .MuiInput-underline:after': {
            borderColor: props => (props.mode == 'main')
                ? theme.palette.common.white
                : theme.palette.primary.main
        }
    },
    input: {
        '&::-webkit-search-decoration': {
            display: 'none',
            width: 0,
            height: 0
        }
    },
    icon: {
        color: props => (props.mode == 'main')
            ? theme.palette.common.white
            : theme.palette.common.black
    }
}))


interface SearchFieldProps extends SearchBoxProvided {
    width: string,
    mode: HeaderMode,
}

let queryValue = ''

const ASBoxInput: FC<SearchFieldProps> = ({currentRefinement, refine, width = '', mode = 'black'}) => {
    const styles = useStyles({width, mode})
    const {locale} = useRouter()
    const t = useTranslation(locale)
    const [searchState, setSearchState] = useState(currentRefinement)
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (timer) clearTimeout(timer)
        setSearchState(event.currentTarget.value)
        queryValue = event.currentTarget.value
        setTimer(
            setTimeout(async () => {
                refine(queryValue)
            }, 1500)
        )
    }

    const handleReset = () => refine('')

    return (
        <form noValidate action="" role="search" className={styles.form}>
            <FormControl className={styles.root} fullWidth variant='filled'>
                <InputLabel htmlFor="search-products">
                    {t.components.ASBoxInput.searchLabel}
                </InputLabel>
                <FilledInput id="search-products" aria-describedby="product search" type="text"
                             className={styles.input}
                             value={searchState}
                             onChange={handleChange}
                             endAdornment={
                                 <InputAdornment position='end'>
                                     <IconButton
                                         className={styles.icon}
                                         aria-label='search'
                                         type='submit'
                                         edge='end'
                                     >
                                         <Search/>
                                     </IconButton>
                                     <IconButton
                                         className={styles.icon}
                                         aria-label='reset'
                                         type='button'
                                         edge='end'
                                         onClick={handleReset}
                                     >
                                         <Clear/>
                                     </IconButton>
                                 </InputAdornment>
                             }

                />
            </FormControl>
        </form>
    )
}

export default connectSearchBox(withWidth()(ASBoxInput))