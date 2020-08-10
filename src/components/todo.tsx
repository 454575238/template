import React from 'react'

interface ITodoProps {
  onClick(): void
  completed: boolean
  text: string
}

export const Todo = ({ onClick, completed, text }: ITodoProps) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
)
