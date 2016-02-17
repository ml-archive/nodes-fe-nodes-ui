var options = {
	stage: 'render:post:page'
};

var cheerio = require('cheerio');

module.exports = function(params, callback) {
	'use strict';

	var id = '#toc';
	var cssClasses = {
		ul: 'nav docs--toc',
		li: 'docs--toc__item',
		a: 'docs--toc__link'
	};

	var cheerioOptions = {
		decodeEntities: false
	};

	var $ = cheerio.load(params.content, cheerioOptions);
	var $toc = cheerio.load('<ul id="toc-list" class="' + cssClasses.ul + '"></ul>', cheerioOptions);

	var $headings = $('h2[id], h3[id], h4[id], h5[id], h6[id]');
	var $topOfPage = $('h1[id]');
	var topOfPageHref = $topOfPage.attr('id');

	var githubBaseLink = 'https://github.com/nodes-frontend/nodes-ui/edit/master/doc/pages/';

	$headings.map(function(i, el) {
		var text = $(el).text().trim();
		var link = $(el).attr('id');
		var depth = parseInt(el.name.replace(/h/gi, ''), 10);
		var arr = new Array(depth - 1);
		var level = arr.join('<li class="' + cssClasses.li + '"><ul>') + '<li class="' + cssClasses.li + '"><a class="' + cssClasses.a + '" href="#' + link + '">' + text + '</a></li>' + arr.join('</ul></li>');
		$toc('#toc-list').append(level);
	});

	$toc('#toc-list').append('<li class="docs--toc__divider"></li>');

	if(params.page.data.github) {
		var githubPageLink = githubBaseLink + params.page.data.github;
		$toc('#toc-list').append('<li class="docs--toc__github ' + cssClasses.li + '"><a class="' + cssClasses.a + '" href="' + githubPageLink + '" target="_blank">Edit this page</a></li>');
	}

	$toc('#toc-list').append('<li class="' + cssClasses.li + '"><a class="' + cssClasses.a + '" href="#' + topOfPageHref + '">Back to top</a></li>');

	$(id).append($toc.html());

	params.content = $.html();

	callback();
};

module.exports.options = options;