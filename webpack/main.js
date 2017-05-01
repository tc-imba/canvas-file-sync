/**
 * Created by liu on 17-4-30.
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: {
        'main': path.resolve(__dirname, '../app/main.jsx'),
    },
    resolve: {
        alias: require('./resolve.alias')
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].js',
        publicPath: 'build/'
    },
    module: require('./module'),
    plugins: [
        /*new webpack.optimize.CommonsChunkPlugin({
         name  : 'common',
         chunks: ['main', 'main2']
         }),*/
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new ExtractTextPlugin("css/styles.css"),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, '../build/vendor.stable.manifest.json'),
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'views/index.html',
            hash: true,
            inject: true
        })
        /*new webpack.DllReferencePlugin({
         context : __dirname,
         manifest: path.resolve(__dirname, '../build/vendor.beta.manifest.json'),
         }),*/
    ]
};

module.exports = config;
