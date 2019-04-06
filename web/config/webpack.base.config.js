const path = require('path');
const fs = require('fs');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 获取页面 对应title
const pageConfigPath = path.resolve(__dirname, '../template/config.json');
const pageConfig = JSON.parse(fs.readFileSync(pageConfigPath, 'utf-8'));

// 页面地址
const pagesPath = path.resolve(__dirname, '../src/pages');
// 获取页面
const pages = fs.readdirSync(pagesPath);

const enrties = {};
pages.forEach((item) => {
    enrties[`pages/${item}/index`] = path.resolve(__dirname, `../src/pages/${item}/index.tsx`);
});

function createHtml(pages) {
    const htmlArr = pages.map(item => {
        return new HtmlWebpackPlugin({
            template: './template/index.ejs',
            chunks: [`pages/${item}/index`, 'vender', 'commons', 'compoents'],
            filename: `./html/${item}.html`, // html位置
            title: pageConfig[item],
            inject: true,
            minify: {// 压缩html
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        });
    });

    return htmlArr;
}

const htmlArr = createHtml(pages);

module.exports = {
    // 1、填写项目的入口文件
    entry: enrties,

    // 2、填写项目的出口信息
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/[name].js'
    },

    // 3、填写项目的loader 配置
    module: {
        rules: [
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(__dirname, '../.cache-loader')
                        }
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, '../')
                            }
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(j|t)sx?/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.resolve(__dirname, '../.cache-loader')
                        }
                    },
                    'babel-loader',
                    'awesome-typescript-loader'
                ]
            }
        ]
    },

    // 4、填写项目的plugin 配置
    plugins: [
        ...htmlArr, // html插件数组

        new ProgressBarPlugin({
            format: 'build [:bar] :percent (:elapsed seconds)',
            clear: false,
            width: 60
        }),

        new MiniCssExtractPlugin({
            filename: 'assets/style.css'
        })

        // new BundleAnalyzerPlugin()
    ],

    optimization: {
        splitChunks: {
            chunks: 'all', // 代码块类型 必须三选一： "initial"（初始化） | "all"(默认就是all) | "async"（动态加载）

            cacheGroups: {
                vender: {
                    test: /node_modules/,
                    filename: 'assets/vender.js',
                    chunks: 'initial',
                    minChunks: 1,
                    priority: 10,
                    minSize: 0,
                    enforce: true,
                    name: 'vender'
                },

                commons: {
                    filename: 'assets/commons/index.js',
                    chunks: 'initial',
                    test: /common/,
                    minChunks: 1,
                    minSize: 0,
                    enforce: true,
                    name: 'commons'
                },

                components: {
                    filename: 'assets/compoents/index.js',
                    chunks: 'initial',
                    test: /components/,
                    minChunks: 1,
                    minSize: 0,
                    enforce: true,
                    name: 'compoents'
                }
            }
        }
    },

    // 5、其他配置
    resolve: {
        modules: [
            'node_modules'
        ],

        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],

        alias: {
            '@common': path.resolve(__dirname, '../src/common'),
            '@components': path.resolve(__dirname, '../src/components')
        },

        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, './../', 'tsconfig.json'),
                extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
            })
        ]
    }
};
