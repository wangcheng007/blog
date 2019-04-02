const merge = require('webpack-merge');
const baseConfog = require('./webpack.base.config');
const webpack = require("webpack");
const path = require('path');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',

    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        // contentBase: false,
        compress: true,
        open:true,//自动打开浏览器
        port: 8001,
        hot: true // 使用热加载插件 HotModuleReplacementPlugin
    }
};

module.exports = merge(baseConfog, devConfig);
