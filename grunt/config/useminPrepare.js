var path = require('path');

module.exports = {
	html: '<%= paths.doc %>includes/scripts.html',
	options: {
		dest: '<%= paths.dist %>',
		flow: {
			steps: {
				js: ['concat', 'uglify']
			}
		}
	}
};