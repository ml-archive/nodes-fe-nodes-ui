$(document).ready(function() {

	$('.docs--collapser').on('click', function(e) {
		$(this).toggleClass('docs--collapser--open');
	});

	// If a menu item in the sidebar is active, we open collapsibles up the tree
	if($('.docs--sidebar li.active').length > 0) {
		var $li = $('.docs--sidebar li.active');

		$li.parents('.collapse').addClass('in');
		$li.parents('.collapse').prev().addClass('docs--collapser--open');

	}

	$('.docs--code-example').each(function() {

		var $root = $(this);
		var $loader = $root.find('.docs--code-example__loader');
		var $copyToClipboardBtn = $root.find('.docs--code-example__copy-code');
		var $tabButtons = $root.find('.docs--code-example__code-blocks-navigation button');

		var exampleInput = $root.find('.docs--code-example__output')[0].innerHTML;
		var $exampleOutput = $root.find('.docs--code-example__code-block[data-lang="markup"] code');

		var $existingOutput = $root.find('.docs--code-example__code-block:not([data-lang="markup"]) code');

		if(exampleInput.length > 0 && $exampleOutput.length > 0) {

			$exampleOutput.text(exampleInput);
			$exampleOutput.prettyPre();

			hljs.highlightBlock($exampleOutput[0]);

		}

		$existingOutput.each(function() {
			hljs.highlightBlock($(this)[0]);
		});

		$tabButtons.each(function() {
			$(this).on('click', function() {
				$(this).addClass('active');
				$tabButtons.not($(this)).removeClass('active');
			})
		});

		var cp = new Clipboard($copyToClipboardBtn[0], {
			text: function() {
				return $root.find('.docs--code-example__code-block.active code').text();
			}
		});

		$root.addClass('docs--code-example--loaded');

	});

	//$('.docs--code-block').each(function() {
	//
	//	var $el = $(this);
	//	var $loader = $el.find('.docs--code-block__loader');
	//	var $copyToClipboardBtn = $el.find('.docs--copy-code-to-clipboard');
	//	var $codeBlock = $el.find('code');
	//
	//	var code = $codeBlock.text();
	//
	//	hljs.highlightBlock($codeBlock[0]);
	//
	//	var cp = new Clipboard($copyToClipboardBtn[0], {
	//		text: function() {
	//			return code;
	//		}
	//	});
	//
	//});

	var apiUsageLineData = {"data":[749,4028,1302,250,9,21,5,2,102,18,133,371,27,82,440,246,235,540,87,324,525,807,301,345,706,17,3,1591,2358,2271,3595,4141,240,234,5174,3474,3397,2813,3649,258,93,2800,4579,9158,4158,4649,486,623,2639,146],"labels":["09\/05","09\/07","09\/08","09\/09","09\/10","09\/11","09\/13","09\/14","09\/15","09\/16","09\/17","09\/18","09\/19","09\/21","09\/22","09\/23","09\/24","09\/25","09\/26","09\/27","09\/28","09\/29","09\/30","10\/01","10\/02","10\/03","10\/04","10\/05","10\/06","10\/07","10\/08","10\/09","10\/10","10\/11","10\/12","10\/13","10\/14","10\/15","10\/16","10\/17","10\/18","10\/19","10\/20","10\/21","10\/22","10\/23","10\/24","10\/25","10\/26","10\/27"]};
	var apiSplitData = [{"value":33894,"label":"translate-keys","color":"#F7464A","highlight":"#FF5A5E"},{"value":27097,"label":"content-responses","color":"#46BFBD","highlight":"#5AD3D1"},{"value":12356,"label":"app_opens"},{"value":609,"label":"translate-languages"},{"value":89,"label":"notify-messages-views"},{"value":66,"label":"feedback"},{"value":34,"label":"notify-messages"},{"value":21,"label":"notify-updates"},{"value":14,"label":"notify-rate_reminders-views"},{"value":11,"label":"notify-updates-views"},{"value":5,"label":"geographic-languages"},{"value":3,"label":"geographic-continents"},{"value":1,"label":"geographic-countries"},{"value":1,"label":"other"}];
	var appSplitData = [{"value":29705,"label":"Danica Quiz","color":"#F7464A","highlight":"#FF5A5E"},{"value":20830,"label":"NStack","color":"#46BFBD","highlight":"#5AD3D1"},{"value":12697,"label":"Akostik"},{"value":5082,"label":"Tattoodo"},{"value":3007,"label":"eBoks"},{"value":943,"label":"Alarmeringsapp"},{"value":831,"label":"Eovendo"},{"value":345,"label":"Sunday SweetSpot"},{"value":332,"label":"BrushLinks"},{"value":205,"label":"Mo2tion"},{"value":187,"label":"27"},{"value":36,"label":"3"},{"value":1,"label":"20"}];

	var demoChartsData = {
		Line: {
			labels: apiUsageLineData.labels,
			datasets: [
				{
					label: "My First dataset",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: apiUsageLineData.data
				}
			]
		},
		Pie: {
			a: apiSplitData,
			b: appSplitData
		}
	};
	var demoChartsGlobalOptions = {
		responsive: true
	};

	var demoCharts = [];

	$('[data-demo-chart]').each(function() {
		var _ctx = $(this)[0].getContext('2d');
		var _type = $(this).data('demo-chart');
		var _child = $(this).data('demo-chart-child') || false;
		console.log(_ctx, _type, _child);
		_initChart(_ctx,_type, _child);
	});

	function _initChart(ctx, type, child) {

		if(child) {

			demoCharts.push(
				new Chart(ctx)[type](demoChartsData[type][child], demoChartsGlobalOptions)
			);

		} else {

			demoCharts.push(
				new Chart(ctx)[type](demoChartsData[type], demoChartsGlobalOptions)
			);

		}
	}

});

