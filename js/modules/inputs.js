$(function() {

	/**
	 * Toggles .selected class for label of [type="radio"] and [type="checkbox"]
	 */
	$(this).find(':radio,:checkbox').each(function() {
		"use strict";

		var $elm	= $(this),
			type 	= $elm.attr('type'),
			label   = $elm.parents('.' + type).find('label');

		toggleSelectedClassOnLabel();

		$elm.on('click', toggleSelectedClassOnLabel);

		function toggleSelectedClassOnLabel() {

			if( $elm.is(':checked') ) {
				label.addClass('selected');
			} else {
				label.removeClass('selected');
			}
		}
	});

	// Select all checkbox/radio buttons
	$('.nodes-select-all[data-target]').each(function() {
		Nodes.selectAll($(this));
	});
});