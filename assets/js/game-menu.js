$(function() {
	
	if($('div').is('#game-menu')) {
		
		var $element = $("#rangeslider");
		$element.rangeslider({
			polyfill: false,

			rangeClass: 'rangeslider',
			disabledClass: 'rangeslider--disabled',
			horizontalClass: 'rangeslider--horizontal',
			verticalClass: 'rangeslider--vertical',
			fillClass: 'rangeslider__fill',
			handleClass: 'rangeslider__handle',

			onInit: function() {
				valueOutput(this.$element[0]);
			}
		});
		function valueOutput(element) {
			var value = element.value;
			$("#time-value").text(value + " seconds");
		}
		
		$(document).on('input', 'input[type="range"]', function(e) {
            valueOutput(e.target);
        });
		
		if (countryIsValid == 'true') {
				console.log(localStorage.getItem('countryIsValid'));	
		} else {
			console.log(localStorage.getItem('countryIsValid'));
			$("#location-words").prop('disabled', true);
		}
		console.log("webuser:"+window.user);
	}
});