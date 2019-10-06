const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const resolve = require('./utils')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const devConf = {
  host: '0.0.0.0',
  port: 3012
}
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  //environment specific config goes here
  devServer: {
    ...devConf,
    hot: true,
    contentBase: resolve('dist'),
    historyApiFallback: true,
    inline: true,
    quiet: true,
    overlay: true
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        // 多进程压缩
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            warnings: false,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `你好这里是你的程序地址 : http://${devConf.host}:${devConf.port}`
        ]
      },
      clearConsole: true
    })
  ]
})

module.exports = webpackConfig
