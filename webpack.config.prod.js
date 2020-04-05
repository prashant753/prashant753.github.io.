const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const __APP_PUBLIC_PATH__ = process.env.APP_PUBLIC_PATH;
module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.tsx',
    },

    output: {
        path: path.resolve('./build-prod'),
        publicPath: __APP_PUBLIC_PATH__,
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js'
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },  
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader' }]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
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
                use: [{ loader: 'file-loader', options: { name: 'images/[name].[hash:8].[ext]' } }]
            },
            {
                test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/,
                use: [{ loader: 'file-loader', options: { limit: 8192, outputPath: 'fonts/', name: '[name].[ext]' } }]
            }
        ]
    },
    devtool: 'hidden-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
    plugins: [
        /**
       * Needed for removing previous build
       */
        new CleanWebpackPlugin(['./build-prod']),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[id].[hash:8].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                APP_ENV: JSON.stringify('prod'),
                __LOCAL__: false,
                WEBPACK: true
            }
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
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-analysis.html'
        })
    ]
};
