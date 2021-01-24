// @ts-check

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: resolve(__dirname, "src"),
    historyApiFallback: true,
  },

  entry: {
    background: resolve(__dirname, "src/background.ts"),
    foreground: resolve(__dirname, "src/foreground.ts"),
    popup: resolve(__dirname, "src/popup/index.tsx"),
  },

  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/popup/index.html",
      chunks: ["popup"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "[name].[ext]" },
        { from: "src/assets/**/*.png", to: "[name].[ext]" },
      ],
    }),
  ],

  watchOptions: {
    ignored: /node_modules/,
  },
};
