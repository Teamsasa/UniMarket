const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // エントリーポイント
  output: {
    path: path.resolve(__dirname, "dist"), // 出力先ディレクトリ
    filename: "bundle.js", // 出力ファイル名
    publicPath: '/', // 公開パスを設定
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/', // 出力ディレクトリ
              publicPath: '/images/', // 公開URL
            },
          },
        ],
      }
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true, // SPAのために必要
  },
  mode: "development",
};
