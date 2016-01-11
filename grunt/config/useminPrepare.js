module.exports = {
	html: '<%= paths.doc %>layouts/default.html',
	options: {
		dest: '<%= paths.dist %>',
		flow: {
			steps: {
				js: ['concat', 'uglify']
			}
		}
	}
};