import {useRouter} from 'next/router'
import { SetStateAction } from 'react'
import {Dispatch, useCallback, useState} from 'react'
import useEventListener from './useEventListener.hook'

type useSearchReturnObject = {
    searchRequest: string
    setSearchRequest: Dispatch<SetStateAction<string>>
    searchItem: () => Promise<void>
}

/**
 * React hook for search string request sending
 * @returns {{string, Dispatch, Promise}} - hook object with 3 fields:
 * searchRequest - current value of search string,
 * setSearchRequest - dispatch function for setting search value,
 * searchItem - promise for redirect on search page in app with searchRequest
 * */
export const useSearch = ():useSearchReturnObject => {
    const router = useRouter()
    const [searchRequest, setSearchRequest] = useState('')

    const searchItem = useCallback(async () => {
        await router.push({pathname: '/search', query: {query: searchRequest.trim(),page:1}})
    }, [searchRequest, router])

    useEventListener('keypress', async (e: React.KeyboardEvent) => {
        // keyCode = 13 => Enter button
        if (e.code == 'Enter' && searchRequest.trim().length > 0) {
            await router.push({pathname: '/search', query: {query: searchRequest.trim(),page:1}})
        }
    })

    return {searchRequest, setSearchRequest, searchItem}
}
