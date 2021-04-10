const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist"),
  },
  performance: {
    hints: false,
    // maxAssetSize: 500000,
    // maxEntrypointSize: 500000,
    // assetFilter: function (assetFilename) {
    //   return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    // },
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 5,
    },
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DefinePlugin({
      "process.env.HOST": JSON.stringify("http://YOUR_HOST"),
    }),
  ],
};
