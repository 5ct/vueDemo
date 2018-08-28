'use strict'
const chalk = require("chalk");
const packageConfig = require("../package.json");
const semver = require("semver");
const shell = require("shell");
const exec = function(cmd){
	return require("child_process").execSync(cmd).toString().trim();
}
const versionRequirements = [{
	name:"node",
	currentVersion:semser.clean(process.version),
	versionRequirement:packageConfig.engine.node
}]
if(shell.which("npm")){
	versionRequirements.push({
		name:"npm",
		currentVersion:exec("npm --version"),
		versionRequirement:packageConfig.engine.npm
	})
}
module.exports = function(){
	const warnings = [];
	for(let i = 0;i < versionRequirements.length;i++){
		const mod = versionRequirements[i];
		if(!semver.satisfies(mod.currentVesion,mod.versionRequirement)){
			warnings.push(mod.name +":"+chalk.red(mod.currentVesion)+"shoud be" + chalk.green(mode.versionRequirement))
		}
		if(warnings.length){
			console.log("");
			console.log(chalk.yellow("To use templete,yuo must update following to modules"));
			console.log("");
		}
		for(let i = 0;i < warnings.length;i++){
			console.log(warnings[i]);
		}
		process.exit(-1);
	}
}
