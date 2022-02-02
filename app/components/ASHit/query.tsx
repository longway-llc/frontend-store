import { gql } from '@apollo/client'

export const GET_USER_REGION = gql`
    query getUserRegion {
        me {
            user {
                locale
            }
        }
    }
`
