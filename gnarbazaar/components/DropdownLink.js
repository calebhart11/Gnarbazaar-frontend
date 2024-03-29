import React from 'react'
import Link from 'next/link'
export default function DropdownLink(props) {
    let {href, children, ...rest} = props
  return (
    <Link legacyBehavior href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}
