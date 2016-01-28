$(function() {
	// Add "roll effect" to links
	$('a.nodes-link').each(function() {
		Nodes.linkEffect($(this));
	});
});