const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const { resolve } = require('./utils')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { devConf } = require('./config')

const { host, port } = devConf

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  //environment specific config goes here
  devServer: {
    host,
    port,
    hot: true,
    contentBase: resolve('dist'),
    historyApiFallback: true,
    inline: true,
    quiet: true,
    overlay: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dll/vendor.dll.manifest.json'),
    }),
    new AddAssetHtmlPlugin([
      {
        // 往html中注入dll js
        publicPath: '/dll', // 注入到html中的路径
        outputPath: 'dll', // 最终输出的目录
        filepath: resolve('build/webpack/dll/*.js'),
        includeSourcemap: false,
        typeOfAsset: 'js', // options js、css; default js
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`你好这里是你的程序地址 : http://${host}:${port}`],
      },
      clearConsole: true,
    }),
  ],
})

module.exports = webpackConfig
