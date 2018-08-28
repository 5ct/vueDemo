'use strict'
const merge = require('webpack-merge');
const proEnv = require("./pro.env");

module.exports = merge(proEnv,{
	NODE_ENV:"developemnt"
})
