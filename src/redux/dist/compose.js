function compose(...funcs) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  // 将函数数组从右到左执行一次， 并且将执行的结果作为下一个函数的参数
  // 将执行科里化的参数传递到最先执行的函数
  return funcs.reduce((result, curr) => (...arg) => result(curr(...arg)))
}
export default compose
//# sourceMappingURL=compose.js.map
