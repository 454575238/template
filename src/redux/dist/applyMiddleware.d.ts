import { StoreEnhancer } from './types/store'
import { Middleware } from './types/middleware'
/**
 *  Creates a store enhancer that applies middleware to the dispatch method
 *  of the Redux store. This is handy for a variety of tasks, such as expressing
 *  asynchronous actions in a concise manner, or logging every action payload.
 *
 * @param middlewares The middleware chain to be applied
 * @returns A store enhancer applying the middleware
 *
 * @template Ext Dispatch signature added by a middleware
 * @template S The type of the state  supported by a middleware
 */
declare function applyMiddleware(): StoreEnhancer
declare function applyMiddleware<Ext1, S>(
  middleware1: Middleware<Ext1, S, any>,
): StoreEnhancer<{
  dispatch: Ext1
}>
declare function applyMiddleware<Ext1, Ext2, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
): StoreEnhancer<{
  dispatch: Ext1 & Ext2
}>
declare function applyMiddleware<Ext1, Ext2, Ext3, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
): StoreEnhancer<{
  dispatch: Ext1 & Ext2 & Ext3
}>
declare function applyMiddleware<Ext1, Ext2, Ext3, Ext4, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>,
): StoreEnhancer<{
  dispatch: Ext1 & Ext2 & Ext3 & Ext4
}>
declare function applyMiddleware<Ext1, Ext2, Ext3, Ext4, Ext5, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>,
  middleware5: Middleware<Ext5, S, any>,
): StoreEnhancer<{
  dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5
}>
declare function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer<{
  dispatch: Ext
}>
export default applyMiddleware
//# sourceMappingURL=applyMiddleware.d.ts.map
