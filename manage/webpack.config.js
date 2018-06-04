const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //在每次build之前，清空dist目录及其子目录
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成index.html
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //包大小分析

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
const IMAGES_PATH = path.resolve(APP_PATH, "assets/images"); //图片目录
// const STYLES_PATH = path.resolve(APP_PATH, "assets/styles"); //样式目录
const FAVICON_PATH = path.resolve(IMAGES_PATH, "favicon.ico"); //favicon目录

const ASSETS_SUB_PATH = "static";

const PROXY_URI = "http://localhost:3000"; //反向代理地址

const commonConfig = {
  //页面入口文件配置
  entry: {
    commons: [
      "react",
      "react-dom"
    ],
    app: [
      APP_FILE
    ]
  },

  //入口文件输出配置
  output: {
    publicPath: "/", //编译好的文件，在服务器的路径,这是静态资源引用路径
    path: BUILD_PATH, //发布文件地址
    filename: "[name].[hash].js", //编译后的文件名字
    chunkFilename: "[name].[hash].js"
  },

  devtool: 'source-map',

  resolve: {
    // 配置目录别名
    alias: {},
    // 引用js、vue、less、css文件可以省略后缀名
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["awesome-typescript-loader", "tslint-loader"]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: `${ASSETS_SUB_PATH}/images/[hash:8].[name].[ext]`
          }
        }],
        exclude: /^node_modules$/
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 100000,
            name: `${ASSETS_SUB_PATH}/fonts/[name].[ext]`
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

  externals: {

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
  // devtool: 'source-map',
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

  //插件项
  plugins: [
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
      banner: "This file is created by StephenWu, " + new Date(),
      raw: false,
      entryOnly: true
    })

    // new BundleAnalyzerPlugin()
  ]

} : {
    devtool: "inline-source-map",
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
      stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        modules: false
      },
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