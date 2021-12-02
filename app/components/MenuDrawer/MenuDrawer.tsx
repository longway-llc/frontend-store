import React, {
  ChangeEvent, FC, FormEvent, useEffect,
} from 'react'
import {
  Box,
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
  useTheme,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import {
  Dashboard, Home, Info, LocalOffer, Search, Settings,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

import { useTranslation } from '../../utils/localization'
import { useSearch } from '../../utils/useSearch'
import LocaleSelect from '../LocaleSelect/LocaleSelect'

type Props = {
  anchor: 'left' | 'right',
  open: boolean,
  setState: (args: any) => any,
}

const useStyle = makeStyles((theme: Theme) => ({
  drawer: {
    '& .MuiDrawer-paperAnchorLeft': {
      width: 344,
    },
  },
  titleBox: {
    backgroundColor: theme.palette?.primary.main,
  },
  padder: {
    padding: '6px 0',
  },
  bgName: {
    backgroundColor: '#fafafa',
  },
  m1: {
    margin: theme.spacing('auto', 1, 1, 1),
  },
}))

const MenuDrawer:FC<Props> = ({ anchor, open, setState }) => {
  const router = useRouter()
  const t = useTranslation(router?.locale)
  const theme = useTheme()
  const classes = useStyle()
  const isLarge = useMediaQuery(theme.breakpoints.up('xl'))
  const { searchRequest, searchItem, setSearchRequest } = useSearch()
  const [session] = useSession()

  useEffect(() => {
    if (isLarge) {
      setState(false)
    }
  }, [isLarge, setState])

  const handelChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchRequest(e.target.value)
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    await searchItem()
  }

  return (
    <SwipeableDrawer
      className={classes.drawer}
      anchor={anchor}
      open={open}
      onOpen={() => setState(true)}
      onClose={() => setState(false)}
    >
      <List>
        <ListItem>
          <ListItemText><Typography variant="h5">{t.components.MenuDrawer.menu}</Typography></ListItemText>
        </ListItem>
        <Divider />
        {session?.user
                && (
                <ListItem className={classes.bgName}>
                  <ListItemText>
                    <Typography
                      variant="subtitle1"
                    >
                      <b>{session.user.email}</b>
                    </Typography>
                  </ListItemText>
                </ListItem>
                )}
        <ListItem button onClick={async () => router.push('/', '/')}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary={t.components.MenuDrawer.home} />
        </ListItem>
        <ListItem button onClick={async () => router.push('/ooo_longway.pdf', '/ooo_longway.pdf')}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary={t.components.MenuDrawer.about} />
        </ListItem>

        {session?.user && (
          <>
            <Divider />
            <ListItem button onClick={async () => router.push('/cabinet', '/cabinet')}>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary={t.components.MenuDrawer.cabinet} />
            </ListItem>
            <ListItem button onClick={async () => router.push('/cabinet/orders', '/cabinet/orders')}>
              <ListItemIcon><LocalOffer /></ListItemIcon>
              <ListItemText primary={t.components.MenuDrawer.orders} />
            </ListItem>
            <ListItem button onClick={async () => router.push('/cabinet/settings', '/cabinet/settings')}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary={t.components.MenuDrawer.settings} />
            </ListItem>
          </>
        )}

        <Divider />

        <ListItem>
          <Grid container className={classes.padder} justifyContent="center">
            <Grid item component="form" onSubmit={handleSubmit}>
              <FormControl>
                <InputLabel
                  htmlFor="standard-adornment-search"
                >
                  {t.components.SearchField.shortLabel}
                </InputLabel>
                <Input
                  id="standard-adornment-search"
                  type="text"
                  value={searchRequest}
                  onChange={handelChange}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="search"
                        edge="end"
                        type="submit"
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                                      )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={2} className={classes.padder}>
            {session?.user
              ? (
                <>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={async () => signOut()}
                    >
                      {t.auth.signOut}
                    </Button>
                  </Grid>
                </>
              )
              : (
                <>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={async () => router.push('/login')}
                    >
                      {t.auth.signIn}
                    </Button>
                  </Grid>
                </>
              )}
          </Grid>
        </ListItem>
      </List>
      <Box className={classes.m1}>
        <LocaleSelect bottom />
      </Box>
    </SwipeableDrawer>
  )
}

export default MenuDrawer
