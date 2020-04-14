const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//웹팩 파일 크기 확인
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const port = process.env.PORT || 3000;

module.exports = {
  //웹팩의 빌드 대상 파일
  entry: "./src/index.tsx", 

  //웹팩의 빌드 결과 파일 속성
  output: { 
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: '/'
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
        use: 'ts-loader',
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
        use: [
          "style-loader",
          "css-loader"
        ]
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

  //웹팩 빌드 결과물에 추가 기능 부여
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',                // 생성한 템플릿 파일
      filename: './index.html'
    }),

    new BundleAnalyzerPlugin()
  ],

  //웹팩 빌드 시 파일을 어떻게 해석하는지 정의하는 속성
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
    index: "index.html",
    port: port,
    open: true,

    proxy: {
      '/api/':  {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },

    historyApiFallback: true,
  }
}