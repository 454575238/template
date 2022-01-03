import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import { InternalNamePath, NamePath, Store, StoreValue } from '../interface'
import { get, set } from './common'

/**
 * Convert name to internal supported format.
 * This function should keep since we still thinking if need support like `a.b.c` format.
 * 'a' => ['a']
 * 123 => [123]
 * ['a', 123] => ['a', 123]
 */
export function getNamePath(path: NamePath | null): InternalNamePath {
  if (!path) return []
  if (isArray(path)) {
    return path
  } else {
    return [path]
  }
}

export function getValue(store: Store, namePath: InternalNamePath) {
  return get(store, namePath)
}

export function setValue(
  store: Store,
  namePath: InternalNamePath,
  value: StoreValue,
  removeIfUndefined = false,
): Store {
  const newStore = set(store, namePath, value, removeIfUndefined)
  return newStore
}

/**
 * 作用其实是merge 两个对象 ({ a: 1, b: { c:2 } }, { a: 4, b: { d:5 } }) => { a: 4, b: { c: 2, d: 5 } },
 */
function internalSetValues<
  T extends Record<any, any>,
  U extends Record<any, any>,
>(store: T, values: U): CombineObjects<T, U> {
  const cloneStore = (
    isArray(store) ? [...store] : { ...store }
  ) as CombineObjects<T, U>

  if (!values) return cloneStore

  Object.keys(values).forEach(key => {
    const storeVal = cloneStore[key]
    const value = values[key]

    const recursive = isObject(storeVal) && isObject(value)

    cloneStore[key as keyof T & U] = recursive
      ? internalSetValues(storeVal, values)
      : value
  })

  return cloneStore
}
// 自己申明了该方法 才能根据不同的合并对象达到正确的推导
type CombineObjects<T, U> = {
  [K in keyof (U & T)]: (U & T)[K] extends never
    ? K extends keyof U
      ? U[K]
      : never
    : K extends keyof U
    ? K extends keyof T
      ? T[K] & U[K] extends object
        ? CombineObjects<T[K], U[K]>
        : T[K]
      : U[K]
    : (U & T)[K]
}

export function setValues<T>(store: T, ...restValues: T[]): T {
  return restValues.reduce(
    // 为什么最后还是选择 as T 了呢? 因为懒得兼容它的所有方法了需要改的太多
    (current: T, newStore: T): T => internalSetValues(current, newStore) as T,
    store,
  )
}
