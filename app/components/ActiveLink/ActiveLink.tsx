import React, { Children, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ActiveLink: FC<any> = ({
  children,
  activeClassName,
  ...props
}) => {
  const asPath = useRouter()?.asPath
  const child = Children.only(children)

  const childClassName: string = child?.props.className || ''

  // page/index.js will be matched via props.href
  // page/about.js will be matched via props.href
  // page/[slug].js will be matched via props.as
  const className = asPath === props.href || asPath === props.as
    ? `${childClassName} ${activeClassName}`.trim()
    : childClassName

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...props}>
      {
          React.cloneElement(child, {
            className: className || null,
          })
      }
    </Link>
  )
}

export default ActiveLink
