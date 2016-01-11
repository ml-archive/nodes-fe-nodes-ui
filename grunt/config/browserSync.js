// https://github.com/gruntjs/grunt-contrib-connect
module.exports = {
	//bsFiles: {
	//	src : [
	//		'<%= paths.dist %>',
	//		'app/css/*.css',
	//		'app/*.html'
	//	]
	//},
	options: {
		watchTask: true,
		server: '<%= paths.dist %>',
		//startPath: 'docs/'
	}
};