import { Action } from './types/actions'
import { Reducer } from './types/reducers'
import {
  StoreEnhancer,
  Store,
  ExtendState,
  PreloadedState,
} from './types/store'
/**
 * Creates a Redux store that holds the state tree
 *
 * @param reducer A function that returns the next state tree, given
 * the current state tree and the action to handle
 *
 * @param preloadedState The initial state
 *
 * @param enhancer The store enhancer
 *
 * @returns A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes
 */
declare function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  enhancer?: StoreEnhancer<Ext, StateExt>,
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
declare function createStore<S, A extends Action, Ext = {}, StateExt = never>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext, StateExt>,
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
export default createStore
//# sourceMappingURL=createStore.d.ts.map
