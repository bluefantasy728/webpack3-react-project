const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动shen
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器
const pkg = require('./package.json');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
    //这里用于生产环境
    // entry: {
    //     app: path.resolve(__dirname, 'src/index.js'),
    //     // 将 第三方依赖（node_modules中的） 单独打包
    //     vendor: Object.keys(pkg.dependencies)
    // },
    
    // output: {
    //     //输出到根目录的build目录下
    //     path: __dirname + '/build', 
    //     // filename: path.resolve(__dirname, './js/[name].[hash:8].jsx')
    //     filename: './js/[name].[hash:8].js'
    // },
    entry: path.resolve(__dirname, 'src/app.jsx'),
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    resolve: {
        extensions:['.js', '.jsx']
    },
    
    module: {
        rules: [{
            //scss文件，需要安装 npm install sass-loader node-sass --save-dev
            test: /\.(scss|css)$/, 
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
                loader: 'sass-loader'
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
            //用babel来解析js文件并把es6的语法转换成浏览器认识的语法
            test: /\.(jsx|js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: [APP_PATH, path.resolve(ROOT_PATH, 'libs')],
            options: { presets: ['es2015', 'stage-0', 'react'] }
            // options: {
            //     presets: ['es2015','react'],
            //     // plugins: ['transform-runtime']
            // }
        },{
            test: /\.(png|jpg|jpeg)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
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
        //这段代码用于生产环境，可以压缩打包代码
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
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