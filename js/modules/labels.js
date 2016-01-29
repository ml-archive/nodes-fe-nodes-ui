$(function() {
	// Initialize Floating Labels on forms
	floatingLabels();
});

function floatingLabels() {

	// Class naming variables
	var elementIdentifier = '.form-group.floating-label';
	var valueModifier = 'floating-label--value';
	var focusModifier = 'floating-label--focus';

	// Init "Plugin"
	_init();

	// Bind Events
	$('body').on('input propertychange', elementIdentifier, _toggleClass)
		.on('focus', elementIdentifier, _addClass)
		.on('blur', elementIdentifier, _removeClass);

	/**
	 * Toggles the Value Modifier class based on wether or not the target of the event
	 * has a .value.
	 * @param e {Event}
	 * @private
	 */
	function _toggleClass(e) {
		$(this).toggleClass(valueModifier, !!$(e.target).val());
	}

	/**
	 * Adds the Focus Modifier class to target of the event
	 * @param e {Event}
	 * @private
	 */
	function _addClass(e) {
		$(this).addClass(focusModifier);
	}

	/**
	 * Removes the Focus Modifier class to target of the event
	 * @param e {Event}
	 * @private
	 */
	function _removeClass(e) {
		$(this).removeClass(focusModifier);
	}

	/**
	 * Checks all .floating-label inputs for a value, and adds the appropriate Value Modifier class
	 * where applicable
	 * @private
	 */
	function _init() {
		$('.form-group.floating-label').each(function() {
			var el = $(this);
			var input = $(this).find('input')[0];

			if(input.value.length > 0) {
				el.addClass(valueModifier);
			}
		});
	}

}