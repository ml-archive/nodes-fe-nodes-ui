var BREAKPOINTS = require('../config/breakpoints');

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
			centerInViewport($(this));
		});
	}).resize();
});

/**
 * Centers an element in the middle of the view port
 * @author  Morten Rugaard
 * @param   element
 * @returns void
 */
function centerInViewport(element) {
	// Viewport dimensions
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();

	// Element dimensions
	var elementWidth = element.outerWidth();
	var elementHeight = element.outerHeight();

	// Set new position for element
	element.css({
		top: ((viewportHeight - elementHeight) / 2),
		left: ((viewportWidth - elementWidth) / 2),
		position: 'relative'
	}).show();
}