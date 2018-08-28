'use strict'
const path = require("path");
const webpack = require("webpack");
const baseWebpackConfig = require("webpack.base.conf");
const merge = require("merge");
const config = require("../config");
const utils = require("./util");
const webpackConfig = merge(baseWebpackConfig,{
	output:{
		path:config.build.assetsRoot,
		filename:utils.assetsPath("js/[name].[chunkhash].js"),
		chunkFilename:utils.assetsPath("js/[id].[chunckhash].js")
	},
	plugins:[
		new webpack.definePlugin({
			'process_env':env
		}),
		new UglifyJsPlugin({
			uglifyOptions:{
				warnings:false
			},
			sourceMap:config.build.productionSourceMap,
			parallel:true
		}),
		new ExtractTextPlugin({
			filename:utils.assetsPath("css/[name].[contenthas].css"),
			allChunks:true
		}),
		new OptimizeCSSPlugin({
			cssProcessorOption:util.build.productionSourceMap?{safe:true,inline:true}:{safe:true}
		}),
		new HtmlWebpackPlugin({
			filename:config.build.index,
			template:"index.html",
			inject:true,
			minify:{
				removeComments:true,
				collepseWhitespace:true,
				removeAttributeQuote:true
			},
			chrunkstoremode:"dependency"
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name:"vendor",
			minChunks(module){
				return (module.resource&&nodule.resource.indexOf(path.join(__dirname,"../node_modules")) === 0)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:"app",
			async:"vendor-async",
			children:true,
			minChunks:3
		}),
		new CopyWebpackPlugin([{
			form:path.resove(__dirname,"../static")
			to:config.build.assetsSubDictory,
			ignore:["*."]
		}])
	],
	module:{
		rules:utils.styleLoaders({
			sourceMap:config.build.productionSourceMap,
			usePostCSS:true,
			extract:true
		})
	},
	devtool:config.build.productionSourceMap?config.build.devtool:false,
})
if(config.build.bundleAnanlyzerReport){
	webpackconfig.plugins.push(
		new CompressionWebpackPlugin({
			asset:'[path].gz.[query]',
			algrithm:"gzip",
			test:new RegExp("\.js$|\.html$"),
			threshold:10240,
			minRatio:0.8
		})
	)
}
model.exports = webpackconfig;