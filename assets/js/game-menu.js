


$(function() {

	if (sessionStorage.getItem("currentPage") == 'game-menu') {
		console.log("current countrycode: " +countrycode+", valid:"+countryIsValid);
	}
		
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
		
		if (countryIsValid == 'false') {
			$("#location-words").prop('disabled', true);
		}
		console.log("webuser:"+window.user);
	
	
	
	
    $("#handle-settings").click(function(e) {
		gamemodes = [];
		emptyArray(roundDoneWords, 'roundDoneWords');
		emptyArray(roundSkippedWords, 'roundSkippedWords');
	
		var limit = $("#rangeslider").val();
		localStorage.setItem("timeLimit", parseInt(limit));
		resetTimer(limit);
		
			
		if ($('#explain-words').is(':checked')) {
				gamemodes.push("explain");
		}
		if  ($('#mime-words').is(':checked')) {
				gamemodes.push("mime");
		}
		if  ($('#location-words').is(':checked')) {
				gamemodes.push("locationwords");
		}
		
		if (gamemodes.length == 0) {
			$(".modal-title").text("No game mode chosen");
				$(".modal-title").css("color", "red");
				$(".modal-body").text("Please choose at least one game mode!");
				$("#myModal").modal({show: true});
				e.preventDefault();
		} else if (gamemodes.length == 1 && gamemodes[0] == 'locationwords') {
			$(".modal-title").text("Only location word mode chosen");
				$(".modal-title").css("color", "red");
				$(".modal-body").text("This location might not have many location specific words, please also choose a second mode for the game!");
				$("#myModal").modal({show: true});
				e.preventDefault();
		} else {
			localStorage.setItem("gamemodes", JSON.stringify(gamemodes));
			//location.href = "#playpage"; //miten data-transition tähän?
		}
	});

});



function resetTimer(time) {
	window.countdownTime = time;
	localStorage.setItem('countdownTime', parseInt(countdownTime));
}

function emptyArray(array, element) {
	array = [];
	localStorage.setItem(element, JSON.stringify(array));
}
