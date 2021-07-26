// lib/apolloClient.js
import { useMemo } from 'react'
import {
  ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject,
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_URL ?? 'https://api.lwaero.net'}/graphql`,
    }),
    cache: new InMemoryCache(),
    credentials: 'include',
  })
}

export function initializeApollo(initialState: NormalizedCacheObject)
  : ApolloClient<NormalizedCacheObject> {
  const tempApolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = tempApolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    tempApolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return tempApolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = tempApolloClient
  return tempApolloClient
}

export function useApollo(initialState: NormalizedCacheObject)
  : ApolloClient<NormalizedCacheObject> {
  return useMemo(() => initializeApollo(initialState), [initialState])
}
