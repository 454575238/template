const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const resolve = require('./utils')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/template/',
  },
  optimization: {
    splitChunks: {
      // 打包 node_modules里的代码
      chunks: 'all',
    },
    runtimeChunk: true, // 打包 runtime 代码
  },
  module: {
    rules: [
      {
        test: /\.(less|css)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(),
  ],
})

module.exports = webpackConfig
