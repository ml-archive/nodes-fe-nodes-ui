var config = require('../config/chart');

$(function() {
	// Configure Chart.js globals
	Chart.defaults.global.responsive 			= config.responsive;
	Chart.defaults.global.maintainAspectRatio 	= config.maintainAspectRatio;
});