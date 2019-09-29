const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].[contenthash:8].js',
    publicPath: './'
  },
  optimization: {
    splitChunks: {
      // 打包 node_modules里的代码
      chunks: 'all'
    },
    runtimeChunk: true, // 打包 runtime 代码
    minimizer: [new OptimizeCssAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css'
    }),
    new CleanWebpackPlugin()
  ]
})

module.exports = webpackConfig
