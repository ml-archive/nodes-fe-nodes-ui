var Nodes = (function() {
	return {
		/**
		 * Centers an element in the middle of the view port
		 * @author  Morten Rugaard
		 * @param   element
		 * @returns void
		 */
		centerInViewport: function(element) {
			// Viewport dimensions
			var viewportWidth = $(window).width();
			var viewportHeight = $(window).height();

			// Element dimensions
			var elementWidth = element.outerWidth();
			var elementHeight = element.outerHeight();

			// Set new position for element
			element.css({
				top: ((viewportHeight - elementHeight) / 2),
				left: ((viewportWidth - elementWidth) / 2),
				position: 'relative'
			}).show();
		},

		/**
		 * Add "roll effect" to links on hover
		 * @author  Morten Rugaard
		 * @param   element
		 * @returns void
		 */
		linkEffect: function(element) {
			var linkText = element.text();
			element.html($('<span/>').data('hover', linkText).html(element.html()));
		},

		/**
		 * Select all checkboxes/radios
		 * @author  Morten Rugaard
		 * @param   element
		 * @returns void
		 */
		selectAll: function(element) {
			// Target group
			var target = element.data('target');

			// Target items
			var items = $(target).find('input[type="checkbox"],input[type="radio"]');

			// Attach click event to element
			element.click(function() {
				// Make sure our element is an input with type of either 'checkbox' or 'radio'
				// and make sure the element also have a target before continuing
				if (!element.is('input') || (element.attr('type') != 'checkbox' && element.attr('type') != 'radio') || !target) {
					return;
				}

				// Select/Deselect checkboxes or radios
				if (element.is(':checked')) {
					items.each(function() {
						$(this).prop('checked', true);
						if ($(this).attr('type') == 'radio') {
							$(this).parents('.radio').find('label').addClass('selected');
						} else {
							$(this).parents('.checkbox').find('label').addClass('selected');
						}
					});
				} else {
					items.each(function() {
						$(this).prop('checked', false);
						if ($(this).attr('type') == 'radio') {
							$(this).parents('.radio').find('label').removeClass('selected');
						} else {
							$(this).parents('.checkbox').find('label').removeClass('selected');
						}
					});
				}
			});

			// If all items in target container is checked
			// we should also mark the "trigger" as checked
			var totalChecked = $(target).find('input[type="checkbox"]:checked,input[type="radio"]:checked').length;
			if (totalChecked > 0 && totalChecked == items.length) {
				$(element).prop('checked', true).parent().find('label').addClass('selected');
			}
		},

		/**
		 * Generic confirm modal
		 * @author  Morten Rugaard
		 * @param   element
		 * @returns void
		 */
		confirmModal: function(element)
		{
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
		},

		/**
		 * Confirm delete modal
		 * @author  Morten Rugaard
		 * @param   element
		 * @returns void
		 */
		confirmDelete: function(element) {
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
		},

		slugifyElement: function(element) {
			// Slugify target "window"
			var target = $(element).data('slugify');
			if (!target) {
				return;
			}

			// Slugify value of element
			var slug = this.slugify($(element).val());

			// Update preview and value with slug
			if (slug) {
				$(target).find('.slugify-value').val(slug).end()
					.find('.slugify-preview').text(slug);
			} else {
				$(target).find('.slugify.value').val('').end()
					.find('.slugify-preview').text('N/A');
			}
		},

		slugify: function(text) {
			return text.toString().toLowerCase()
				.replace(/\s+/g, '-')       // Replace spaces with -
				.replace(/[^\w\-]+/g, '')   // Remove all non-word chars
				.replace(/\-\-+/g, '-')     // Replace multiple - with single -
				.replace(/^-+/, '')         // Trim - from start of text
				.replace(/-+$/, '');        // Trim - from end of text
		},

		capabilityToggleSlug: function(element) {
			element.click(function(e) {
				// Get all capabilities list
				var capabilities = $('.capabilities-list').find('.checkbox');

				// Determine action depending on state of checkbox
				if ($(this).is(':checked')) {
					capabilities.each(function() {
						// Update capability text
						var capabilitySlug = $(this).data('capability-slug');
						$(this).find('label').text(capabilitySlug);

						// Add selected state
						$(element).parent().find('label').addClass('selected');
					});
				} else {
					capabilities.each(function() {
						// Update capability text
						var capabilityTitle = $(this).data('capability-title');
						$(this).find('label').text(capabilityTitle);

						// Remove selected state
						$(element).parent().find('label').removeClass('selected');
					});
				}
			});
		},

		wysiwyg: function(element) {
			CKEDITOR.replace(element.attr('id'));
		},

		// Set default configuration for all Chart.js charts
		defaultChartJsLineColors: {
			primary: {
				fillColor: 'rgba(118,245,168,1)',
				strokeColor: 'rgba(55,239,129,1)',
				pointColor: 'rgba(19,206,94,1)',
				pointStrokeColor: 'rgba(19,206,94,1)',
				pointHighlightFill: 'rgba(0,146,58,1)',
				pointHighlightStroke: 'rgba(0,146,58,1)'
			},
			secondary: {
				fillColor: 'rgba(99,135,150,1)',
				strokeColor: 'rgba(43,68,84,1)',
				pointColor: 'rgba(18,34,47,1)',
				pointStrokeColor: 'rgba(18,34,47,1)',
				pointHighlightFill: 'rgba(18,16,22,1)',
				pointHighlightStroke: 'rgba(18,16,22,1)'
			}
		},

		floatingLabels: function() {

			// Class naming variables
			var elementIdentifier = '.form-group.floating-label';
			var valueModifier = 'floating-label--value';
			var focusModifier = 'floating-label--focus';

			// Init "Plugin"
			_init();

			// Bind Events
			$('body').on('input propertychange', elementIdentifier, _toggleClass)
				.on('focus', elementIdentifier, _addClass)
				.on('blur', elementIdentifier, _removeClass);

			/**
			 * Toggles the Value Modifier class based on wether or not the target of the event
			 * has a .value.
			 * @param e {Event}
			 * @private
			 */
			function _toggleClass(e) {
				$(this).toggleClass(valueModifier, !!$(e.target).val());
			}

			/**
			 * Adds the Focus Modifier class to target of the event
			 * @param e {Event}
			 * @private
			 */
			function _addClass(e) {
				$(this).addClass(focusModifier);
			}

			/**
			 * Removes the Focus Modifier class to target of the event
			 * @param e {Event}
			 * @private
			 */
			function _removeClass(e) {
				$(this).removeClass(focusModifier);
			}

			/**
			 * Checks all .floating-label inputs for a value, and adds the appropriate Value Modifier class
			 * where applicable
			 * @private
			 */
			function _init() {
				$('.form-group.floating-label').each(function() {
					var el = $(this);
					var input = $(this).find('input')[0];

					if(input.value.length > 0) {
						el.addClass(valueModifier);
					}
				});
			}

		},

		alerts: {
			autoCloseDelay: 8000,
			activeAlerts: [],
			animateIn: function(element, staggerDelay) {

				$(element).delay(staggerDelay || 0).queue(function() {
					$(element).removeClass('to-be-animated-in').dequeue();
				});

				Nodes.alerts.activeAlerts.push($(element));
			},
			animateOut: function(element, staggerDelay) {
				$(element).delay(staggerDelay || 0).queue(function() {
					$(element).addClass('to-be-animated-out').dequeue();
				});
				$(element).one('transitionend webkitTransitionEnd oTransitionEnd', function() {
					$(this).remove();
				});
			}
		},
	};
})();
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
			$sidebar.velocity({
				opacity: 1
			}, {
				duration: 200,
				display: 'block',
				complete: function() {
					$coreLayout.addClass(LEFT_MENU_OPEN_CLASS);
					$sidebar.on('click', function(e) {
						if(e.target.className !== 'core-layout__sidebar-wrapper') {
							return;
						}
						_animateOut();
					});
				}
			});

			$content.velocity({
				translateX: '0%'
			}, {
				duration: 200,
				delay: 200
			});
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
