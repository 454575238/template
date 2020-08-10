import React from 'react'
import { Todo } from './todo'

interface ITodoList {
  todos: { id: number; text: string; completed: boolean }[]
  onTodoClick(id: number): void
  lie: number
}

export const TodoList = ({ todos, onTodoClick }: ITodoList) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
)
