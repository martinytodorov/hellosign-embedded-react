var path = require('path');

module.exports = {
    entry: './main.js',  
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['babel-preset-env', 'react'],
                },
            }
        ]
    }
 };