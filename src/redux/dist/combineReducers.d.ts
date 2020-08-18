import { Action, AnyAction } from './types/actions'
import {
  ReducersMapObject,
  Reducer,
  StateFromReducersMapObject,
  ActionFromReducersMapObject,
} from './types/reducers'
import { CombinedState } from './types/store'
/**
 * @template S Combined state object type
 *
 * @param reducers An object whose values correspond to different reducer
 *   functions that need to be combined into one. One handy way to obtain it
 *   is to use ES6 `import * as reducers` syntax. The reducers may never
 *   return undefined for any action. Instead, they should return their
 *   initial state if the state passed to them was undefined, and the current
 *   state for any unrecognized action.
 *
 * @returns A reducer function that invokes every reducer inside the passed object,
 *   and builds a state object with the same shape
 */
declare function combineReducers<S>(
  reducers: ReducersMapObject<S, any>,
): Reducer<CombinedState<S>>
declare function combineReducers<S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>,
): Reducer<CombinedState<S>, A>
declare function combineReducers<M extends ReducersMapObject>(
  reducers: M,
): Reducer<
  CombinedState<StateFromReducersMapObject<M>>,
  ActionFromReducersMapObject<M>
>
export default combineReducers
//# sourceMappingURL=combineReducers.d.ts.map
