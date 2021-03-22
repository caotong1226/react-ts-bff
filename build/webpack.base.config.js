const path = require("path");
module.exports = {
  entry: {
    index: path.join(__dirname, "../src/client/index.tsx"),
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        use: "url-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts"],
  },
};
