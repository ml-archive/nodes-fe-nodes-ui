/*!
 * ...
 * Author: Alexander Hafstad <alhl@nodes.dk>
 */
var _evalDataOptions = require('../utils/eval-data-options');

$(function() {
	var selectors = [
		'input[type="text"][data-slugify]',
		'input[type="text"][data-toggle="slugify"]',
		'textarea[data-slugify]',
		'textarea[data-toggle="slugify"'
	];

	$( selectors.join(',') ).slugify();
});

var slugify = {
	init: function( options, elem ) {
		// Save the element reference, both as a jQuery
		// reference and a normal reference
		this.elem  = elem;
		this.$elem = $(elem);

		console.log(this.elem, this.$elem);

		// Mix in the passed-in options with the default options
		this.options = $.extend( {}, this.options, options );

		// Mix in the data-options with the options
		this.options = $.extend( {}, this.options, _evalDataOptions( this.$elem.data('options') ) );

		// Set target
		this.$target = $(this.options.target) || $( this.$elem.data('slugify') );
		if(this.$target.length === 0) console.log('Oops! Something went wrong... please specify a target for', this.$elem);

		// Set slug on input
		this.$elem.on('input', function() {
			this.setSlug();
		}.bind(this));

		// return this so that we can chain and use the bridge with less code.
		return this;
	},
	setSlug: function() {
		// Get slug
		this.slug = getSlug( this.$elem.val() );

		// Update preview and value with slug
		if(this.slug) {
			this.$target
				.find('.slugify-value').val(this.slug).end()
				.find('.slugify-preview').text(this.slug);
		} else {
			this.$target
				.find('.slugify.value').val('').end()
				.find('.slugify-preview').text('N/A');
		}
	},
	options: {}
};

/*
 Helper Methods
 */
function getSlug(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')       // Replace spaces with -
		.replace(/[^\w\-]+/g, '')   // Remove all non-word chars
		.replace(/\-\-+/g, '-')     // Replace multiple - with single -
		.replace(/^-+/, '')         // Trim - from start of text
		.replace(/-+$/, '');        // Trim - from end of text
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
$.plugin('slugify', slugify);