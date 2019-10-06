const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const resolve = require('./utils')
const HappyPack = require('happypack')
const os = require('os')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const happyPackThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
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
  externals: {
    react: 'React',
    'react-router': 'react-router',
    'react-router-dom': 'react-router-dom',
    lodash: 'lodash',
  },
  resolve: {
    extensions: ['.js', '.tsx', 'ts'],
    alias: {
      '@': resolve('src'),
      pages: resolve('src/pages'),
      router: resolve('src/router'),
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
            loader: 'happypack/loader?id=busongBabel',
          },
        ],
      },
      {
        test: /\.(less|css)?$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
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
    }),
    new webpack.DllReferencePlugin({
      manifest: require('./dll/react.dll.manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        VUEP_BASE_URL: JSON.stringify('http://localhost:9000'),
        NODE_ENV: process.env.NODE_ENV,
      },
    }),
    new WebpackBuildNotifierPlugin({
      title: '编译完成',
      suppressSuccess: true,
    }),
    new HappyPack({
      id: 'busongBabel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyPackThreadPool,
    }),
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
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
