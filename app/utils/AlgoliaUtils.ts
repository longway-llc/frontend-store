import qs from 'qs'
import {SearchState} from 'react-instantsearch-core'

export const createURL = (searchState: SearchState) => `?${qs.stringify(searchState)}`
