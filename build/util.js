'use strict'
const path = require("path");
const config = require("../config");
const packageConfig = require("../package.json");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
exports.assetsPath = function(_path){
	const assetsSubDictory = process.env.NODE_ENV === "produciton"?config.build.assetsSubDictory:config.dev.assetsSubDictory;
	return path.posix.join(assetsSubDictory,_path);
}
exports.cssLoaders = function(options){
	options = options || {};
	const cssLoader = {
		loader:"css-loader",
		options:{
			sourceMap:options.sourceMap
		}
	}
	
	const postcssLoader = {
		loader:"postcss-loader",
		options:{
			sourceMap:options.sourceMap
		}
	}
	function generateLoaders(loader,loaderOption){
		const loaders =  options.usePostCSS?[cssLoader,postcssLoader]:[cssLoader];
		if(loader){
			loaders.push({
				loader:loader+"-loader",
				optons:Object.assign({},loaderOption,{
					options:[{
						sourceMap:options.soucrMap
					}]
				})
			})
			if(options.extract){
				return ExtractTextPlugin.extract({
					use:loaders,
					fallback:"vue-style-loader"
				})
			}else{
				return ["vue-style-loader"].concat(loaders)
			}
		}
	}
	return {
		css:generateLoaders(),
		postcss:generateLoaders(),
		less:generateLoaders("less"),
		sass:generateLoaders("sass",{indentedSyntax:true}),
		scss:generateLoaders("sass"),
		stylus:generateLoaders("stylues"),
		styl:generateLoaders("styleus")
	}
	
}
exports.styleLoaders = function(options){
	const output = [];
	const loaders = exports.cssLoaders(options);
	for(const extension in loaders){
		const loader = loaders[extension];
		output.push({
			use:loader,
			test:new RegExp('\\.'+extension+"$")
		})
	}
	return output;
}
exports.createNotifierCallback = () => {
	const notifier = require("node-notifier");
	return (severtify,errors) => {
		if(severtify !==  "error")return;
		const error = errors[0];
		const filename = error.file && error.file.split("!").pop();
		notifier.notify({
			title:packageConfig.name,
			message:servertify +":" + error.name,
			subtitle:filename || '',
			icon:path.join(__dirname,'logo.png')
		})
	}
}
