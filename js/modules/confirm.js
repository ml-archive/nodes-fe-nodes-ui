$(function() {

	// Confirm dialog
	$('[data-confirm="true"]').each(function() {
		Nodes.confirmModal($(this));
	});

	// Confirm deletion dialog
	$('[data-delete="true"]').each(function() {
		Nodes.confirmDelete($(this));
	});
});