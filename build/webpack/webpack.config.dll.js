const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('./utils')
const dllPath = resolve('build/webpack/dll')

module.exports = {
  entry: {
    // 把 vue 相关模块的放到一个单独的动态链接库
    vendor: ['lodash', 'react', 'react-router', 'react-router-dom', 'antd'],
  },
  output: {
    filename: '[name].dll.js', // dll.js
    path: dllPath,
    library: '_dll_[name]',
  },
  plugins: [
    new CleanWebpackPlugin({
      // 清除之前的dll文件
      root: dllPath,
    }),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      // manifest.json 描述动态链接库包含了哪些内容
      path: resolve('build/webpack/dll/[name].dll.manifest.json'),
      context: resolve('/'),
    }),
  ],
}
