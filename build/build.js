'use strict';

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development';

const environmentAlias = { 'production': 'prod', 'testing': 'test', 'development': 'dev' };
const environment = environmentAlias[process.env.NODE_ENV] ? environmentAlias[process.env.NODE_ENV] : environmentAlias.development;

const ora = require('ora');
const del = require('del');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/base');

console.log(`${chalk.yellow('Building for environment:')} ${chalk.red(environment)}.\n`);

// Clean output folder
let spinner = createSpinner('Cleaning output folder.');
del.sync([`${config.build.outputPath}/*`]);
spinner.succeed('Cleaned output folder.');

const tasks = ['main', 'renderer'];
const spinners = {};
let results = '';

for(let i in tasks) {
    
    const task = tasks[i];
    spinners[task] = createSpinner(`Building: ${chalk.yellow(task)}`);
    pack(require(`./webpack.${task}.config`)).then(result => {
        results += result + '\n\n';
        spinners[task].succeed();
    }).catch(err => {
        spinners[task].fail(`Failed to build ${task}.`);
        console.log(chalk.red(`\nFailed to build ${task}.`));
        console.error(`\n${err}\n`);
        process.exit(1);
    })
}

function pack(config) {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if(err) {
                return reject(err.stack || err);
            }

            if(stats.hasErrors()) {
                let err = '';
                stats.toString({
                    chunks: false,
                    colors: true
                })
                .split(/\r?\n/)
                .forEach(line => (err += `    ${line}\n`));

                return reject(err);
            }

            resolve(stats.toString({
                chunks: false,
                colors: true
            }))
        });
    })
}

function createSpinner(msg) {
    return ora({ text: msg, color: 'yellow' }).start();
}