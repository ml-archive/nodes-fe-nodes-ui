/*
	Events:
	- file-input on change (bliver også trigger af valg af fil, og af drop)
	- body on drop prevent default
	- file-picker on dropover, dropleave, drop
	- clear-button on click

	Methods:
	- get/set preview
	- get/set icon
	- get/set filename

	Super Methods (should call above based on if/elses):
	- on file update
	- on file clear

	Settings (data-*):
	- disablePreview
	- filePatterns

	On init:
	- if has preview image already, switch from "new" to "in use"

	Helper Methods (Private):
	- map file-extension to .fa icon
	- is image

*/


/*!
 * ...
 * Author: Dennis Haulund Nielsen
 */
$(function() {
	$('.file-picker').filePicker();
});

// myObject - an object representing a concept that you want
// to model (e.g. a car)
var filePicker = {
	init: function( options, elem ) {
		console.log('den nye filepicker');

		// Mix in the passed-in options with the default options
		this.options = $.extend( {}, this.options, options );

		// Save the element reference, both as a jQuery
		// reference and a normal reference
		this.elem  = elem;
		this.$elem = $(elem);

		this.$body = $('body');

		this.$fileInput = this.$elem.find('file-picker__file-input');
		this.$fileOutput = this.$elem.find('.file-picker__file-name');

		this.$previewImg = this.$elem.find('.file-picker__preview');
		this.$previewIcon = this.$elem.find('.file-picker__icon');

		this.$clearInputBtn = this.$elem.find('.file-picker__clear');


		/////// Bind events her, der
		this.$fileInput.bind('change', inputOnChange);
		this.$elem.bind('dragover', inputOnDragOver);
		this.$elem.bind('drop', inputOnDrop);

		this.$clearInputBtn.bind('click', removeFile);

		// return this so that we can chain and use the bridge with less code.
		return this;
	},
	options: {
		disablePreview: false,
		filePatterns: {
			'IMG': {
				icon: 'file-image-o',
				match: /\.(gif|jpg|jpeg|tiff|png)$/i
			},
			//'FALLBACK': 'file-o',
			//'PDF': 'file-pdf-o',
			//'VIDEO': 'file-video-o',
			//'PRESENTATION': 'file-powerpoint-o',
			//'AUDIO': 'file-audio-o',
			//'SPREADSHEET': 'file-excel-o',
			//'RICHTEXT': 'file-word-o',
			//'TEXT': 'file-text-o',
			//'ARCHIVE': 'file-archive-o',
			'CODE': {
				icon: 'file-code-o',
				match: /\.(php|js|css|html|json)$/i
			}
		}
	},
	myMethod: function( msg ){
		// You have direct access to the associated and cached
		// jQuery element
		console.log("myMethod triggered");
		// this.$elem.append('<p>'+msg+'</p>');
	}
};

/*
	Event Methods
 */
function inputOnChange(e) {

}

function bodyOnDrop(e) {

}

function inputOnDrop(e) {

}

function inputOnDragOver(e) {

}

function inputOnDragLeave(e) {

}

/*
	Primary Methods
 */
function previewImg(img) {

}

function previewIcon(iconType) {

}

function fileName(fileName) {

}

function setFile() {

}

function removeFile() {
	console.log('CLICK');
}

/*
	Helper Methods
 */
function _safeEval(obj) {

}

function _mapFileExtensionToIcon(file) {

}

function _fileIsImage(file) {

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
$.plugin('filePicker', filePicker);

// Usage:
// With myObject, we could now essentially do this:
// $.plugin('myobj', myObject);

// and at this point we could do the following
// $('#elem').myobj({name: "John"});
// var inst = $('#elem').data('myobj');
// inst.myMethod('I am a method');
