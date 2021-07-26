import { useCallback } from 'react'

import { en } from '../locales/en'
import { ru } from '../locales/ru'

export type CurrentLocale = 'ru' | 'en' | undefined

export function useTranslation(locale: string | undefined) {
  const t = useCallback(() => (locale === 'ru' ? ru : en), [locale])
  return t()
}
