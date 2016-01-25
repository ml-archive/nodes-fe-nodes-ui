/*
 Events:

 Methods:

 Super Methods (should call above based on if/elses):

 Settings (data-*):

 On init:

 Helper Methods (Private):

 */

/*!
 * ...
 * Author: Alexander Hafstad <alhl@nodes.dk>
 */

// myObject - an object representing a concept that you want
// to model (e.g. a car)
var datetimepickerWrapper = {
	init: function( options, elem ) {
		// Save the element reference, both as a jQuery
		// reference and a normal reference
		this.elem  = elem;
		this.$elem = $(elem);

		// Mix in the passed-in options with the default options
		this.options = $.extend( {}, this.options, options );
		// Mix in the data-options with the options
		this.options = $.extend( {}, this.options, _evalDataOptions( this.$elem.data('options') ) );


		this.$elem.datetimepicker(this.options);


		console.log('Datetime picker wrapper', this.options);

		// return this so that we can chain and use the bridge with less code.
		return this;
	},
	options: {
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
 Event Methods
 */


/*
 Primary Methods
 */


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

// Usage:
// With myObject, we could now essentially do this:
// $.plugin('myobj', myObject);

// and at this point we could do the following
// $('#elem').myobj({name: "John"});
// var inst = $('#elem').data('myobj');
// inst.myMethod('I am a method');