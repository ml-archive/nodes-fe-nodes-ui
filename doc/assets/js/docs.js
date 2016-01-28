$( window ).bind( "create.xrayhtml", function( e ) {

	var $instance = $(e.target);

	// Wire up Prism on xray-html components with the .docs--prism class
	var prism = $instance.hasClass('docs--prism');
	if( prism && "Prism" in window ) {
		$( ".docs--prism" ).find( "code" ).addClass( "language-markup" );
		Prism.highlightAll();
	}

	// Wire up ZeroClipboard on xray-html elements with a .docs--copy-code-btn button as the
	// immediate previous element.
	var clippable = $instance.prev().hasClass('docs--copy-code-btn');
	if(clippable && 'ZeroClipboard' in window) {

		var $clipButton = $instance.prev();
		var targetCode = $instance.find('.snippet').html().toString().trim();
		var clipboardClient = new ZeroClipboard($clipButton);

		clipboardClient.on('ready', function(e) {

			clipboardClient.on('copy', function(e) {
				e.clipboardData.setData('text/plain', targetCode);
			});

			clipboardClient.on('afterCopy', function(e) {
				console.log('Copied some shizz to clipboard!');
			});

		});
	}


});

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

	hljs.initHighlightingOnLoad();

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