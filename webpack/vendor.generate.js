/**
 * Created by liu on 17-4-30.
 */
const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    generate: (name, libs) => {
        let entry   = {};
        entry[name] = libs;
        return {
            entry  : entry,
            resolve: {
                alias: require('./resolve.alias')
            },
            output : {
                path      : path.resolve(__dirname, '../build'),
                filename  : 'js/vendor.[name].js',
                library   : 'vendor_[name]',
                publicPath: 'build/'
            },
            module : require('./module'),
            plugins: [
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
                new ExtractTextPlugin("css/vendor.[name].css"),
                new webpack.DllPlugin({
                    path   : path.resolve(__dirname, '../build/vendor.[name].manifest.json'),
                    name   : 'vendor_[name]',
                    context: __dirname
                }),
            ]
        };
    }
};

