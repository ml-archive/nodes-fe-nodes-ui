//https://github.com/stephenplusplus/grunt-wiredep

var bowerExclude = [
	'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
];

module.exports = {
	vendor: {
		src: [
			'<%= paths.doc %>includes/footer.html'
		],

		options: {
			exclude: bowerExclude
		}
	}
};