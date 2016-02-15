// https://github.com/assemble/assemble/
var hljs = require('highlight.js');
hljs.LANGUAGES['scss'] = require('../../lib/scss.js')(hljs);

module.exports = {
	options: {
		//marked: {
		//	highlight: function(code, lang) {
		//		if (lang === undefined) lang = 'bash';
		//		if (lang === 'html') lang = 'xml';
		//		if (lang === 'js') lang = 'javascript';
		//		return '<div class="code-container">' + hljs.highlight(lang, code).value + '</div>';
		//	}
		//}
	},
	dist: {
		options: {
			flatten: true,
			assets: '<%= paths.dist %>/assets',
			data: ['<%= paths.doc %>data/*.json'],
			helpers: ['<%= paths.doc %>helpers/*.js'],
			plugins: ['<%= paths.doc %>plugins/*.js'],
			partials: ['<%= paths.doc %>includes/**/*.{html,scss}'],
			layoutdir: '<%= paths.doc %>layouts',
			layout: 'default.html',
			site: {
				base: '<%= paths.dist %>'
			}
		},
		expand: true,
		flatten: true,
		cwd: '<%= paths.doc %>pages',
		src: '**/*.{html,md}',
		dest: '<%= paths.dist %>'
	}
};