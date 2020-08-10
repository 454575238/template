const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { resolve, createHappyPlugin } = require('./utils')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

module.exports = {
  entry: {
    app: resolve('src/main.tsx'),
  },
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': resolve('src'),
      pages: resolve('src/pages'),
      components: resolve('src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader?id=happy-babel',
          },
        ],
      },
      {
        test: /\.(less|css)?$/,
        use: {
          loader: 'happypack/loader?id=happy-css',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)?$/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024,
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 1000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, //压缩 去掉引号
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
      },
    }),
    new WebpackBuildNotifierPlugin({
      title: '编译完成',
      suppressSuccess: true,
    }),
    createHappyPlugin('happy-babel', [
      {
        loader: 'babel-loader',
        options: {
          babelrc: true,
          cacheDirectory: true, // 启用缓存
        },
      },
    ]),
    createHappyPlugin('happy-css', [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader',
    ]),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(
        ':percent',
      )}  (:elapsed seconds)`,
      clear: false,
      width: '60',
    }),
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
}
