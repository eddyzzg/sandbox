var rimraf = require('rimraf');
rimraf('./build', function () {
    console.log('done');
});

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var APP_DIR = path.join(__dirname, '..', 'app');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = {
    devtool: 'source-map',
    entry: {
        app: ['./app/globals.js', './app/index.js'],
        vendor: ['lodash', 'superagent', 'moment', 'handlebars', 'babel-polyfill', 'loglevel', 'jquery']
    },
    module: {
        rules: [{test: /\.(js|es6)$/, exclude: /node_modules/, use: 'babel-loader'}, {
            test: /\.(hbs)$/,
            use: 'handlebars-loader?helperDirs[]=' + __dirname + "/../hbhelpers",
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [
                    'raw-loader',
                    'less-loader'
                ], fallback: 'style-loader'
            }),
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: '[hash].[name].js',
        chunkFilename: '[hash].[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|pl|en/),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
            ENV: JSON.stringify("PROD")
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextPlugin({filename: "[hash].app.css", allChunks: true, disable: false}),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            chunks: ["app", "vendor"],
            filename: '[hash].[name].js',
            minChunks: 2,
            deepChildren: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "app",
            filename: '[hash].[name].js',
            minChunks: 2,
            children: true,
            deepChildren: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            generateStatsFile: true,
            openAnalyzer: false,
            reportFilename: 'index-report.html',
            statsFilename: 'stats.json'
        }),
        new HtmlWebpackPlugin()
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.es6']
    },
    node: {
        fs: "empty" // avoids error messages
    }
};

module.exports = config;
