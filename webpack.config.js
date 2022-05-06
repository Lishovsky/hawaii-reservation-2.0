const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

//reservation page
// module.exports = {
//     entry: './src/webpack-panel-sources.js',
//     output: {
//         filename: '../panel/main.[contenthash].js',
//         path: path.resolve(__dirname, './dist/panel')
//     },
//     mode: 'production', //development  /  production
//     module: {
//         rules: [
//             {
//                 test: /\.(scss)$/,
//                 use: [
//                     MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
//                 ]
//             },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/env']
//                     }
//                 }
//             }
//         ]
//     },

//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: '../panel/main.[contenthash].css',
//         }),
//         new CleanWebpackPlugin({
//             cleanOnceBeforeBuildPatterns: [
//                 '**/*'
//             ]
//         }),
//         new HTMLWebpackPlugin({
//             filename: 'home.html',
//             template: './src/views/home.html'
//         })
//     ]
// }

//admin panel

module.exports = {
    entry: './src/webpack-admin-sources.js',
    output: {
        filename: '../admin/admin.[contenthash].js',
        path: path.resolve(__dirname, './dist/admin')
    },
    mode: 'production', //development  /  production
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '../admin/admin.[contenthash].css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*'
            ]
        }),
        new HTMLWebpackPlugin({
            filename: 'panel.html',
            template: './src/views/panel.html'
        })
    ]
}

//status

// module.exports = {
//     entry: './src/webpack-status-sources.js',
//     output: {
//         filename: '../status/status.[contenthash].js',
//         path: path.resolve(__dirname, './dist/status')
//     },
//     mode: 'production', //development  /  production
//     module: {
//         rules: [
//             {
//                 test: /\.(scss)$/,
//                 use: [
//                     MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
//                 ]
//             },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/env']
//                     }
//                 }
//             }
//         ]
//     },

//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: '../status/status.[contenthash].css',
//         }),
//         new CleanWebpackPlugin({
//             cleanOnceBeforeBuildPatterns: [
//                 '**/*'
//             ]
//         }),
//         new HTMLWebpackPlugin({
//             filename: 'result.html',
//             template: './src/views/result.html'
//         })
//     ]
// }

//admin login page

// module.exports = {
//     entry: './src/webpack-login-sources.js',
//     output: {
//         filename: '../loginPage/loginForm.[contenthash].js',
//         path: path.resolve(__dirname, './dist/loginPage')
//     },
//     mode: 'production', //development  /  production
//     module: {
//         rules: [
//             {
//                 test: /\.(scss)$/,
//                 use: [
//                     MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
//                 ]
//             },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/env']
//                     }
//                 }
//             }
//         ]
//     },

//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: '../loginPage/login.[contenthash].css',
//         }),
//         new CleanWebpackPlugin({
//             cleanOnceBeforeBuildPatterns: [
//                 '**/*'
//             ]
//         }),
//         new HTMLWebpackPlugin({
//             filename: 'loginPage.html',
//             template: './src/views/login.html'
//         })
//     ]
// } 