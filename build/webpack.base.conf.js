'use strict'
const path = require("path");
const vueLoaderConfig = require("./vue-loader.conf");
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
		publicPath:process.env.NODE_ENV == "production"?config.build.assetsPublicPath:config.dev.assetsPublictPath
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
		rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
	}
}
