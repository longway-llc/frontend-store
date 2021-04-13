import React, {FC, useEffect, useState} from 'react'
import {
    Button,
    Divider,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core'
import {Dashboard, Home, Info, LocalOffer, Search, Settings} from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/styles'
import {useRouter} from 'next/router'
import {signOut, useSession} from 'next-auth/client'
import {useTranslation} from '../../utils/localization'


type Props = {
    anchor: 'left' | 'right',
    open: boolean,
    setState: (args: any) => any,
}

const useStyle = makeStyles((theme: Theme) => ({
    drawer: {
        '& .MuiDrawer-paperAnchorLeft': {
            width: 344
        }
    },
    titleBox: {
        backgroundColor: theme.palette?.primary.main
    },
    padder: {
        padding: '6px 0'
    },
    bgName: {
        backgroundColor: '#fafafa'
    }
}))


const MenuDrawer:FC<Props> = ({anchor, open, setState}) => {
    const router = useRouter()
    const t = useTranslation(router?.locale)
    const theme = useTheme()
    const classes = useStyle()
    const isLarge = useMediaQuery(theme.breakpoints.up('xl'))
    const [searchValue, setSearchValue] = useState('')
    const [session] = useSession()

    useEffect(() => {
        if (isLarge) {
            setState(false)
        }
    }, [isLarge])

    return (
        <SwipeableDrawer className={classes.drawer} anchor={anchor} open={open} onOpen={() => setState(true)}
                         onClose={() => setState(false)}>
            <List>
                <ListItem>
                    <ListItemText><Typography variant={'h5'}>{t.components.MenuDrawer.menu}</Typography></ListItemText>
                </ListItem>
                <Divider/>
                {session?.user &&
                <ListItem className={classes.bgName}>
                    <ListItemText><Typography
                        variant={'subtitle1'}><b>{session.user.email}</b></Typography></ListItemText>
                </ListItem>
                }
                <ListItem button onClick={async () => await router.push('/', '/')}>
                    <ListItemIcon><Home/></ListItemIcon>
                    <ListItemText primary={t.components.MenuDrawer.home}/>
                </ListItem>
                <ListItem button onClick={async () => await router.push('/about', '/about')}>
                    <ListItemIcon><Info/></ListItemIcon>
                    <ListItemText primary={t.components.MenuDrawer.about}/>
                </ListItem>

                {/*<ListItem button onClick={async () => await router.push('/search', '/search')}>*/}
                {/*    <ListItemIcon><Build/></ListItemIcon>*/}
                {/*    <ListItemText primary={'Продукция'}/>*/}
                {/*</ListItem>*/}

                {session?.user && <>
                    <Divider/>
                    <ListItem button onClick={async () => await router.push('/cabinet', '/cabinet')}>
                        <ListItemIcon><Dashboard/></ListItemIcon>
                        <ListItemText primary={t.components.MenuDrawer.cabinet}/>
                    </ListItem>
                    <ListItem button onClick={async () => await router.push('/cabinet/orders', '/cabinet/orders')}>
                        <ListItemIcon><LocalOffer/></ListItemIcon>
                        <ListItemText primary={t.components.MenuDrawer.orders}/>
                    </ListItem>
                    <ListItem button onClick={async () => await router.push('/cabinet/settings', '/cabinet/settings')}>
                        <ListItemIcon><Settings/></ListItemIcon>
                        <ListItemText primary={t.components.MenuDrawer.settings}/>
                    </ListItem>
                </>}

                <Divider/>

                <ListItem>
                    <Grid container className={classes.padder} justify={'center'}>
                        <Grid item>
                            <FormControl>
                                <InputLabel
                                    htmlFor="standard-adornment-search">{t.components.SearchField.shortLabel}</InputLabel>
                                <Input
                                    id="standard-adornment-search"
                                    type={'text'}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="search"
                                                onClick={async () => await router.push(`/search?item=${searchValue}`)}
                                                edge="end"
                                            >
                                                <Search/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Grid container spacing={2} className={classes.padder}>
                        {session?.user ?
                            <>
                                <Grid item xs={12}>
                                    <Button variant={'outlined'}
                                            fullWidth
                                            onClick={async () => await signOut()}
                                    >{t.auth.signOut}</Button>
                                </Grid>
                            </>
                            :
                            <>
                                <Grid item xs={12}>
                                    <Button variant={'outlined'}
                                            fullWidth
                                            onClick={async () => await router.push('/login')}
                                    >{t.auth.signIn}</Button>
                                </Grid>
                            </>
                        }
                    </Grid>
                </ListItem>
            </List>
        </SwipeableDrawer>
    )
}

export default MenuDrawer