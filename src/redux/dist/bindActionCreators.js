// 接收一个 actionCreator 和 dispatch
// 返回 一个返回值为 dispatch 执行结果的函数 你可以理解成 actionCreator
// 所以就是 dispatch 一个 actionCreator 生成的 action, 将 dispatch 返回的 action 作为 actionCreator
function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    return dispatch(actionCreator.apply(this, args))
  }
}
// 重载：actionCreators 可以为 actionCreator 的 map 对象和单纯的 actionCreator
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`,
    )
  }
  // 创建一个对象来绑定所有的actionCreator
  const boundActionCreators = {}
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      // 将 actionCreator 绑定 bindActionCreator 也就是 绑定 dispatch
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  // 返回绑定好的 map object
  return boundActionCreators
}
export default bindActionCreators
//# sourceMappingURL=bindActionCreators.js.map
