import React from 'react'
import './Count.less'
import { VisibleTodoList } from '@/containers/visible-todo-list'
import { Footer } from '@/components/footer'
import { AddTodo } from '@/containers/add-todo'

export default function Count() {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList lie={123} />
      <Footer></Footer>
    </div>
  )
}
