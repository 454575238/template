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
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 0,
                  }),
                  // require('postcss-pxtorem')({
                  //   rootValue: 75, //换算基数，
                  //   unitPrecision: 5, //允许REM单位增长到的十进制数字,小数点后保留的位数。
                  //   mediaQuery: true, //（布尔值）允许在媒体查询中转换px。
                  //   propList: ['*'],
                  //   minPixelValue: 1, //设置要替换的最小像素值
                  //   // exclude: /node_modules/i,
                  // }),
                  require('postcss-px-to-viewport')({
                    unitToConvert: 'px',
                    viewportWidth: 750,
                    unitPrecision: 5,
                    mediaQuery: false,
                    propList: ['*'],
                    minPixelValue: 0.5,
                  }),
                ],
              },
            },
          },
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
    //  createHappyPlugin('happy-css', [
    //   'style-loader',
    //   'css-loader',

    //   {
    //     loader: 'postcss-loader',
    //     options: {
    //       ident: 'postcss',
    //       plugins: () => [
    //         require('postcss-flexbugs-fixes'),
    //         require('postcss-preset-env')({
    //           autoprefixer: {
    //             flexbox: 'no-2009',
    //           },
    //           stage: 3,
    //         }),
    //         // require('postcss-pxtorem')({
    //         //   rootValue: 37.5, //换算基数，
    //         //   unitPrecision: 3, //允许REM单位增长到的十进制数字,小数点后保留的位数。
    //         //   propList: ['*'],
    //         //   selectorBlackList: ['.van'], //要忽略并保留为px的选择器，本项目我是用的vant ui框架，所以忽略他
    //         //   mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
    //         //   minPixelValue: 1, //设置要替换的最小像素值
    //         // }),
    //       ],
    //     },
    //   },
    //   'less-loader',
    // ]),
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
