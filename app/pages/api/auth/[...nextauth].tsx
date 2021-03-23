import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {NextApiRequest, NextApiResponse} from 'next'

const options = {
    providers: [
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST ?? 'smtp-relay.gmail.com',
                port: parseInt(process.env.EMAIL_SERVER_PORT ?? '465', 10),
                auth: {
                    user: process.env.EMAIL_USERNAME as string,
                    pass: process.env.EMAIL_PASSWORD as string
                }
            },
            from: 'system@lwaero.net',
            name: 'Lwaero Auth',
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string
        }),
    ],
    database: process.env.NEXT_PUBLIC_DATABASE_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        session: async (session: { jwt: string; id: any; }, user: { jwt: string; id: any; }) => {
            session.jwt = user.jwt
            session.id = user.id
            return session
        },
        //@ts-ignore
        jwt: async (token, user, account) => {
            // don't like when func params is mutate
            const _token = token

            const isSignIn = Boolean(user)
            if (isSignIn) {
                let registerData = null
                let loginData = null

                // use switch to divide behavior. @account param has key "type" always when user exist (in my tests)
                switch (account.type) {
                // our scenario when we used NextAuth email authentication
                case 'email': {
                    // check user in Strapi users
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            identifier: user.email,
                            password: process.env.COMMON_PASSWORD
                        })
                    })
                    loginData = await response.json()

                    // if user isn't exist register then!
                    if (loginData.statusCode == 400) {
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                username: account.providerAccountId,
                                email: account.providerAccountId,
                                password: process.env.COMMON_PASSWORD
                            })
                        })
                        // register data also has strapi jwt
                        registerData = await response.json()
                    }
                    // use token data from register or login data
                    _token.jwt =  registerData ? registerData.jwt : loginData.jwt
                    _token.id =  registerData ? registerData.user.id : loginData.user.id
                    break
                }
                default: {
                    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback`)
                    url.searchParams.set('access_token', account.accessToken)
                    const response = await fetch(url.toString())
                    const data = await response.json()
                    _token.jwt = data.jwt
                    _token.id = data.user.id
                }
                }
            }
            return _token
        },
    },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    // @ts-ignore
    NextAuth(req, res, options)

export default Auth