var path = require("path")
var fs = require("fs")
var pkg = require("./../package.json")
var srcPath = path.resolve(__dirname, "./../src")
var distPath = path.resolve(__dirname, "./../dist")
// 入口文件
let entries = {}
fs.readdirSync(path.join(srcPath, "/app")).forEach(entry => {
    var regExp = /\.(js|jsx|ts|tsx)$/
    if(regExp.test(entry))
    entries[entry.replace(regExp, "")] = path.join(srcPath, `/app/${entry}`)
});
var entryPages = fs.readdirSync(path.join(srcPath, "/pages"));

// 出口文件
var outputOps = {
    publicPath: "",
    path: distPath,
    filename: "[name].[hash].bundle.js"
};

// 自动解析确定的扩展名
var resolveExtension = [".js", ".jsx", ".ts", ".tsx", ".json"];

// 解析搜索模块的目录
var resolveModules = [
    path.join(srcPath, "/components"), 
    path.join(srcPath, "/assets"), 
    path.join(srcPath, "/pages"),
    "node_modules"
]

// 别名
var resolveAlias = {
    components: path.join(srcPath, "/components"),
    pages: path.join(srcPath, "/pages"),
    public: path.join(srcPath, "/public"),
}
module.exports = {
    version: pkg.version,
    srcPath: srcPath,
    distPath: distPath,
    entries: entries,
    entryPages: entryPages,
    outputOps: outputOps,
    resolveExtension: resolveExtension,
    resolveModules: resolveModules,
    resolveAlias: resolveAlias
}
