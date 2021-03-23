import {useEffect, useState} from 'react'
import AppLayout from '../layouts/AppLayout'
import {getCsrfToken, signIn, signOut, useSession} from 'next-auth/client'

const Login = () => {
    const [session, loading] = useSession()

    async function a() {
        const csrfToken = await getCsrfToken()
        return csrfToken
    }

    useEffect(() => {
        a().then(token => console.log(token))
    })
    console.log(session)
    const [errorMsg, setErrorMsg] = useState('')

    return (
        <AppLayout>
            <div className="login">
                {!session && <>
                    Not signed in <br/>
                    <button onClick={() => signIn()}>Sign in</button>
                </>}
                {session && <>
                    Signed in as {session.user.email} <br/>
                    <button onClick={() => signOut()}>Sign out</button>
                </>}
            </div>
            <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
        </AppLayout>
    )
}

export default Login