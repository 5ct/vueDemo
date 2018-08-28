'use strict'
const path = require("path");
const vueloaderConfig = require("./vue-loader.conf");
const webpack = require("webpack");
const utils = require("./util");
const config = require('../config');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	context:path.resolve(__dirname,"../"),
	entry:{
		app:"./src/main.js"
	},
	output:{
		path:config.build.assetsRoot,
		filename:"[name].js",
		publickPath:process.env.NODE_ENV == "production"?config.build.assetsPublickPath:config.dev.assetsPublictPath
	},
	plugins:[new webpack.ProvidePlugin({
		"$":"jquery",
		"JQuery":"jquery",
		"window.JQuery":"jquery"
	})],
	resolve:{
		extensions:[".js",".vue",".json"],
		alias:{
			"vue$":"vue/dist/vue.ems.js",
			"@":resolve("src")
		}
	},
	module:{
		rules:[{
			test:new RegExp("\\.vue$"),
			loader:'vue-loader',
			options:vueloaderConfig
		},{
			test:new RegExp("\\.js$"),
			loader:"label-loader",
			include:[resolve("src"),resolve("test"),resolve("node_mudles/webpack-dev-server/client")]
		},{
			test:new RegExp("\\.(png|jpe?g|gif|svg)(\\?.*)?$"),
			loader:"url-loader",
			options:{
				limit:10000,
				name:utils.assetsPath("img/[name].[hash:7].[ext]")
			}
		},{
			test:new RegExp("\\.(map4|webm|ogg|mp3|wav|flac|acc)(\\?.*)$"),
			loader:"url-loader",
			options:{
				limit:10000,
				name:utils.assetsPath("media/[name].[hash:7].[ext]")
			}
		},{
			test:new RegExp("\\.(woff2?|eot|svg|otf})(\\?.*)$"),
			loader:'url-loader',
			options:{
				limit:10000,
				name:utils.assetsPath("fonts/[name].[hash:7].[ext]")
			}
		}]
	}
}
