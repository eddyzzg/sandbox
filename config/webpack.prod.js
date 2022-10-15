var rimraf = require('rimraf');
rimraf('./src/main/resources/public', function () {
    console.log('done');
});

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NameAllModulesPlugin = require('name-all-modules-plugin');
var APP_DIR = path.join(__dirname, '..', 'app');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

var config = {
    entry: {
        vendor: ['./app/globals.js', 'lodash', 'superagent', 'moment', 'babel-polyfill', 'loglevel', 'crypto-js'],
        app: ['./app/index.js']
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
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ], fallback: 'style-loader'
            }),
            exclude: /node_modules/
        }]
    },
    output: {
        path: path.join(__dirname, '..', 'src/main/resources/public/ui'),
        filename: '[chunkhash].[name].js',
        chunkFilename: '[chunkhash].[name].js',
        publicPath: 'ui/'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin((chunk) => {
            if (chunk.name) {
                return chunk.name;
            }
            return chunk.mapModules(m => path.relative(m.context, m.request)).join("_");
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: [/.*vendor\.js/, /.*commons\.js/]
        }),
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
            beautify: false,
            comments: false,
            compressor: {
                drop_debugger: true,
                warnings: false,
                screw_ie8: true
            },
            sourceMap: true,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin({filename: "[contenthash].app.css", allChunks: true, disable: false}),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: '[chunkhash].[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "app",
            filename: '[chunkhash].[name].js',
            minChunks: 2,
            children: true,
            deepChildren: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            generateStatsFile: true,
            openAnalyzer: false,
            reportFilename: 'index-report.html',
            statsFilename: 'stats.json'
        }),
        new HtmlWebpackPlugin({
            contextPath: '<script th:inline="javascript">var contextPath = [[${contextPath}]];var appVersion = [[${appVersion}]];var se = [[${se}]];var sessionMaxTimeInMinutes = [[${sessionMaxTimeInMinutes}]]; </script>',
            template: 'config/prod-template.html',
            filename: '../../templates/home.html',
            inject: false,
            chunksSortMode: 'manual',
            chunks: ['runtime', 'vendor', 'app']
        }),
        //new webpack.optimize.ModuleConcatenationPlugin(),//https://github.com/alexindigo/webpack-chunk-hash/issues/15
        //a moze https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
        new NameAllModulesPlugin(),
        new InlineChunkManifestHtmlWebpackPlugin(),
        new webpack.BannerPlugin("Build " + new Date())
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.es6']
    },
    node: {
        fs: "empty" // avoids error messages
    }
};
module.exports = config;