(function( $ ) {
	$.fn.prettyPre = function( method ) {

		var defaults = {
			ignoreExpression: /\s/ // what should be ignored?
		};

		var methods = {
			init: function( options ) {
				this.each( function() {
					var context = $.extend( {}, defaults, options );
					var $obj = $( this );
					var usingInnerText = true;
					var text = $obj.get( 0 ).innerText;

					// some browsers support innerText...some don't...some ONLY work with innerText.
					if ( typeof text == "undefined" ) {
						text = $obj.html();
						usingInnerText = false;
					}

					// use the first line as a baseline for how many unwanted leading whitespace characters are present
					var superfluousSpaceCount = 0;
					var pos = 0;
					var currentChar = text.substring( 0, 1 );

					while ( context.ignoreExpression.test( currentChar ) ) {
						if(currentChar !== "\n"){
							superfluousSpaceCount++;
						}else{
							superfluousSpaceCount = 0;
						}

						currentChar = text.substring( ++pos, pos + 1 );
					}

					// split
					var parts = text.split( "\n" );
					var reformattedText = "";

					// reconstruct
					var length = parts.length;
					for ( var i = 0; i < length; i++ ) {

						// remove leading whitespace (represented by an empty string)
						if(i === 0 && parts[0]=== ""){
							continue;
						}

						// cleanup, and don't append a trailing newline if we are on the last line
						reformattedText += parts[i].substring( superfluousSpaceCount ) + ( i == length - 1 ? "" : "\n" );
					}

					// modify original
					if ( usingInnerText ) {
						$obj.get( 0 ).innerText = reformattedText;
					}
					else {
						// This does not appear to execute code in any browser but the onus is on the developer to not
						// put raw input from a user anywhere on a page, even if it doesn't execute!
						$obj.html( reformattedText );
					}
				} );
			}
		}

		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		}
		else if ( typeof method === "object" || !method ) {
			return methods.init.apply( this, arguments );
		}
		else {
			$.error( "Method " + method + " does not exist on jQuery.prettyPre." );
		}
	}
} )( jQuery );