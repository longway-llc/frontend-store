import React, {FC, useMemo} from 'react'
import {
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    useMediaQuery,
    useTheme
} from '@material-ui/core'
import {Dashboard, LocalOffer, Settings} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import ActiveLink from '../ActiveLink/ActiveLink'
import {useRouter} from 'next/router'
import {useTranslation} from '../../utils/localization'


const useStyles = makeStyles((theme: Theme) => ({
    verticalDivider: {
        //borderRight: `1px solid ${theme.palette.text.hint}`
    },
    activeLink: {
        '& > *': {
            color: theme.palette.primary.light
        }
    },
    listItem: {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiListItemIcon-root': {
            justifyContent: 'center'
        }
    }
}))


const CabinetMenu:FC = () => {
    const router = useRouter()
    const t = useTranslation(router?.locale)

    const items = useMemo(() => [
        {icon: <Dashboard/>, text: t.components.CabinetMenu.cabinet, link: '/cabinet'},
        {icon: <LocalOffer/>, text: t.components.CabinetMenu.orders, link: '/cabinet/orders'},
        {icon: <Settings/>, text: t.components.CabinetMenu.settings, link: '/cabinet/settings'}
    ], [t])

    const theme = useTheme()
    const isPhone = useMediaQuery(theme.breakpoints.down('md'))
    const styles = useStyles({isPhone})

    const listItems = useMemo(() => items.map((item, i) => (
        <ActiveLink key={i} href={item.link} activeClassName={styles.activeLink}>
            <ListItem className={isPhone ? styles.listItem : ''} button>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <Hidden mdDown>
                    <ListItemText primary={item.text}/>
                </Hidden>
            </ListItem>
        </ActiveLink>
    )), [items, isPhone, styles])

    return (
        <Hidden smDown>
            <Grid item sm={isPhone ? 1 : 3}>
                <List component="nav" className={styles.verticalDivider} aria-label="cabinet navigation">
                    {listItems}
                </List>
            </Grid>
        </Hidden>
    )
}

export default CabinetMenu