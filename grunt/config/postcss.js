module.exports = {
	options: {
		map: true,
		processors: [
			require('autoprefixer')({
				browsers: ['last 2 versions', 'ie >= 10']
			})
		]
	},
	src: ['<%= paths.dist %>assets/css/*.css']
};