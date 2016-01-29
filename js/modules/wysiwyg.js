$(function() {
	// WYSIWYG
	$('[data-wysiwyg="true"]').each(function() {
		CKEDITOR.replace($(this).attr('id'));
	});
});