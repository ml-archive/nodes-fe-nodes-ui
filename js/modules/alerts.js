var config 			= require('../config/alerts'),
	activeAlerts 	= [];

$(function() {
	init();
});

/**
 * Session-based "Alerts" / "Toasts"
 *
 * These alerts are inserted into the DOM from Laravel, and not inserted by JS. Still deserves some animation love.
 * We animate them in, and fade them out again after config.autoCloseDelay seconds...
 */
function init() {
	$('.alert.to-be-animated-in').each(function(i) {

		if(i > 0) {
			animateIn($(this), 100*i, true);
		} else {
			animateIn($(this), 0, true);
		}
	});

	setTimeout(function() {
		$( $('.alert:not(.to-be-animated-in)').get().reverse() ).each(function(i) {

			if(i > 0) {
				animateOut($(this), 100*i, true);
			} else {
				animateOut($(this), 0, true);
			}
		})
	}, config.autoCloseDelay);
}

function animateIn(element, staggerDelay) {

	$(element).delay(staggerDelay || 0).queue(function() {
		$(element).removeClass('to-be-animated-in').dequeue();
	});

	activeAlerts.push($(element));
}

function animateOut(element, staggerDelay) {
	$(element).delay(staggerDelay || 0).queue(function() {
		$(element).addClass('to-be-animated-out').dequeue();
	});
	$(element).one('transitionend webkitTransitionEnd oTransitionEnd', function() {
		$(this).remove();
	});
}