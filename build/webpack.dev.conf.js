const portfinder = require("portfinder");
const config = require("../config");
const utils = require("./util");
const webpack = require("webpack");
const baseWebpackConf = require("./webpack.base.conf");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWeppackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const path = require("path");
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const devWebpackConfig = merge(baseWebpackConf,{
	module:{
		rules:utils.styleLoaders({sourceMap:config.dev.souceMap,uesPostCSS:true})
	},
	devtool:config.dev.devtool,
	devServer:{
		clientLogLevel:"warning",
		historyApiFailback:{
			rewrites:[{
				from:/.*/,
				to:path.posix.join(config.dev.assetsPublicPath,"index.html")
			}]
		},
		hot:true,
		contentBase:false,
		host:HOST||config.dev.host,
		compress:true,
		open:config.dev.autoOpenBrowser,
		overlay:config.dev.errorOverlay?{warnings:false,errors:true}:false,
		publicPath:config.dev.assetsPublicPath,
		proxy:config.dev.proxyTable,
		quiet:true,
		watchOptions:{
			poll:config.dev.poll
		}
	},
	plugins:[
		new webpack.DefinePlugin({
			'process.env':require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			filename:"index.html",
			template:"index.html",
			inject:true
		}),
		new CopyWebpackPlugin([{
			from:path.resolve(__dirname,"../static"),
			to:config.dev.assestSubDirectory,
			egnore:[".*"]
		}])
	]
})
module.exports = new Promise((resolve,reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port;
	portfinder.getPort((err,port) => {
		if(err){
			reject(err)
		}else{
			process.env.PORT = port
			devWebpackConfig.devServer.port = port;
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo:{
					messages:['your application running hear htpp://${devWebpackConfig.server.host}:${port}']
				},
				onErrors:config.dev.notifyOnErrors?utils.createNotifierCallback:undefined
			}));
			resolve(devWebpackConfig);
		}
	})
})
