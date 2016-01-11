// https://github.com/gruntjs/grunt-contrib-uglify
module.exports = {
	options: {
		preserveComments: 'some'
	},
	dist: {
		files: {
			'<%= paths.dist %>assets/js/docs.js': '<%= paths.dist %>assets/js/docs.js'
		}
	}
};