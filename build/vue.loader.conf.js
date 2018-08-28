'use strict'
const utils = require("./util");
const config = require("../config");
const isProduction = process.env.NODE_ENV == "production";
const sourceMapEnable = isProduction?config.build.productionSourceMap:config.dev.cssSourceMap;
module.exports = {
	loaders:utils.cssLoaders({
		sourceMap:sourceMapEnable,
		extract:isProduction
	}),
	cssSourceMap:sourceMapEnable,
	cacheBusting:config.dev.cacheBusting,
	transformToRequire:{
		video:["src",'post'],
		source:"src",
		img:"src",
		image:"xlink/href"
	}
}
