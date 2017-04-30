/**
 * Created by liu on 2017/3/25.
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports          = {
    rules: [{
        test: /\.jsx?$/,
        use : 'babel-loader'
    }, {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        use : 'imports-loader?jQuery=jquery'
    }, {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
            fallback: "style-loader",
            use     : "css-loader"
        })
    }, {
        test: /\.less$/,
        use : ['style-loader', 'css-loader', 'less-loader']
    }, {
        test: /\.(png|jpg|cur)$/,
        use : 'url-loader?limit=25000&name=imgs/[name].[hash:6].[ext]'
    }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use : "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[hash:6].[ext]"
    }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use : "file-loader?name=fonts/[name].[hash:6].[ext]"
    }]
};
