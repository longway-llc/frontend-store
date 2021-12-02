import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import * as nodemailer from 'nodemailer'

import { html, text } from '../../../utils/Auth/nextAuthHelpers'

declare module 'next-auth' {
  interface User {
    id: string // Or string
    jwt: string
  }

  interface Session {
    expires: string
    id: string
    jwt: string
  }
}
const useSecureCookies = process.env.NEXTAUTH_URL && process.env.NEXTAUTH_URL.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = new URL(process.env.NEXTAUTH_URL ?? '').hostname

const options: NextAuthOptions = {
  theme: 'light',
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST ?? 'smtp-relay.gmail.com',
        port: parseInt(process.env.EMAIL_SERVER_PORT ?? '465', 10),
        auth: {
          user: process.env.EMAIL_USERNAME as string,
          pass: process.env.EMAIL_PASSWORD as string,
        },
      },
      from: 'LWaero Auth <system@lwaero.net>',
      name: 'LWaero Auth',
      sendVerificationRequest: ({
        identifier: email,
        provider,
        url,
        baseUrl,
      }) => new Promise((resolve, reject) => {
        const {
          server,
          from,
        } = provider
        // Strip protocol from URL and use domain as site name
        const site = baseUrl.replace(/^https?:\/\//, '')

        nodemailer.createTransport(server)
          .sendMail(
            {
              to: email,
              from,
              subject: `Sign in to ${site}`,
              text: text({
                url,
                site,
              }),
              html: html({
                url,
                site,
                email,
              }),
              attachments: [
                {
                  cid: 'logo',
                  path: 'https://lwaero.net/logo/LWAERO_general_logo_black.png',
                },
              ],
            },
            (error) => {
              if (error) {
                // eslint-disable-next-line no-console
                console.error('SEND_VERIFICATION_EMAIL_ERROR', email, error)
                // @ts-ignore
                return reject(new Error('SEND_VERIFICATION_EMAIL_ERROR', error))
              }
              return resolve()
            },
          )
      }),
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,

  session: {
    jwt: true,
  },
  pages: {
    signIn: '/login',
  },
  cookies: {
    sessionToken:
            {
              name: `${cookiePrefix}next-auth.session-token`,
              options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: Boolean(useSecureCookies),
                domain: hostName === 'localhost' ? hostName : `.${hostName}`, // add a . in front so that subdomains are included
              },
            },
  },
  callbacks: {
    session: async (session, user) => {
      const extendSession = { ...session }
      extendSession.jwt = user.jwt as string
      extendSession.id = user.id as string
      return extendSession
    },
    jwt: async (token, user, account) => {
      // don't like when func params is mutate
      const tToken = token

      const isSignIn = Boolean(user)
      if (isSignIn) {
        let registerData = null
        let loginData = null

        // use switch to divide behavior. @account param has key "type"
        // always when user exist (in my tests)
        switch (account!.type) {
          // our scenario when we used NextAuth email authentication
          case 'email': {
            // check user in Strapi users
            const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                identifier: user?.email,
                password: process.env.COMMON_PASSWORD,
              }),
            })
            loginData = await authResponse.json()

            // if user isn't exist register then!
            if (loginData.statusCode === 400) {
              const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  username: account?.providerAccountId,
                  email: account?.providerAccountId,
                  password: process.env.COMMON_PASSWORD,
                }),
              })
              // register data also has strapi jwt
              registerData = await registerResponse.json()
            }
            // use token data from register or login data
            tToken.jwt = registerData ? registerData.jwt : loginData.jwt
            tToken.id = registerData ? registerData.user.id : loginData.user.id
            break
          }
          default: {
            const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/auth/${account?.provider}/callback`)
            url.searchParams.set('access_token', account?.accessToken as string)
            const response = await fetch(url.toString())
            const data = await response.json()
            tToken.jwt = data.jwt
            tToken.id = data.user.id
          }
        }
      }
      return tToken
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)

export default Auth
