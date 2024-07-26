"use client"

import Link from "next/link"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Button = ({ children, ...props }: Props) => {
  if (props.href) {
    return (
      <Link href={props.href} className="btn" {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className="btn" {...props}>
      {children}
    </button>
  )
}
