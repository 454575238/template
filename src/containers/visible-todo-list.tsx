import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux'

import { TodoList } from '../components/todo-list'
import { toggleTodo } from '@/module/actions'

const getVisibleTodos = (todos: { completed: boolean }[], filter: string) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps: MapStateToProps<
  { todos: { completed: boolean }[] }, // 映射到 TodoList 中的 props
  {}, // 为 TodoList 增强新 props
  { todos: []; visibilityFilter: string } //映射到 state 的 state
> = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  }
}

const mapDispatchToProps: MapDispatchToProps<
  { onTodoClick(id: number): void },
  {}
> = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    },
  }
}

export const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList)
