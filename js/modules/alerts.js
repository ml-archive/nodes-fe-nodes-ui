$(function() {
	/**
	 * Session-based "Alerts" / "Toasts"
	 *
	 * These alerts are inserted into the DOM from Laravel, and not inserted by JS. Still deserves some animation love.
	 * We animate them in, and fade them out again after Nodes.alerts.autoCloseDelay seconds...
	 */
	if($('.alert.to-be-animated-in').length > 0) {

		$('.alert.to-be-animated-in').each(function(i) {


			if(i > 0) {
				Nodes.alerts.animateIn($(this), 100*i, true);
			} else {
				Nodes.alerts.animateIn($(this), 0, true);
			}

		});

		setTimeout(function() {
			$( $('.alert:not(.to-be-animated-in)').get().reverse() ).each(function(i) {

				if(i > 0) {
					Nodes.alerts.animateOut($(this), 100*i, true);
				} else {
					Nodes.alerts.animateOut($(this), 0, true);
				}
			})
		}, Nodes.alerts.autoCloseDelay);
	}
});