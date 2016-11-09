// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {
	"use strict";
	/*
	 * ...
	 * Author: Dennis Haulund Nielsen <dhni@nodes.dk>
	 */
	var rangeSliderWrapper = {
		init: function( options, elem ) {
			// Save the element reference, both as a jQuery
			// reference and a normal reference
			this.elem  = elem;
			this.$elem = $(elem);
			
			var $elem = this.$elem;
			
			this.$input = this.$elem.parent().find('input[type="range"]');
			var $input = this.$input;
				
			// Mix in the passed-in options with the default options
			this.options = $.extend( {}, this.options, options );

			// Mix in the data-options with the options
			this.options = $.extend( {}, this.options, _evalDataOptions( this.$elem.data('options') ) );

			// Parse
			this.options.start = parseFloat(this.$input.val());
			this.options.range.min = parseFloat(this.$input.attr('min'));
			this.options.range.max = parseFloat(this.$input.attr('max'));
			this.options.step = parseFloat(this.$input.attr('step'));
			
			// Hide the "actual" input
			this.$input.hide();
			
			// Initialize the noUi slider
			noUiSlider.create(this.$elem[0], this.options);
			
			// Bind the change event to update the hidden input (so we can read it and post it)
			this.$elem[0].noUiSlider.on('change', function() {
				$input.val($elem[0].noUiSlider.get());
			});
			
			// Disable the noUi slider if the original range input is disabled
			if(this.$input.attr('disabled')) {
				this.$elem[0].setAttribute('disabled', true);
			}
			
			// return this so that we can chain and use the bridge with less code.
			return this;

		},
		options: {
			tooltips: true,
			step: 1,
			start: [],
			range: {
				'min': [],
				'max': []
			}
		}
	};

	/*
	 Helper Methods
	 */
	function _evalDataOptions(options) {
		options = eval('(' + options + ')');
		return options;
	}

	// Object.create support test, and fallback for browsers without it
	if ( typeof Object.create !== "function" ) {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}

	// Create a plugin based on a defined object
	$.plugin = function( name, object ) {
		$.fn[name] = function( options ) {
			return this.each(function() {
				if ( ! $.data( this, name ) ) {
					$.data( this, name, Object.create(object).init(
						options, this ) );
				}
			});
		};
	};

	// Register the plugin
	$.plugin('rangeSlider', rangeSliderWrapper);

})( jQuery, window, document );