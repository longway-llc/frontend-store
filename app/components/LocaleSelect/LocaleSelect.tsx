import React, { FC, useState } from 'react'
import useCookie from 'react-use-cookie'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Image from 'next/image'
import { useRouter } from 'next/router'

type LocaleSelectProps = {
  bottom?: boolean
  children?: never
}

type PropsStyle = {
  bottom: boolean
  open: boolean
}

const useStyles = makeStyles<Theme, PropsStyle>(() => createStyles({
  root: {
    position: 'relative',
    display: 'block',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
  },
  dropdown: {
    display: (props) => (props.open ? 'block' : 'none'),
    position: 'absolute',
    width: '40px',
    height: '20px',
    top: (props) => (props.bottom ? '-40px' : '40px'),
  },
}))

const LocaleSelect:FC<LocaleSelectProps> = ({ bottom = false }) => {
  const [open, setOpen] = useState(false)
  const styles = useStyles({ open, bottom })
  const router = useRouter()
  const [,setCurrentLocale] = useCookie('NEXT_LOCALE')

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = async () => {
    const locale = router?.locale === 'ru' ? 'en' : 'ru'
    setCurrentLocale(locale, { days: 999999 })
    toggleOpen()
    await router.push(router.asPath, router.asPath, { locale })
  }

  return (
  // eslint-disable-next-line jsx-a11y/aria-role
    <div className={styles.root} role="select">
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={toggleOpen}>
        <Image
          src={router?.locale === 'ru' ? '/assets/imgs/ru_flag.png' : '/assets/imgs/eu_flag.png'}
          alt={router?.locale === 'ru' ? 'флаг России' : 'international flag'}
          layout="fixed"
          width={40}
          height={40}
        />
      </div>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={styles.dropdown} onClick={handleSelect}>
        <Image
          src={router?.locale !== 'ru' ? '/assets/imgs/ru_flag.png' : '/assets/imgs/eu_flag.png'}
          alt={router?.locale !== 'ru' ? 'флаг России' : 'international flag'}
          layout="fixed"
          width={40}
          height={40}
        />
      </div>
    </div>
  )
}

export default LocaleSelect
