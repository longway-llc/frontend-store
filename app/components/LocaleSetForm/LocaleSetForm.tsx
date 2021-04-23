import React, {FC} from 'react'
import {
    Button,
    createStyles,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Typography
} from '@material-ui/core'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'
import useCookie from 'react-use-cookie'


const useStyles = makeStyles(theme => createStyles({
    root: {
        padding: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(1)
    },
    field: {
        marginTop: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(1)
    }
}))

const LocaleSetForm: FC = () => {
    const styles = useStyles()
    const router = useRouter()
    const t = useTranslation(router?.locale)

    const [currentLocale, setCurrentLocale] = useCookie('NEXT_LOCALE', '')
    const [lang, setLang] = React.useState(currentLocale)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLang(event.target.value as string)
    }


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setCurrentLocale(lang, {days: 999999})
        await router.push(router.asPath, router.asPath, {locale: lang})
    }


    return (
        <Paper component={'form'} onSubmit={handleSubmit} className={styles.root}>
            <Typography variant='subtitle1'
                        className={styles.title}>{t.components.LocaleSetForm.title}</Typography>
            <FormControl variant="outlined" fullWidth className={styles.field}>
                <InputLabel id="locale-select-label">{t.components.LocaleSetForm.label}</InputLabel>
                <Select
                    labelId="locale-select-label"
                    id="locale-select"
                    value={lang}
                    onChange={handleChange}
                    label={t.components.LocaleSetForm.label}
                >
                    <MenuItem value={'en'}>English</MenuItem>
                    <MenuItem value={'ru'}>Русский</MenuItem>
                </Select>
            </FormControl>
            <Button
                type={'submit'}
                variant='outlined'
                color='primary'
                className={styles.button}
                fullWidth
            >
                {t.components.LocaleSetForm.updateButton}
            </Button>
        </Paper>
    )
}

export default LocaleSetForm