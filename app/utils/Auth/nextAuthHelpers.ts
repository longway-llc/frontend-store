type HTMLParams = {
  url: string,
  site: string,
  email: string
}

type TextParams = {
  url: string,
  site: string,
}

// Email HTML body
export const html = ({
  url,
  site,
  email,
}: HTMLParams) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
  const escapedSite = `${site.replace(/\./g, '&#8203;.')}`

  // Uses tables for layout and inline CSS due to email client limitations
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>LWAero authenticate on site</title>
    <style>
      .message-body {
        font-family: 'Arial', sans-serif;
        background-color: #eeeeee;
        height: 400px;
        display: flex;
        padding: 40px;
      }
      .container {
        margin: 0 auto;
        width: 320px;
        border-radius: 8px;
        background-color: #ffffff;
        display: grid;
        justify-content: center;
        row-gap: 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        padding: 24px 16px;
      }
      .header,
      .main,
      .footer {
        width: 100%;
        text-align: center;
      }
      .text-center {
        text-align: center;
      }
      .header {
        text-align: center;
      }
      .footer {
        font-style: italic;
        opacity: 0.4;
      }
      .logo {
        width: 220px;
      }
      .signin {
        width: 80%;
        color: #ffffff;
        border: none;
        font-size: 24px;
        padding: 16px 24px;
        background-color: #c51d34;
        border-radius: 8px;
        cursor: pointer;
      }
      .signin:hover {
        background-color: #b61a2e;
      }
      .button-wrapper {
        text-align: center;
        text-decoration: none;
      }
      .link {
        text-decoration: none;
        color: #303030 !important;
        font-weight: bold;
      }
      @media screen and (min-width: 720px) {
        .container {
          width: 540px;
        }
        .logo {
          width: 180px;
        }
      }
    </style>
  </head>
  <body class="message-body">
    <div class="container">
      <header class="header">
        <img class="logo" src="cid:logo" alt="${escapedSite}" />
      </header>
      <main class="main">
        <p class="text-center">
          You are trying to log in to <a class="link" href="https://lwaero.net">lwaero.net</a>!
        </p>
        <a href="${url}" target="_blank" class="button-wrapper">
          <button class="signin" type="button">Sign in as <strong>${escapedEmail}</strong></button>
        </a>
        <p class="text-center">
          If you have any problems, please contact
          <a class="link" href="mailto:admin@lwaero.net">admin@lwaero.net</a> for support
        </p>
      </main>
      <footer class="footer">
        If you receive this email by mistake, just do not respond to it. <br />
        Please do not response on this message.
      </footer>
    </div>
  </body>
</html>
`
}

// Email text body – fallback for email clients that don't render HTML
export const text = ({
  url,
  site,
}: TextParams) => `Sign in to ${site}\n${url}\n\n`
