const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动shen
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器
const pkg = require('./package.json');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/index.jsx'),
        // 将 第三方依赖（node_modules中的） 单独打包
        vendor: Object.keys(pkg.dependencies)
    },
    
    output: {
        //输出到根目录的build目录下
        path: __dirname + "/build", 
        filename: "/js/[name].[chunkhash:8].js"
    },

    resolve: {
        extensions:['.js', '.jsx']
    },
    
    module: {
        rules: [{
            //scss文件，需要安装 npm install sass-loader node-sass --save-dev
            test: /\.scss$/, 
            exclude: /node_modules/,
            use: [{
                loader: 'style-loader'
            },{
                loader: 'css-loader',
                //这个是应该在把css当做模块时引入时用到的
                // options: {
                //     modules: true,
                //     localIdentName: '[name]__[local]--[hash:base64:5]'
                // }
            },{
                loader: "sass-loader"
            },{
                loader: 'postcss-loader', 
                // 为了自动生成兼容css写法，在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
                options: {
                    plugins: function() {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }]
        },{
            test: /\.(png|jpg|jpeg)$/,
            exclude: /node_modules/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name : './images/[hash:8].[name].[ext]'
                }
            }]
        }]
    },

    plugins: [
        // html 模板插件
        new HtmlWebpackPlugin({
            //这里其实可以指定自动生成的html的模板，可以把一些<srcipt>标签写进去
            // template: __dirname + '/src/index.html'
        }),
        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),
        // 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:9000'
        })
        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        // new webpack.DefinePlugin({
        //   __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        // })
    ],

    devServer: {
        port: 9000,
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}