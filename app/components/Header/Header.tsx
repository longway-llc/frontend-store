import React, { FC, useEffect, useState } from 'react'
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Menu } from '@material-ui/icons'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { useTranslation } from '../../utils/localization'
import ActiveLink from '../ActiveLink/ActiveLink'
// eslint-disable-next-line import/no-cycle
import HeaderAccountMenu from '../HeaderAccountMenu/HeaderAccountMenu'
import LocaleSelect from '../LocaleSelect/LocaleSelect'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import ShoppingCartBadge from '../ShoppingCartBadge/ShoppingCartBadge'

export type HeaderMode = 'main' | 'black'

export type HeaderModeType = {
  headerMode?: HeaderMode
}

const useStyles = makeStyles<Theme, HeaderModeType>((theme) => createStyles({
  header: {
    zIndex: 1000,
    marginTop: '80px',
    '& a': {
      textDecoration: 'none',
    },
  },
  navigateList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  navItem: {
    color: (props) => (props.headerMode === 'main'
      ? theme.palette.common.white
      : theme.palette.text.primary),
    cursor: 'pointer',
    fontWeight: 300,
  },
  link: {
    display: 'block',
    '&:hover': {
      marginTop: '-2px',
      textDecoration: 'none',
      borderTop: (props) => `2px solid ${props.headerMode === 'main'
        ? theme.palette.common.white
        : theme.palette.common.black
      }`,
    },
  },
  activeLink: {
    marginTop: '-2px',
    borderTop: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      textDecoration: 'none',
      borderTop: `2px solid ${theme.palette.primary.main} !important`,
    },
  },
  logo: {
    display: 'block',
    cursor: 'pointer',
    width: '280px',
    '& img': {
      width: '100%',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  cartLink: {
    display: 'block',
    height: '40px',
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    padding: '0.3rem 0.35rem 0.3rem 0.3rem',
    backgroundColor: theme.palette.primary.main,
    fontWeight: 300,
    fontSize: '0.6rem',
    color: theme.palette.common.white,
    borderRadius: '50%',
  },
  burger: {
    color: (props) => (props.headerMode === 'main'
      ? theme.palette.common.white
      : theme.palette.common.black),
  },
}))

// eslint-disable-next-line import/no-cycle
const SearchInput = dynamic(() => import('../HeaderSearchInput/HeaderSearchInput'), { ssr: false })

const Header: FC<HeaderModeType> = ({ headerMode = 'black' }) => {
  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const classes = useStyles({ headerMode })
  const [menuState, setMenuState] = useState(false)
  const router = useRouter()
  const t = useTranslation(router?.locale)
  const [session] = useSession()

  useEffect(() => {
    if (isPhone) {
      setMenuState(false)
    }
  }, [isPhone])

  return (
    <Container maxWidth="xl" component="header" className={classes.header}>
      <Grid
        container
        justifyContent={isPhone ? 'center' : 'space-around'}
        alignItems="center"
      >
        <Grid item>
          <Link href="/">
            <a className={classes.logo}>
              <Image
                src={headerMode === 'main'
                  ? '/logo/LWAERO_general_logo_white.svg'
                  : '/logo/LWAERO_general_logo_black.svg'}
                height={70}
                width={280}
                alt="link to general page"
              />
            </a>
          </Link>
        </Grid>
        <Grid item hidden={isPhone}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <SearchInput headerMode={headerMode} />
            </Grid>
            <Grid item hidden={isTablet} component="nav">
              <Grid container component="ul" className={classes.navigateList} spacing={3}>
                <Grid item component="li">
                  <ActiveLink activeClassName={classes.activeLink} href="/">
                    <a className={classes.link}>
                      <Typography
                        variant="h6"
                        className={classes.navItem}
                      >
                        {t.header.general}
                      </Typography>
                    </a>
                  </ActiveLink>
                </Grid>
                <Grid item component="li">
                  <ActiveLink activeClassName={classes.activeLink} href="/search">
                    <a className={classes.link}>
                      <Typography
                        variant="h6"
                        className={classes.navItem}
                      >
                        {t.header.products}
                      </Typography>
                    </a>
                  </ActiveLink>
                </Grid>
                <Grid item component="li">
                  {/* <ActiveLink activeClassName={classes.activeLink} href="/ooo"> */}
                  <a className={classes.link} href="/ooo_longway.pdf">
                    <Typography variant="h6" component="h6" className={classes.navItem}>
                      {t.header.aboutUs}
                    </Typography>
                  </a>
                  {/* </ActiveLink> */}
                </Grid>
                <Grid item component="li">
                  <LocaleSelect />
                </Grid>
              </Grid>
            </Grid>
            {
                            session?.user
                            && (
                            <Grid item>
                              <Link href="/cart">
                                <a className={classes.cartLink}>
                                  <ShoppingCartBadge
                                    outlined
                                    fontSize="large"
                                    color={headerMode === 'main' ? 'secondary' : 'action'}
                                  />
                                </a>
                              </Link>
                            </Grid>
                            )
                        }
            <Grid item hidden={isTablet}>
              <Grid container spacing={2}>
                <HeaderAccountMenu headerMode={headerMode} />
              </Grid>
            </Grid>
            <Grid item hidden={!isTablet}>
              <Button variant="text" className={classes.burger} onClick={() => setMenuState(true)}>
                <Menu className={classes.cartLink} />
              </Button>
              <MenuDrawer anchor="right" open={menuState} setState={setMenuState} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Header
