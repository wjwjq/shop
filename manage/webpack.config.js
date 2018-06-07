const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //在每次build之前，清空dist目录及其子目录
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成index.html
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //包大小分析
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin'); //生成external
const tsImportPluginFactory = require('ts-import-plugin'); //antd 按需加载

const isProduction = process.argv.find(item => ~item.indexOf("--mode")).split("=").pop().toLowerCase() === "production";

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, "src");
const APP_FILE = path.resolve(APP_PATH, "index.tsx");
const BUILD_PATH = path.join(__dirname, "dist");
const TEMPLATE_PATH = path.resolve(APP_PATH, "index.html");
// const COMPONENTS_PATH = path.resolve(APP_PATH, "components");
// const VIEWS_PATH = path.resolve(APP_PATH, "views");
// const ROUTER_PATH = path.resolve(APP_PATH, "router");
// const STORE_PATH = path.resolve(APP_PATH, "store");
// const UTILS_PATH = path.resolve(APP_PATH, "lib/utils");
// const API_PATH = path.resolve(APP_PATH, "lib/api");
// const STYLES_PATH = path.resolve(APP_PATH, "assets/styles"); //样式目录
const IMAGES_PATH = path.resolve(APP_PATH, "assets/images"); //图片目录
const FAVICON_PATH = path.resolve(IMAGES_PATH, "favicon.ico"); //favicon目录

const ASSETS_SUB_PATH = "static"; //静态资源目录 image css js fonts etc..

const PUBLIC_PATH = 'test/'; //静态资源引用路径

const PROXY_URI = "http://localhost:3000"; //反向代理地址

//抽离打包的模块 使用CDN加载
const externals = [{
  module: 'react',
  entry: 'https://cdn.bootcss.com/react/16.4.0/umd/react.production.min.js',
  global: 'React'
},
{
  module: 'react-dom',
  entry: 'https://cdn.bootcss.com/react-dom/16.4.0/umd/react-dom.production.min.js',
  global: 'ReactDOM'
},
{
  module: 'react-router-dom',
  entry: 'https://cdn.bootcss.com/react-router-dom/4.3.0-rc.3/react-router-dom.min.js',
  global: 'ReactRouterDOM'
},
{
  module: 'axios',
  entry: 'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
  global: 'axios'
}];

const commonConfig = {
  //页面入口文件配置
  entry: {
    app: [
      APP_FILE
    ]
  },

  //入口文件输出配置
  output: {
    publicPath: isProduction ? PUBLIC_PATH : "/", //编译好的文件，在服务器的路径,这是静态资源引用路径
    path: BUILD_PATH, //发布文件地址
    filename: "[name].[hash].js", //编译后的文件名字
    chunkFilename: "[name].[hash].js"
  },

  devtool: 'source-map',

  resolve: {
    // 配置目录别名
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              getCustomTransformers: () => ({
                before: [ tsImportPluginFactory({
                  libraryDirectory: 'es',
                  libraryName: 'antd',
                  style: 'css'
                })]
              })
            }
          }, 
          "tslint-loader"
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'typings-for-css-modules-loader',
              options: {
                importLoaders: 1,
                modules: true,
                camelCase: true,
                namedExport: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                sourceMap: false
              }
            },
              'postcss-loader']
          })
          : [
            'style-loader',
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                importLoaders: 1,
                modules: true,
                camelCase: true,
                namedExport: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                sourceMap: true
              }
            },
            'postcss-loader'
          ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'typings-for-css-modules-loader',
              options: {
                importLoaders: 1,
                modules: true,
                camelCase: true,
                namedExport: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                sourceMap: false
              }
            },
              'postcss-loader',
              'less-loader']
          })
          : [
            'style-loader',
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                importLoaders: 1,
                modules: true,
                camelCase: true,
                namedExport: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                sourceMap: true
              }
            },
            'postcss-loader',
            'less-loader'
          ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                sourceMap: false
              }
            }, 'postcss-loader']
          })
          : ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: isProduction
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                sourceMap: false
              }
            }, 'postcss-loader', 'less-loader']
          })
          : ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: `${ASSETS_SUB_PATH}/images/[name].[hash:8].[ext]`
          }
        }],
        exclude: /^node_modules$/
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?.*)?$/,
        use: [{
          loader: "file-loader",
          options: {
            limit: 1000000,
            name: `${ASSETS_SUB_PATH}/fonts/[name].[hash:5].[ext]`
          }
        }]
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
        include: [APP_PATH]
      }
    ]
  },

  //插件
  plugins: [
    new webpack.ProvidePlugin({}),
    new CleanWebpackPlugin([BUILD_PATH]),

    new webpack.HashedModuleIdsPlugin(),

    //生成HTML文件
    new HtmlWebpackPlugin({
      title: "app",
      template: TEMPLATE_PATH,
      chunksSortMode: "dependency",
      favicon: FAVICON_PATH,
      inject: true
    }),

    new webpack.LoaderOptionsPlugin({ options: {} })
  ]
}

module.exports = merge(commonConfig, isProduction ? {
  devtool: 'none',

  output: {
    filename: `${ASSETS_SUB_PATH}/js/${commonConfig.output.filename}`,
    chunkFilename: `${ASSETS_SUB_PATH}/js/[name].[hash].js`
  },

  //文件压缩
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "commons"
    },
    runtimeChunk: {
      name: "runtime"
    },
    minimize: true
  },


  externals: externals.reduce((prev, item) => {
    prev[item.module] = item.global;
    return prev;
  }, {}),

  //插件项
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals
    }),

    //CSS文件单独打包
    new ExtractTextPlugin({
      filename: `${ASSETS_SUB_PATH}/css/[name].[hash:5].css`,
      allChunks: true
    }),

    //加载器最小化
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      context: __dirname,
      debug: false
    }),

    //生成文件顶部加入注释
    new webpack.BannerPlugin({
      banner: "This file is created by Stephen Wu, " + new Date(),
      raw: false,
      entryOnly: true
    }),

    // new BundleAnalyzerPlugin()
  ]

} : {
    devtool: "source-map",
    devServer: {
      proxy: {
        "/api": {
          target: PROXY_URI,
          changeOrigin: true
        }
      },
      port: 8000,
      disableHostCheck: true,
      allowedHosts: [],
      compress: true,
      historyApiFallback: true,
      hot: true,
      https: false,
      noInfo: false,
      open: true,
      clientLogLevel: "none",
      watchOptions: {
        poll: true
      }
    },

    //插件项
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  });