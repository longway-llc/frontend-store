import React, {Props} from 'react'
import {signIn} from 'next-auth/client'


const ButtonSignInGoogle = (props:any) => {
    const handleClick = async () => {
        await signIn(props.provider.id)
    }
    return (
        <>
            <div id="googleBtn" className="customGPlusSignIn" {...props} onClick={handleClick}>
                <div className="wrapper">
                    <span className="icon"/>
                    <span className="buttonText">Login with Google</span>
                </div>
            </div>
            <style jsx>{`
  #googleBtn {
      cursor: pointer;
      padding: 5px 0;
      display: flex;
      justify-content: flex-start;
      padding-left: 20%;
      align-items: center;
      background: white;
      color: #444;
      width: 100%;
      border-radius: 8px;
      border: thin solid #888;
      white-space: nowrap;
    }
    #customBtn:hover {
      cursor: pointer;
    }
    span.label {
      font-family: serif;
      font-weight: normal;
    }
    span.icon {
      background: url('/logo/g-logo.png') transparent  50% no-repeat;
      background-size: cover;
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 38px;
    }
    span.buttonText {
      display: inline-block;
      vertical-align: middle;
      margin-left: 20%;
      font-size: 14px;
      font-weight: bold;
      /* Use the Roboto font that is loaded in the <head> */
      font-family: 'Roboto', sans-serif;
    }
`}</style>
        </>
    )
}

export default ButtonSignInGoogle