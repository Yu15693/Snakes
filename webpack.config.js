const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//对于两个目录同样的配置
let common_config = {
    node: {
        __dirname: true
    },
    mode: process.env.ENV || 'development',
    module: {
        rules: [
            // 设置ts文件处理
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, "src/ui")
                ]
            },
            // 设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    // 引入的插件
    plugins: [
        //每次打包前清理
        new CleanWebpackPlugin(),
        //生成对应index文件
        new HTMLWebpackPlugin({
            title: '贪吃蛇',
            template: './src/renderer/index.html',
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};

module.exports = [
    //electron主进程设置
    Object.assign({}, common_config, {
        target: 'electron-main',
        entry: {
            renderrer: './src/main/index.ts',
        },
        output: {
            filename: '[name]-bundle.js',
            path: path.resolve(__dirname, 'src/main/dist')
        },
    }),
    //electron渲染进程配置
    Object.assign({}, common_config, {
        target: 'electron-renderer',
        entry: {
            ui: './src/renderer/index.ts',
        },
        output: {
            filename: '[name]-bundle.js',
            path: path.resolve(__dirname, 'src/renderer/dist')
        },
    })
]
