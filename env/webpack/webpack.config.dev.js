const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const path = require('path')
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
    contentBase: path.resolve(__dirname, '../../dist'),
    historyApiFallback: true,
    inline: true,
    open: true,
    quiet: true
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=busongBabel'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: 'es2015',
                lib: ['es6', 'es7', 'dom']
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      id: 'busongBabel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyPackThreadPool
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${devConf.host}:${devConf.port}`
        ]
      },
      clearConsole: true
    })
  ]
})

module.exports = webpackConfig
