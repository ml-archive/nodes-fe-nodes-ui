//https://github.com/stephenplusplus/grunt-wiredep

var bowerExclude = [
	'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
];

module.exports = {
	vendor: {
		src: [
			'<%= paths.doc %>layouts/*.html'
		],

		options: {
			exclude: bowerExclude
		}
	}
};