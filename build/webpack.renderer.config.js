'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('../config/base');
const { name, version, dependencies } = require('../package.json');

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let rendererConfig = {
    entry: {
        renderer: [config.build.rendererEntryPoint, config.build.rendererPath + '/Style/main.scss']
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: config.build.outputPath
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: process.env.NODE_ENV === 'production',
                    loaders: {
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "resolve-url-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    resolve: {
        alias: {
            '@': config.build.rendererEntryPoint,
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.ts', '.vue', '.json', '.js', '.node']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${process.env.NODE_ENV}'`
            },
            'APP_META': getAppMeta()
        }),
        new ExtractTextPlugin({
            filename: "css/[name].css",
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            inject: true,
            nodeModules: process.env.NODE_ENV !== 'production'
                ? path.resolve(__dirname, '../node_modules')
                : false
        }),
        new CopyWebpackPlugin([
            {
                from: config.build.staticPath,
                to: config.build.outputPath
            }
        ]),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    node: {
        __dirname: process.env.NODE_ENV !== 'production',
        __filename: process.env.NODE_ENV !== 'production'
    }
};

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
    rendererConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );

    rendererConfig.plugins.push(
        new webpack.DefinePlugin({
            '__static': `"${config.build.staticPath.replace(/\\/g, '\\\\')}"`
        })
    )
}


/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
    rendererConfig.devtool = ''

    rendererConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    )
}

function getAppMeta() {
    return {
        'name': `'${name}'`,
        'version': `'${version}'`,
        'build': `'${process.env.NODE_ENV}'`
    }
}

module.exports = rendererConfig;