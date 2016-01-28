$(function() {
	$('[data-dropdown]').each(function(i, el) {
		initDrop($(this));
	});

	function initDrop(el) {

		var $el = $(el);

		var $dropdownContent = $(el).parent().find('.dropdown-menu');

		var opts = evalDataOptions($el.data('options'));

		opts.target = $el[0];
		opts.content = $dropdownContent[0];

		new Drop(opts);

	}
});