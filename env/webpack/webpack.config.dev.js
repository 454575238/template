const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const resolve = require('./utils')
const HappyPack = require('happypack')
const os = require('os')
const happyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
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
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=busongBabel'
          }
        ]
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `你好这里是你的程序地址 : http://${devConf.host}:${devConf.port}`
        ]
      },
      clearConsole: true
    }),
    new HappyPack({
      id: 'busongBabel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyPackThreadPool
    })
  ]
})

module.exports = webpackConfig
