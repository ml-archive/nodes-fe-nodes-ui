$(function() {
	// Highlight selected radio-/checkboxes
	$('.checkbox,.radio').each(function() {
		$(this).find(':radio,:checkbox').click(function() {
			if ($(this).is(':checked')) {
				if ($(this).attr('type') == 'radio') {
					$(this).parents('.radio').find('label').addClass('selected')
				} else {
					$(this).parents('.checkbox').find('label').addClass('selected');
				}
			} else {
				if ($(this).attr('type') == 'radio') {
					$(this).parents('.radio').find('label').removeClass('selected')
				} else {
					$(this).parents('.checkbox').find('label').removeClass('selected');
				}
			}
		})
	});

	// Select all checkbox/radio buttons
	$('.nodes-select-all[data-target]').each(function() {
		Nodes.selectAll($(this));
	});
});