import React from 'react'
import { VisibleTodoList } from '@/containers/visible-todo-list'
import { Footer } from '@/components/footer'
import { AddTodo } from '@/containers/add-todo'

export default function Count(): JSX.Element {
  return (
    <>
      <AddTodo />
      <VisibleTodoList lie={123} />
      <Footer></Footer>
    </>
  )
}
