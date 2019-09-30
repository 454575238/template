const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const resolve = require('./utils')

module.exports = {
  entry: {
    app: resolve('src/main.tsx')
  },
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.tsx', 'ts'],
    alias: {
      '@': resolve('src'),
      pages: resolve('src/pages'),
      router: resolve('src/router')
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(less|css)?$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
      filename: 'index.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        VUEP_BASE_URL: JSON.stringify('http://localhost:9000'),
        NODE_ENV: process.env.NODE_ENV
      }
    })
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all' // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    }
  }
}
