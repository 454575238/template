import React from 'react'

interface ILinkProps {
  active: boolean
  children: JSX.Element | JSX.Element[] | string
  onClick(): void
}

export const Link = ({ active, children, onClick }: ILinkProps) => {
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
