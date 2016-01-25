module.exports = {
	html: '<%= paths.doc %>includes/footer.html',
	options: {
		dest: '<%= paths.dist %>',
		flow: {
			steps: {
				js: ['concat', 'uglify']
			}
		}
	}
};