import React, {FC} from 'react'
import {
    Box,
    Button,
    createStyles,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    Theme
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import {useRouter} from 'next/router'
import {AccountBox, Dashboard, ExitToApp} from '@material-ui/icons'
import {signOut, useSession} from 'next-auth/client'
import {HeaderModeType} from '../Header/Header'
import Link from 'next/link'
import {useTranslation} from '../../utils/localization'


const useStyles = makeStyles<Theme, HeaderModeType>(theme => createStyles({
    menuButton: {
        color: props => props.headerMode == 'black'
            ? theme.palette.common.black
            : theme.palette.common.white,
        border: props => props.headerMode == 'black'
            ? '1px solid rgba(0, 0, 0, 0.23)'
            : '1px solid #a5a5a5'
    },
    svg: {
        marginLeft: '8px'
    },
    buttonLogin: {
        color: props => props.headerMode == 'black'
            ? theme.palette.common.black
            : theme.palette.common.white
    }
}))

const HeaderAccountMenu: FC<HeaderModeType> = ({headerMode = 'main'}) => {
    const router = useRouter()
    const t = useTranslation(router?.locale)
    const classes = useStyles({headerMode})
    const [session, loading] = useSession()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    if (loading)
        return (<img src="/small_preloader.svg" style={{height: '76px'}} alt="loading"/>)

    if (session) {
        return <Box>
            <Button className={classes.menuButton} variant={'outlined'} aria-controls="header-account-menu"
                    aria-haspopup="true" onClick={handleClick}>
                {session.user.email} <AccountBox className={classes.svg}/>
            </Button>
            <Menu
                id="header-account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                elevation={0}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={async () => await router.push('/cabinet')}>
                    <ListItemIcon>
                        <Dashboard fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary={t.components.MenuDrawer.cabinet}/>
                </MenuItem>
                <MenuItem onClick={async () => await signOut()}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary={t.auth.signOut}/>
                </MenuItem>
            </Menu>
        </Box>
    }

    return (
        <Grid item>
            <Link href={'/login'}><a>
                <Button color={'secondary'} variant={'text'} className={classes.buttonLogin}>
                    {t.auth.signIn}
                </Button>
            </a></Link>
        </Grid>
    )
}

export default HeaderAccountMenu