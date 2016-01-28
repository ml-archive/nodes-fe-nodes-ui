$(function() {
	//----------------------------------------------------------------
	// Roles
	//----------------------------------------------------------------
	$('#roleModal').each(function() {
		// Role modal
		var modal = $(this).modal({
			'show': false
		});

		// Default form values
		var modalDefaults = {
			'title': modal.find('.modal-title').text(),
			'action': modal.find('form').attr('action'),
			'button': modal.find('form [type="submit"]').text()
		};

		// Attach modal events
		modal.on('show.bs.modal', function(e) {
			// Event trigger
			var trigger = $(e.relatedTarget);

			// Only continue if the button clicked
			// is our 'edit role' button
			if (!trigger.hasClass('role-edit')) {
				return;
			}

			// Pre-fill form with role name
			$(this).find('.modal-title').text('Edit role').end()
				.find('form').attr('action', trigger.data('href'))
				.prepend($('<input/>', {
					'name': '_method',
					'type': 'hidden',
					'class': 'role-edit',
					'value': 'PATCH'
				}), $('<input/>', {
					'name': 'id',
					'type': 'hidden',
					'class': 'role-edit',
					'value': trigger.data('role-id')
				})).end()
				.find('#roleName').val(trigger.data('role')).end()
				.find('[type="submit"]').text('Edit role');
		}).on('hidden.bs.modal', function(e) {
			// Reset form to initial state
			$(this).find('.modal-title').text(modalDefaults.title).end()
				.find('form').attr('action', modalDefaults.action)
				.find('.role-edit').remove().end()
				.find('#roleName').val('').end()
				.find('[type="submit"]').text(modalDefaults.button);
		});
	});
});