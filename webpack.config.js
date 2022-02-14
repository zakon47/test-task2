const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

//================= get MODE
let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}
const isDev = mode === "development";
//================= get MODE [end]

//устанавливаем плагины
const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[name].[contenthash].css",
    ignoreOrder: false,
  }),
  new HtmlWebpackPlugin({
    template: "public/index.html",
  }),
];
if (isDev) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  target: isDev ? "web" : "browserslist",
  devtool: isDev ? "source-map" : false,
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true, //очищать dist перед сборкой
    // https://github.com/GoogleChromeLabs/worker-plugin/issues/20
    globalObject: "(typeof self!='undefined'?self:global)",
    assetModuleFilename: "assets/[hash][ext][query]", // одно из нововведений webpack 5, Все ассеты будут складываться в dist/assets
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(woff2|eot|ttf|svg|jpe?g|png)$/i,
        type: "asset", //определяем автоматом
        // type: "asset/resource",     //если нужно перенести в отдельные файлы
        // type: "asset/inline",    //если нужно встроить в JS через base64
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          isDev
            ? require.resolve("style-loader") //внутри файла или вне через MiniCssExtractPlugin
            : {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: "" },
              },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
              modules: {
                localIdentName: "[path]__[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader", //webpack5 или
            // loader: "babel-loader",    //по старинке
            // options: {
            //   presets: [
            //     "@babel/preset-env",
            //     ["@babel/preset-react", {runtime: "automatic"}],
            //     "@babel/preset-typescript",
            //   ],
            //   plugins: isDev ? ["react-refresh/babel"] : []
            // }
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: process.env.BACKEND_SERVER || "/test47",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    ],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins,
};
