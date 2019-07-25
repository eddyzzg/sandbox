'use strict';

const path = require('path');

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
            }
            // ,
            // {
            //     test: /\.(hbs)$/,
            //     loader: 'handlebars-loader',
            //     options: {
            //         helperDirs: path(__dirname, 'src', 'handlebars', 'helpers'),
            //         precompileOptions: {
            //             knownHelpersOnly: false
            //         }
            //     },
            //     exclude: /node_modules/
            // }
        ]
    }
};
