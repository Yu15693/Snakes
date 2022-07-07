const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    // 入口文件
    entry: './src/index.ts',
    // 指定打包文件所在目录
    output: {
        // 指定打包目录和打包后文件
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    //指定webpack打包时要使用的的模块
    module: {
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                use: [
                    {
                        // 配置babel
                        loader: 'babel-loader',
                        options: {
                            // 预定义的环境
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            chrome: '88',
                                        },
                                        corejs: '3',
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                    },
                                ],
                            ],
                        },
                    },
                    'ts-loader',
                ],
                //排除的文件
                exclude: '/node_modules/',
            },
            // 设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [

                                    ["postcss-preset-env",
                                        {
                                            browers: 'last 2 versions'
                                        }]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ],
    },
    // 引入的插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: '自定义的title',
            template: './src/index.html',
        }),
    ],
    //设置引用模块
    resolve: {
        extensions: ['.ts', '.js'],
    },
}