// https://github.com/jmreidy/grunt-browserify
module.exports = {
	dist: {
		files: {
			//'dist/assets/js/bundle.js': ['js/**/*.js']
			'.tmp/browserify/bundle.js': ['js/index.js']
		}
	}
};