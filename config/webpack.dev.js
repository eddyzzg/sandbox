var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.join(__dirname, '..', 'app');
var TESTS_DIR = path.join(__dirname, '..', 'tests');

var config = {
    cache: true,
    target: 'web',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: ['./app/globals.js', 'babel-polyfill', './app/index.js', 'webpack-hot-middleware/client?reload=true'],
        tests: ['./app/globals.js', 'babel-polyfill', './app/tests/TestExecutor.js', 'webpack-hot-middleware/client?reload=true']
    },
    module: {
        rules: [
            {
                test: /\.(js|es6)$/,
                exclude: /node_modules/,
                use: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.(js|es6)$/,
                exclude: '/samples/',
                use: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.(hbs)$/,
                use: 'handlebars-loader?helperDirs[]=' + __dirname + "/../hbhelpers",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
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
                ],
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', 'build'),
        chunkFilename: '[hash].[name].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'common.js'}),
        new webpack.DefinePlugin({
            ENV: JSON.stringify("DEV")
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],
    resolve: {
        extensions: ['.js', '.es6'],
        alias: {}
    },
    node: {
        fs: "empty" // avoids error messages
    }
};

module.exports = config;
