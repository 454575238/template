import { Action } from '@/redux/dist'

export const visibilityFilter = (
  state = 'SHOW_ALL',
  action: Action<string> & { filter: string },
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
