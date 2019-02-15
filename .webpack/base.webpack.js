var webpack = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var Glob = require("./default.setting")
var env = process.env.NODE_ENV
module.exports = {
    mode: env,
    entry: {
        ...Glob.entries,
        vendor: ["@babel/polyfill"]
    },
    output: Glob.outputOps,
    resolve: {
        extensions: Glob.resolveExtension,
        modules: Glob.resolveModules,
        alias: Glob.resolveAlias
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: [
                            "env", "stage-0"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s?)css$/,
                use: env === "production" ? [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.join(Glob.distPath, "/public")
                        }
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ] : [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                        },
                        {
                            loader: "sass-loader" // 将 Sass 编译成 CSS
                        }
                    ]
            },
            {
                test: /\.htm|html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: env === "production"  //压缩html代码
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: "url-loader",
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: "url-loader?limit=8192&name=./static/[name].[hash:8].[ext]"
            }
        ]
    },
    plugins: [
        ...addHTMLWebpackPlugins(Glob.entryPages)
    ]
}

function addHTMLWebpackPlugins(paths) {
    const _paths = paths.filter(path => /\.(htm|html)$/.test(path));
    return _paths.map(filename => {
        return new HtmlWebpackPlugin({
            template: path.join(Glob.srcPath, `/pages/${filename}`),
            filename: filename,
            inject: true
        })
    })
}