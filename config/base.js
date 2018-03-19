'use strict';

const path = require('path');

module.exports = {
    build: {
        outputPath: path.resolve(__dirname, '../dist'),
        staticPath: path.resolve(__dirname, '../static'),
        mainPath: path.resolve(__dirname, '../src/main'),
        rendererPath: path.resolve(__dirname, '../src/renderer'),
        mainEntryPoint: path.resolve(__dirname, '../src/main/entrypoint.ts'),
        rendererEntryPoint: path.resolve(__dirname, '../src/renderer/app.ts')
    },
    dev: {
        env: require('./dev.env')
    },
    test: {
        env: require('./test.env')
    },
    prod: {
        env: require('./prod.env')
    }
}