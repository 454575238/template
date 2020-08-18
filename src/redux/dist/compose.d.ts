declare type Func<T extends any[], R> = (...a: T) => R
/**
 * Composes 从右到左组成单参数函数。最右边
 * 函数可以采用多个参数，来为它
 * 合成函数
 *
 * @param funcs The functions to compose
 * @returns A function obtained by composing the argument function from right
 * to left. For example `compose(f, g, h)` is identical to doing
 * `(...args) => f(g(h(...args)))`
 *
 * note: 这里的一系列重载没看懂 可能后续支持文档没补充的功能
 */
declare function compose(): <R>(a: R) => R
declare function compose<F extends Function>(f: F): F
declare function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, R>,
): Func<T, R>
declare function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>,
): Func<T, R>
declare function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>,
): Func<T, R>
declare function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R
declare function compose<R>(...funcs: Function[]): (...args: any[]) => R
export default compose
//# sourceMappingURL=compose.d.ts.map
