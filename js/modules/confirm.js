$(function() {

	// Confirm dialog
	$('[data-confirm="true"]').each(function() {
		confirmModal($(this));
	});

	// Confirm deletion dialog
	$('[data-delete="true"]').each(function() {
		confirmDelete($(this));
	});
});



/**
 * Generic confirm modal
 * @author  Morten Rugaard
 * @param   element
 * @returns void
 */
function confirmModal(element) {
	// Confirm modal title
	var modalTitle = $(element).data('confirm-title');
	modalTitle = !modalTitle ? 'Please confirm' : modalTitle;

	// Confirm modal text
	var modalText = $(element).data('confirm-text');
	modalText = !modalText ? 'Are you sure you want to do this?' : modalText;

	// Confirm modal method
	var method = $(element).data('method');
	method = !method ? 'GET' : method.toUpperCase();

	// Generate confirm modal
	var closure = function(e) {
		// Prevent default action
		e.preventDefault();

		// Build confirm modal
		bootbox.dialog({
			title: modalTitle,
			message: '<span class="fa fa-warning"></span> ' + modalText,
			className: 'nodes-confirm',
			buttons: {
				cancel: {
					label: 'Cancel',
					className: 'btn-default'
				},
				success: {
					label: 'OK',
					className: 'btn-primary',
					callback: function () {
						if ($(element).is('form')) {
							$(element).trigger('submit');
						} else if (method != 'GET') {
							// Since we're posting data, we need to add our CSRF token
							// to our form so Laravel will accept our form
							var csrfToken = $(element).data('token');
							if (!csrfToken) {
								alert('Missing CSRF token');
								console.log('Missing CSRF token');
								return;
							}

							// Generate form element
							var form = $('<form/>', {
								'method': 'POST',
								'action': $(element).attr('href')
							});

							// Add CSRF token to our form
							form.prepend(
								$('<input/>', {
									'name': '_token',
									'type': 'hidden',
									'value': csrfToken
								})
							);

							// If we're trying to submit with a "custom" method
							// we need to spoof it for Laravel
							if (method != 'POST') {
								form.prepend(
									$('<input/>', {
										'name': '_method',
										'type': 'hidden',
										'value': method
									})
								)
							}

							form.appendTo('body').submit();
						}
					}
				}
			},
			onEscape: true
		});
	};

	if ($(element).is('form')) {
		$(element).find(':submit').click(closure);
	} else {
		$(element).click(closure);
	}
}

/**
 * Confirm delete modal
 * @author  Morten Rugaard
 * @param   element
 * @returns void
 */
function confirmDelete(element) {
	// Confirm modal title
	var modalTitle = $(element).data('delete-title');
	modalTitle = !modalTitle ? 'Please confirm' : modalTitle;

	// Confirm modal text
	var modalText = $(element).data('delete-text');
	modalText = !modalText ? 'Are you sure you want to delete?' : modalText;

	var closure = function(e) {
		// Prevent default action
		e.preventDefault();

		// Generate bootbox dialog
		bootbox.dialog({
			title: modalTitle,
			message: '<span class="fa fa-warning"></span> ' + modalText,
			className: 'nodes-delete',
			buttons: {
				cancel: {
					label: 'Cancel',
					className: 'btn-default'
				},
				success: {
					label: 'Delete',
					className: 'btn-danger',
					callback: function () {
						if ($(element).is('form')) {
							$(element).trigger('submit');
						} else {
							// Since we're posting data, we need to add our CSRF token
							// to our form so Laravel will accept our form
							var csrfToken = $(element).data('token');
							if (!csrfToken) {
								alert('Missing CSRF token');
								console.log('Missing CSRF token');
								return;
							}

							// Since <form>'s can't send a DELETE request
							// we need to "spoof" it for Laravel
							$('<form/>', {
								'method': 'POST',
								'action': $(element).attr('href')
							}).prepend(
								$('<input/>', {
									'name': '_token',
									'type': 'hidden',
									'value': csrfToken
								})
							).prepend(
								$('<input/>', {
									'name': '_method',
									'type': 'hidden',
									'value': 'DELETE'
								})
							).appendTo('body').submit();
						}
					}
				}
			},
			onEscape: true
		});
	};

	if ($(element).is('form')) {
		$(element).find(':submit').click(closure);
	} else {
		$(element).click(closure);
	}
}