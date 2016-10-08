var path = require("path");
var webpack = require('webpack');
module.exports = {
    entry: {
        'demo/js/main': ["./sources/demo.js"],
        'distributionbuilder': ["./sources/packager.js"],
        'distributionbuilder.min': ["./sources/packager.js"]
    },
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};