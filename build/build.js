'use strict'
require("./check-version")();

process.env.NODE_ENV = 'production';

const ora = require("ora");
const rm = require("rimraf");
const path = require("path");
const webpackconfig = require('./webpack.pro.conf');
const webpack = require("webpack");
const chalk = require("chalk");
const confing = require("../config");

const spinner =  ora("building for production...");
spinner.start();
rm(path.join(config.build.assetsRoot,config.build.assetsSubDictory),err =>{
	if(err) throw err;
	webpack(webpackconfig,(err,status) => {
		spinner.stop();
		if(err) throw err;
		process.stdout.write(stats.toString({
			colors:true,
			moduls:false,
			children:false,
			chunks:false,
			chunksModuls:false
		})+"\n\n")
		if(status.hasErros){
			console.log(chalk.red("build fail with error \n"));
			process.exit(1);
		}
	})
})

