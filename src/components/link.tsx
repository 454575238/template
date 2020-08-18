import React, { FC } from 'react'

interface ILinkProps {
  active: boolean
  children: JSX.Element | JSX.Element[] | string
  onClick(): void
}

export const Link: FC<ILinkProps> = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}
