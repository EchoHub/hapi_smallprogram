var webpack = require("webpack")
var merge = require("webpack-merge")
var path = require("path")
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
var base = require("./base.webpack")
module.exports = merge(base, {
    // optimization: {
    //     chunks: "async",
    //     minSize: 20000,
    //     minChunks: 2,
    //     maxAsyncRequests: 5,
    //     maxInitialRequests: 3,
    //     name: true,
    //     splitChunks: {
    //         chunks: 'all'
    //     },
    //     runtimeChunk: {
    //         name: 'runtime'
    //     }
    // },
    devtool: "cheap-module-source-map",
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.optimize.SplitChunksPlugin({ // 分割打包，代码复用
            chunks: "async",
            minSize: 20000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true
        })
    ]
})
