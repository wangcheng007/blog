const merge = require('webpack-merge');
const baseConfog = require('./webpack.base.config');
const webpack = require("webpack");
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',

    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8001/html/frontHome.html'
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        overlay: true, // 浏览器页面上显示错误
        inline: true,
        compress: true,
        port: 8001,
        hot: true // 使用热加载插件 HotModuleReplacementPlugin
    }
};

module.exports = merge(baseConfog, devConfig);
