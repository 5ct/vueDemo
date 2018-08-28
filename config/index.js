'use strict'
const path = require("path");

module.exports = {
	dev:{
		assetsSubDictory:'static',
		assetsPublicPath:"/",
		proxyTable:{},
		host:"localhost",
		port:8086,
		autoOpenBrowser:true,
		errorOverlay:true,
		poll:true,
		notifyOnErrors:true,
		devtool:"cheap-module-eval-source-map",
		cacheBusting:true,
		cssSourceMap:true
	},
	build:{
		index:path.resolve(__dirname,'../dist/index.html'),
		assetsRoot:path.resolve(__dirname,"../dist"),
		assetSubDictory:"static",
		assetsPubclickPath:"/",
		devtool:"#source-map",
		productionSourceMap:true,
		productionGzip:false,
		productionGzipExtensions:["js","css"],
		bundleAnanlyzerReport:process.env.npm_config_report
	}
}
