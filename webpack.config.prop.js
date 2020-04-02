const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const __APP_PUBLIC_PATH__ = process.env.APP_PUBLIC_PATH;
module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.tsx',
        vendor: ['./src/vendor/modules.js']
    },

    output: {
        path: path.resolve('./build-prod'),
        publicPath: __APP_PUBLIC_PATH__,
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
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
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(['./build-prod']),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].[hash:8].css'
        }),
        new HtmlWebpackPlugin({
            favicon: './src/assets/favicon.ico',
            template: './src/index.html',
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
        new webpack.Defineproxy({
            __APP_ENV__: JSON.stringify('production'),
            NODE_ENV: JSON.stringify('production'),
            __LOCAL__: false,
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
