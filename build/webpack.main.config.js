'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('../config/base');
const { dependencies } = require('../package.json');

let mainConfig = {
    entry: {
        main: config.build.mainEntryPoint
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: config.build.outputPath
    },
    target: 'electron-main',
    externals: [
        ...Object.keys(dependencies || {})
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    node: {
        __dirname: process.env.NODE_ENV !== 'production',
        __filename: process.env.NODE_ENV !== 'production'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js', '.node', '.json']
    }
}

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
    mainConfig.plugins.push(
        new webpack.DefinePlugin({
            '__static': `"${config.build.staticPath.replace(/\\/g, '\\\\')}"`
        })
    )
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
    mainConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    )
  }
  
module.exports = mainConfig;