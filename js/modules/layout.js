var BREAKPOINTS = require('../utils/breakpoints');

$(function() {

	$(window).smartresize(function() {
		var winWidth = window.innerWidth;

		if(winWidth > BREAKPOINTS.sm - 1) {
			$('.core-layout').removeClass('core-layout--left-open');
			$('.core-layout__sidebar-wrapper').removeAttr('style');
			$('.core-layout__sidebar').removeAttr('style');
		}

	});

	// Viewport resize event
	$(window).resize(function() {
		$('.nodes-center').each(function() {
			Nodes.centerInViewport($(this));
		});
	}).resize();
});