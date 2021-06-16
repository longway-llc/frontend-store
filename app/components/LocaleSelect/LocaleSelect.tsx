import React, {FC, useState} from 'react'
import Image from 'next/image'
import {createStyles, makeStyles, Theme} from '@material-ui/core'
import ru_flag from '../../assets/imgs/ru_flag.png'
import en_flag from '../../assets/imgs/eu_flag.png'
import {useRouter} from 'next/router'
import useCookie from 'react-use-cookie'

type LocaleSelectProps = {
  bottom?: boolean
  children?: never
}

type PropsStyle = {
  bottom: boolean
  open: boolean
}

const useStyles = makeStyles<Theme,PropsStyle>(() => createStyles({
  root: {
    position: 'relative',
    display: 'block',
    width: '40px',
    height: '40px'
  },
  dropdown: {
    display: (props) => props.open ? 'block' : 'none',
    position: 'absolute',
    width: '40px',
    height: '20px',
    top: (props) => props.bottom ? '-40px' : '40px'
  }
}))



const LocaleSelect:FC<LocaleSelectProps> = ({bottom = false}) => {
  const [open, setOpen] = useState(false)
  const styles = useStyles({open, bottom})
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useCookie('NEXT_LOCALE')

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleSelect = async () => {
    const locale = router?.locale == 'ru' ? 'en' : 'ru'
    setCurrentLocale(locale, {days: 999999})
    toggleOpen()
    await router.push(router.asPath, router.asPath, {locale})
  }

  return (
    <div className={styles.root} role={'select'}>
      <div onClick={toggleOpen}>
        <Image
          src={currentLocale == 'ru' ? ru_flag : en_flag}
          alt={currentLocale == 'ru' ? 'флаг России' : 'international flag'}
          layout={'fixed'}
          width={40}
          height={40}/>
      </div>
      <div className={styles.dropdown} onClick={handleSelect}>
        <Image
          src={currentLocale != 'ru' ? ru_flag : en_flag}
          alt={currentLocale != 'ru' ? 'флаг России' : 'international flag'}
          layout={'fixed'}
          width={40}
          height={40}/>
      </div>
    </div>
  )
}

export default LocaleSelect
