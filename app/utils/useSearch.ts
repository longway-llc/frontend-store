import {useRouter} from 'next/router'
import {useCallback, useState} from 'react'
import useEventListener from './useEventListener.hook'

/**
 * React hook for search string request sending
 * @returns {{string, Dispatch, Promise}} - hook object with 3 fields:
 * searchRequest - current value of search string,
 * setSearchRequest - dispatch function for setting search value,
 * searchItem - promise for redirect on search page in app with searchRequest
 * */
export const useSearch = () => {
    const router = useRouter()
    const [searchRequest, setSearchRequest] = useState('')

    const searchItem = useCallback(async () => {
        await router.push({pathname: '/search', query: {item: searchRequest.trim()}})
    }, [searchRequest, router])

    useEventListener('keypress', async (e: { keyCode: number; }) => {
        // keyCode = 13 => Enter button
        if (e.keyCode == 13 && searchRequest.trim().length > 0) {
            await router.push({pathname: '/search', query: {item: searchRequest.trim()}})
        }
    })

    return {searchRequest, setSearchRequest, searchItem}
}
