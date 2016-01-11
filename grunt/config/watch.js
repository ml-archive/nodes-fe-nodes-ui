// https://github.com/gruntjs/grunt-contrib-watch
module.exports = {
	grunt: {
		files: ['Gruntfile.js']
	},
	sass: {
		files: ['<%= paths.scss %>**/*.scss', '<%= paths.doc %>assets/**/*.scss'],
		tasks: ['sass', 'postcss'],
		options: {
			livereload: true
		}
	},
	js: {
		files: ['<%= paths.js %>**/*.js', '<%= paths.doc %>assets/js/**/*.js'],
		tasks: ['build'],
		options: {
			livereload: true
		}
	},
	assemble_all: {
		files: ['<%= paths.doc %>{includes,layouts}/**/*.html'],
		tasks: ['build'],
		options: {
			livereload: true
		}
	},
	assemble_pages: {
		files: ['<%= paths.doc %>pages/**/*.html'],
		tasks: ['build'],
		options: {
			livereload: true
		}
	},
	assets: {
		options: {
			cwd: '<%= paths.doc %>assets/',
			livereload: true
		},
		files: ['**/*', '!{scss,js}/**/*'],
		tasks: ['copy']
	},
};