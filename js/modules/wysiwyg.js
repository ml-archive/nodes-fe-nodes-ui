$(function() {
	// WYSIWYG
	$('[data-wysiwyg="true"]').each(function() {
		Nodes.wysiwyg($(this));
	});
});