const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.tsx',
    },

    output: {
        path: path.resolve('./build-dev'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.js$/,
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
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
    devtool: 'hidden-source-map',
    plugins: [
        /**
         * Needed for removing previous build
         */
        new CleanWebpackPlugin(['./build-dev']),
        /**
        * Needed for Hot module reloading
        */
        new webpack.HotModuleReplacementPlugin(),
        /**
         * Causes the relative path of the module to be used in HMR
         * Recommended by docs for development configurations: https://webpack-v3.jsx.app/plugins/named-modules-plugin/
         */
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].[hash:8].css'
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                APP_ENV: JSON.stringify('dev'),
                WEBPACK: true
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
