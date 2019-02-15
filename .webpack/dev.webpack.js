var webpack = require("webpack")
var merge = require("webpack-merge")
var path = require("path")
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
var base = require("./base.webpack")
module.exports = merge(base, {
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8888,
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        host: "0.0.0.0",
        hot: true,
        inline: true,
        open: true
    },
    plugins: [
        // new BundleAnalyzerPlugin()
    ]
})
