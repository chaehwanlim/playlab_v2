const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//웹팩 파일 크기 확인
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const port = process.env.PORT || 3000;

module.exports = {
  entry: "./src/index.tsx", //웹팩이 빌드할 루트 파일
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        exclude: "/node_modules/",
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: "style-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/
      }, 
      {
        test: /\.(png|jpg|otf)$/,
        use: [
          "file-loader"
        ],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',                // 생성한 템플릿 파일
      filename: './index.html'
    }),

    new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
    index: "index.html",
    port: port,
    open: true,
  }
}