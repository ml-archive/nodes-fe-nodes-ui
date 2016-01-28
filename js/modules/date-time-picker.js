/*
 Settings (data-*):
 - options
 - toggle

 On init:
 - Configure and initialize datetimepicker plugin <https://eonasdan.github.io/bootstrap-datetimepicker>

 Helper Methods (Private):
 - Eval data-options

 */

/*!
 * ...
 * Author: Alexander Hafstad <alhl@nodes.dk>
 */
$(function() {
	$('.date-picker').datetimepickerWrapper();
});

var datetimepickerWrapper = {
	init: function( options, elem ) {
		// Save the element reference, both as a jQuery
		// reference and a normal reference
		this.elem  = elem;
		this.$elem = $(elem);

		// Mix in the passed-in options with the default options
		this.options = $.extend( {}, this.options, options );

		// Set format depending on data-toggle
		this.toggle = this.$elem.data('toggle');

		if(this.toggle === 'date') {
			this.options.format = 'YYYY-MM-DD';
		} else if(this.toggle === 'time') {
			this.options.format = 'HH:mm';
		}

		// Mix in the data-options with the options
		this.options = $.extend( {}, this.options, _evalDataOptions( this.$elem.data('options') ) );

		// Initialize datetimepicker plugin
		this.$elem.datetimepicker(this.options);

		// return this so that we can chain and use the bridge with less code.
		return this;
	},
	options: {
		format: 'YYYY-MM-DD HH:mm',
		calendarWeeks: false,
		allowInputToggle: true,
		icons: {
			time: 'fa fa-clock-o',
			date: 'fa fa-calendar',
			up: 'fa fa-arrow-up',
			down: 'fa fa-arrow-down',
			previous: 'fa fa-arrow-left',
			next: 'fa fa-arrow-right',
			today: 'fa fa-calendar-times-o',
			clear: 'fa fa-trash',
			close: 'fa fa-times'
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
$.plugin('datetimepickerWrapper', datetimepickerWrapper);