$(function() {

	/**
	 * Toggles .selected class for label of [type="radio"] and [type="checkbox"]
	 * @author Alexander H. <alhl@nodes.dk>
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
		selectAll($(this));
	});
});

/**
 * Select all checkboxes/radios
 * @author  Morten Rugaard
 * @param   element
 * @returns void
 */
function selectAll(element) {
	// Target group
	var target = element.data('target');

	// Target items
	var items = $(target).find('input[type="checkbox"],input[type="radio"]');

	// Attach click event to element
	element.click(function() {
		// Make sure our element is an input with type of either 'checkbox' or 'radio'
		// and make sure the element also have a target before continuing
		if (!element.is('input') || (element.attr('type') != 'checkbox' && element.attr('type') != 'radio') || !target) {
			return;
		}

		// Select/Deselect checkboxes or radios
		if (element.is(':checked')) {
			items.each(function() {
				$(this).prop('checked', true);
				if ($(this).attr('type') == 'radio') {
					$(this).parents('.radio').find('label').addClass('selected');
				} else {
					$(this).parents('.checkbox').find('label').addClass('selected');
				}
			});
		} else {
			items.each(function() {
				$(this).prop('checked', false);
				if ($(this).attr('type') == 'radio') {
					$(this).parents('.radio').find('label').removeClass('selected');
				} else {
					$(this).parents('.checkbox').find('label').removeClass('selected');
				}
			});
		}
	});

	// If all items in target container is checked
	// we should also mark the "trigger" as checked
	var totalChecked = $(target).find('input[type="checkbox"]:checked,input[type="radio"]:checked').length;
	if (totalChecked > 0 && totalChecked == items.length) {
		$(element).prop('checked', true).parent().find('label').addClass('selected');
	}
}