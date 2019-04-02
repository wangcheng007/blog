const merge = require('webpack-merge');
const baseConfog = require('./webpack.base.config');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const pordConfig = {
    mode: 'production',

    plugins: [
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS:{
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        })
    ]
};

module.exports = merge(baseConfog, pordConfig);
