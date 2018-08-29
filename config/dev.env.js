'use strict'
const merge = require('webpack-merge');
const proEnv = require("./prop.env");

module.exports = merge(proEnv,{
	NODE_ENV:"developemnt"
})
