$(function() {
	// Add "roll effect" to links
	$('a.nodes-link').each(function() {
		var elm 		= $(this),
			linkText 	= elm.text(),
			hoverElm	= $('<span/>').data('hover', linkText).html( elm.html() );
		elm.html(hoverElm);
	});
});