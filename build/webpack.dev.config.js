const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.config");

const devConfig = {
  mode: "development",
  output: {
    path: path.resolve("./dist/client"),
    filename: "[name].js",
  },
  devServer: {
    hot: true,
    quiet: true,
    historyApiFallback: true,
    proxy: {
      "/": "http://localhost:8082",
    },
  },
  // modules: {
  //   rules:[
  //     {
  //       //cssNext
  //     }
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./build/template/index.html",
      env: process.env.NODE_ENV,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:8080"],
        notes: [
          "Some additionnal notes to be displayed unpon successful compilation",
        ],
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      clearConsole: true,
    }),
    new WebpackBuildNotifierPlugin({
      title: "BFF React Build", 
      suppressSuccess: true, 
    }),
  ],
};
module.exports = merge(devConfig, baseConfig);
