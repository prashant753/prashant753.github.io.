const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const { __APP_PUBLIC_PATH__ } = process.env;
module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.tsx',
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: __APP_PUBLIC_PATH__,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [{ loader: 'file-loader', options: { name: 'images/[name].[ext]' } }]
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/,
        use: [{ loader: 'url-loader', options: { limit: 1000, name: 'fonts/[name].[ext]' } }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      modules: path.resolve(__dirname, 'src/modules/')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['./build']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      APP_ENV: JSON.stringify('dev'),
      LOCAL: true,
      WEBPACK: true
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin()
  ],
  devServer: {
    open: true,
    contentBase: path.resolve('./build'),
    overlay: true,
    quiet: true
  },
  optimization: {
    noEmitOnErrors: true,
    minimize: true
  }
};
