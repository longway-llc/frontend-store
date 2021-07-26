import React from 'react'
import { signIn } from 'next-auth/client'

const ButtonSignInGoogle = (props:any) => {
  const handleClick = async () => {
    await signIn(props.provider.id)
  }
  return (
    <>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div id="googleBtn" className="customGPlusSignIn" {...props} onClick={handleClick}>
        <div className="wrapper">
          <span className="icon" />
          <span className="buttonText">Login with Google</span>
        </div>
      </div>
      <style jsx>
        {`
  #googleBtn {
      cursor: pointer;
      display: flex;
      justify-content: flex-start;
      padding: 5px 0 5px 20%;
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
`}
      </style>
    </>
  )
}

export default ButtonSignInGoogle
