const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const os = require('os')
const portfinder = require('portfinder')
const fs = require('fs')


function getIpAdress () {//如果端口被占用 就通过++来寻找下一个端口号
    let interfaces = os.networkInterfaces()
    for(var devName in interfaces){
        let iface = interfaces[devName]
        for(var i = 0; i < iface.length; i++){
            let alias = iface[i]
            if(alias.family === 'IP4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address
            }
        }
    }
}

//let host = getIpAdress()



portfinder.basePort = "6060"
portfinder.getPort(function(err, port){
    if(err) throw err

    ports.data.port = port
    ports = JSON.stringify(ports)
    fs.writeFileSync('./port.json', ports)
})
let ports = fs.readFileSync('./port.json', 'utf8')
ports = JSON.parse(ports)

moduleExportObject = {
    entry: {
        index:'./src/js/index.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist') 
    },
    mode: 'development',//development
    performance: {hints: false},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: /src/,
                use:[{
                    loader: 'babel-loader',
                    options:{
                        plugins:['@babel/transform-runtime']
                    }
                }]
            },
            {
                test:/\.(less|css)$/,
                use:[
                    {loader:MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }},
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|img)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit:5000,
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: `./src/html/index.html`,
            filename: `index.html`,
            chunks: ['index']
        })
    ],
    devServer: { 
        port: ports.data.port,
        progress: true,
        contentBase: './dist',//=>指定当前服务器处理资源的目录
        open: true,

    }
}

function getEntry() { //自动生成entry入口
    let entry = {}
    glob.sync('./src/js/*.js').forEach(function (name) {
        let start = name.indexOf('src/') + 4
        let end = name.length - 3
        let eArr = []
        let n = name.slice(start, end)
        n = n.split('/')[1]
        eArr.push(name)
        //eArr.push('babel-polyfill')
        entry[n] = eArr[0]
    })
    return entry
}

function getHtmlConfig(name) { //生成htmlwebpackplugin的options
    return {
        template: `./src/html/${name}.html`,
        filename: `html/${name}.html`,
        inject: true,
        hash: false,
        chunks: [name]
    }
}

let entry = getEntry()
delete entry.index

moduleExportObject.entry = 
    Object.assign(moduleExportObject.entry, entry)

Object.keys(entry).forEach(element => {//根据js来添加相应的htmlwebpackplugin的数量
    moduleExportObject.plugins
        .push(new HtmlWebpackPlugin(getHtmlConfig(element)))
   
})





module.exports = moduleExportObject