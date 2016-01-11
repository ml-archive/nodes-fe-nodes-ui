module.exports.repeater = function(n, block) {
	var accum = '';
	for(var i = 0; i < n; i++) {
		accum += block.fn(i);
	}
	return accum;
};