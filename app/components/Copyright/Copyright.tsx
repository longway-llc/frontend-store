import React, { FC } from 'react'
import { Typography } from '@material-ui/core'
import Link from 'next/link'

const Copyright:FC = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link href={process.env.NEXTAUTH_URL as string}>
      lwaero
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
)

export default Copyright
