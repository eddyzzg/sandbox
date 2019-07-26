'use strict';

const path = require('path');
const {resolve} = require('path');

module.exports = {
    entry: {
        main: path.resolve('./src/main.js')
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./public/dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(hbs)$/,
                loader: 'handlebars-loader',
                options: {
                    helperDirs: resolve(__dirname, 'src', 'handlebars', 'helpers'),
                    precompileOptions: {
                        knownHelpersOnly: false
                    }
                },
                exclude: /node_modules/
            },
        ]
    }
};
