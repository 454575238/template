import React, { FC } from 'react'

interface ITodoProps {
  onClick(): void
  completed: boolean
  text: string
}

export const Todo: FC<ITodoProps> = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
)
