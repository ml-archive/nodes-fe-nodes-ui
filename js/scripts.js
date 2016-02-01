jQuery(document).ready(function($) {

	/**
	 * Datetime picker
	 */
	$('.date-picker').datetimepickerWrapper();

	/**
	 * File picker
	 */
	$('.file-picker').filePicker();

	$('[data-dropdown]').each(function(i, el) {
		initDrop($(this));
	});

	function evalDataOptions(str) {
		try {
			return eval( '(' + str + ')' )
		} catch(e) {
			throw e;
		}

	}

	function initDrop(el) {

		var $el = $(el);

		var $dropdownContent = $(el).parent().find('.dropdown-menu');

		var opts = evalDataOptions($el.data('options'));

		opts.target = $el[0];
		opts.content = $dropdownContent[0];

		new Drop(opts);

	}

	var BREAKPOINTS = {
		xs: 480,
		sm: 768,
		md: 992,
		lg: 1200,
		xl: 1440,
		xxl: 1920
	};

	$(window).smartresize(function() {
		var winWidth = window.innerWidth;

		if(winWidth > BREAKPOINTS.sm - 1) {
			$('.core-layout').removeClass('core-layout--left-open');
			$('.core-layout__sidebar-wrapper').removeAttr('style');
			$('.core-layout__sidebar').removeAttr('style');
		}

	});
	$('.core__left-sidebar-toggle').on('click', function() {

		var LEFT_MENU_OPEN_CLASS = 'core-layout--left-open';

		var $coreLayout = $('.core-layout');
		var $sidebar = $('.core-layout__sidebar-wrapper');
		var $content = $('.core-layout__sidebar');

		var isSidebarVisible = $coreLayout.hasClass('core-layout--left-open');

		isSidebarVisible ? _animateOut() : _animateIn();

		function _animateIn() {
			$sidebar.velocity('fadeIn');
			//$sidebar.velocity({
			//	opacity: 1
			//}, {
			//	duration: 200,
			//	display: 'block',
			//	complete: function() {
			//		console.log('done');
			//	//	$coreLayout.addClass(LEFT_MENU_OPEN_CLASS);
			//	//	$sidebar.on('click', function(e) {
			//	//		if(e.target.className !== 'core-layout__sidebar-wrapper') {
			//	//			return;
			//	//		}
			//	//		_animateOut();
			//	//	});
			//	}
			//});

			//$content.velocity({
			//	translateX: '0%'
			//}, {
			//	duration: 200,
			//	delay: 200
			//});
		}

		function _animateOut() {
			$sidebar.velocity({
				opacity: 0
			}, {
				duration: 200,
				display: 'none',
				complete: function() {
					$coreLayout.removeClass(LEFT_MENU_OPEN_CLASS);
				}
			});

			$content.velocity({
				translateX: '-100%'
			}, {
				duration: 200,
				delay: 100
			});
		}

	});


	// Configure Chart.js globals
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.maintainAspectRatio = false;

	// Initialize Floating Labels on forms
	Nodes.floatingLabels();

	// Viewport resize event
	$(window).resize(function() {
		$('.nodes-center').each(function() {
			Nodes.centerInViewport($(this));
		});
	}).resize();

	// Add "roll effect" to links
	$('a.nodes-link').each(function() {
		Nodes.linkEffect($(this));
	});

	// Tooltips
	$('[data-toggle="tooltip"]').tooltip();
	$('[data-tooltip="true"]').tooltip();

	// Popover
	$('[data-popover="true"]').each(function() {
		var trigger = $(this).data('trigger');
		$(this).popover({
			trigger: trigger ? trigger : 'click',
			html: true
		});
	});

	// Init equalheight plugin
	//rightHeight.init();

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
	})

	// Confirm dialog
	$('[data-confirm="true"]').each(function() {
		Nodes.confirmModal($(this));
	});

	// Confirm deletion dialog
	$('[data-delete="true"]').each(function() {
		Nodes.confirmDelete($(this));
	});

	// Slugify element
	$('input[type="text"][data-slugify],textarea[data-slugify]').on('input', function() {
		Nodes.slugifyElement($(this));
	});

	// WYSIWYG
	$('[data-wysiwyg="true"]').each(function() {
		Nodes.wysiwyg($(this));
	});

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

	/**
	 * Session-based "Alerts" / "Toasts"
	 *
	 * These alerts are inserted into the DOM from Laravel, and not inserted by JS. Still deserves some animation love.
	 * We animate them in, and fade them out again after Nodes.alerts.autoCloseDelay seconds...
	 */
	if($('.alert.to-be-animated-in').length > 0) {

		$('.alert.to-be-animated-in').each(function(i) {


			if(i > 0) {
				Nodes.alerts.animateIn($(this), 100*i, true);
			} else {
				Nodes.alerts.animateIn($(this), 0, true);
			}

		});

		setTimeout(function() {
			$( $('.alert:not(.to-be-animated-in)').get().reverse() ).each(function(i) {

				if(i > 0) {
					Nodes.alerts.animateOut($(this), 100*i, true);
				} else {
					Nodes.alerts.animateOut($(this), 0, true);
				}
			})
		}, Nodes.alerts.autoCloseDelay);
	}
});

(function($,sr){

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			};

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	}
	// smartresize
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
