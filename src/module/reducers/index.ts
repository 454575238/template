import { combineReducers } from '@/redux/dist'
import { todos } from './todos'
import { visibilityFilter } from './visibility-filter'

export const todoApp = combineReducers({ todos, visibilityFilter })
