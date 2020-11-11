import compose from './compose'
function applyMiddleware(...middlewares) {
  return createStore => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.',
      )
    }
    // 巧妙的将 store 切出 getState 和 dispatch
    // 这步操作很迷 其实要拿 state 只需要 getState 方法, 为啥需要dispatch
    const middlewareAPI = {
      getState: store.getState,
      // 这里的 dispatch 很迷
      // 1、 和 dispatch: dispatch 有啥区别
      // 2、 dispatch 是上面那个抛错的 dispatch 但是实际跑的时候却不是
      dispatch: (action, ...args) => dispatch(action, ...args),
    }
    // 这步实际是将所有的 middleware 科里化 middlewareAPI
    // middleware1 = (store) => {...} 这里的 store 就表示 middlewareAPI
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // const middlewareCurryStore =  middleware(middlewareAPI)
    // compose: (dispatch) => middlewareCurryStore1(middlewareCurryStore2(dispatch)) 将 dispatch 科里化
    // 赋值操作是说将 compose 出来的函数来对现有的 dispatch 进行增强
    // 所以在 next => {...} 里去调用 dispatch 就会递归栈溢出， 所以这个 dispatch 暴露出来是干嘛的 ？
    // 这里补充一点 在执行 middlewareAPI.dispatch() 时 会在当前作用域找最新的dispatch 也就是下面这个，也就解决了上面1、2、两个问题
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}
export default applyMiddleware
//# sourceMappingURL=applyMiddleware.js.map
