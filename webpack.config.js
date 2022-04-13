const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    fallback: {
      path: false,
    },
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
