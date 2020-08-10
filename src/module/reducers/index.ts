import { combineReducers } from '@/redux/dist'
import { todos } from './todos'
import { visibilityFilter } from './visibilityFilter'

export const todoApp = combineReducers({ todos, visibilityFilter })
