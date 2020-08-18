// 这个中间件的结构是这样的
export const logger = ({ getState }) => {
  return next => action => {
    console.log('will dispatch', action)
    // 调用 middleware 中下一个 middleware 的 dispatch
    const returnValue = next(action)
    console.log('state after dispatch', getState())
    // 一般会是 action 除非后面的 middleware 修改了它
    return returnValue
  }
}
//# sourceMappingURL=middleware.js.map
