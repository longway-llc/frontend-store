import React, { FC, useEffect, useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  createStyles,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { MoreVert, Search } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import LWicon from '../../assets/icons/LWicon'
import { useTranslation } from '../../utils/localization'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import ShoppingCartBadge from '../ShoppingCartBadge/ShoppingCartBadge'

const pages = [
  '/',
  '/search',
  '/cart',
]

const useStyles = makeStyles(() => createStyles({
  footer: {
    marginTop: 'auto',
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
  },
  desktopFooter: {
    minHeight: '100px',
  },
}))

const Footer:FC<any> = () => {
  const [session] = useSession()
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles()
  const router = useRouter()
  const t = useTranslation(router?.locale)

  const [value, setValue] = useState(0)
  const [menuState, setMenuState] = useState(false)

  useEffect(() => {
    const tabIndex = parseInt(
      Object.keys(pages).find((key) => pages[parseInt(key, 10)] === router.pathname) as string,
      10,
    )
    setValue(tabIndex ?? 3)
  }, [value, router])

  useEffect(() => {
    if (isTablet) {
      setMenuState(false)
    }
  }, [isTablet])

  const handleChange = async (event: React.ChangeEvent<Record<string, never>>, newValue: any) => {
    setValue(value)
    if (newValue !== 3) {
      await router.push(pages[newValue])
    } else setMenuState(true)
  }

  return (

    <Hidden mdUp>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.footer}
      >
        <BottomNavigationAction
          label={
                    t.footer.home
                }
          icon={<LWicon />}
        />

        <BottomNavigationAction
          label={
                    t.footer.search
                }
          icon={<Search />}
        />
        {
                    session?.user
                    && (
                    <BottomNavigationAction
                      label={
                        t.footer.cart
                    }
                      icon={
                        <ShoppingCartBadge border />
                    }
                    />
                    )
                }

        <BottomNavigationAction label="Menu" icon={<MoreVert />} />
      </BottomNavigation>
      <MenuDrawer anchor="left" open={menuState} setState={setMenuState} />
    </Hidden>

  )
}

export default Footer
