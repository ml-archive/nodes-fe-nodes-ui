$(function() {
	//----------------------------------------------------------------
	// Capabilities
	//----------------------------------------------------------------
	$('#rolesCapabilitiesCapabilityModal').each(function() {
		var group = $(this).find('#capabilityGroup');
		var capabilityName = $(this).find('#capabilityName');
		var capabilitySlug = $(this).find('#capabilitySlug');
		var capabilitySlugPreview = $(this).find('#capabilitySlugPreview');

		// Create re-usable callback
		var updateCapabilitySlug = function(value) {
			// Slugify capability name
			var capabilityName = Nodes.slugify(value);

			// Prepend selected group slug (if one is selected)
			var groupSlug = group.find('option:selected').data('slug');
			if (groupSlug) {
				capabilityName = groupSlug + '_' + capabilityName;
			}

			// Set generated capability slug
			if (capabilityName) {
				capabilitySlug.val(capabilityName);
				capabilitySlugPreview.text(capabilityName);
			} else {
				capabilitySlug.val('');
				capabilitySlugPreview.text('N/A');
			}
		};

		// Attach events to group and capability name
		capabilityName.on('input', function() {
			updateCapabilitySlug($(this).val())
		});
		group.on('change', function() {
			updateCapabilitySlug(capabilityName.val());
		})
	});

	$('.capabilities-wrapper').each(function() {
		var rolesCapabilities = $(this);
		$(this).find(':checkbox').click(function() {
			if (rolesCapabilities.find('.capabilities-list :checked').length > 0) {
				rolesCapabilities.find('button[type="submit"]').addClass('btn-danger').removeClass('disabled').prop('disabled', false).attr('aria-disabled', 'false');
			} else {
				rolesCapabilities.find('button[type="submit"]').removeClass('btn-danger').addClass('disabled').prop('disabled', true).attr('aria-disabled', 'true');
			}
		});
	});

	$('#capabilities-toggle-slug :checkbox').each(function() {
		Nodes.capabilityToggleSlug($(this));
	});
});