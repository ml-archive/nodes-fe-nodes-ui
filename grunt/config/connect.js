// https://github.com/gruntjs/grunt-contrib-connect
module.exports = {
	server: {
		options: {
			port: 9075,
			livereload: true,
			open: true,
			base: '<%= paths.dist %>'
		}
	}
};