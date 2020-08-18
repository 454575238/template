/**
 * @template T the type of the action's `type` tag
 */
export interface Action<T = any> {
  type: T
}
export interface AnyAction extends Action {
  [extraProps: string]: any
}
/**
 * action creator
 *
 * @template A Returned action type
 */
export interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A
}
/**
 * @description: Object whose values are action creator functions.
 */
export interface ActionCreatorsMapObject<A = any, P extends any[] = any[]> {
  [key: string]: ActionCreator<A, P>
}
//# sourceMappingURL=actions.d.ts.map
