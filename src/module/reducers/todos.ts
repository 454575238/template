import { Action } from '@/redux/dist'

export const todos = (
  state: { id: number; text: string; completed: boolean }[] = [],
  action: Action<string> & { id: number; text: string },
) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    default:
      return state
  }
}
