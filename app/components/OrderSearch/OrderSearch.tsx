import {createStyles, IconButton, InputAdornment, InputBase, makeStyles, TextField, Theme} from '@material-ui/core'
import React from 'react'
import {Search} from '@material-ui/icons'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2,1),
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            width: 400
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1
        },
        iconButton: {
            padding: 10
        },
        divider: {
            height: 28,
            margin: 4
        }
    })
)


const OrderSearch = ({value, onChange}: any) => {
    const router = useRouter()
    const t = useTranslation(router?.locale)
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const styles = useStyles()
    return (
        <div className={styles.root}>
          <TextField
            variant={'outlined'}
            value={value}
            onChange={changeHandler}
            className={styles.input}
            placeholder={t.components.OrderSearch.searchBy}
            label={t.components.OrderSearch.searchBy}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Search/>
                </InputAdornment>
              ),
            }}
          />
        </div>
    )
}

export default OrderSearch
