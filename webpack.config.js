var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        'docs/demo/js/main': ["./src/demo.js"],
        'distributionbuilder': ["./src/entry.js"],
        'distributionbuilder.min': ["./src/entry.js"]
    },
    output: {
        path: __dirname,
        filename: "[name].js"
    },
    externals: [
        {
            "window": "window"
        }
    ],
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
            ,
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff&name=docs/fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream&name=docs/fonts/[name].[ext]'
            },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?name=docs/fonts/[name].[ext]'},
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml&name=docs/fonts/[name].[ext]'
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: require.resolve("jquery"), loader: "imports?jQuery=jquery"}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new ExtractTextPlugin("distributionbuilder.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',
            'window.$j': 'jquery'
        })
    ]
}
;