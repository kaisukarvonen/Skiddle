

$(function() {

	if($('body').is('.game-menu')) {
		if (sessionStorage.getItem("countryIsValid") == 'false' || sessionStorage.getItem("countryIsValid") == null) {
			$("#location-words").prop('disabled', true);
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
		
		if (localStorage.getItem("token") == 'null') {
		$(".nav-icon-link-profile").css('display', 'none');
		} else {
			$(".nav-icon-link-home").css('display', 'none');
		}
		
	}
		
	
	
    $("#handle-settings").click(function(e) {
		gamemodes = [];
		emptyArray('roundDoneWords', JSON.parse(localStorage.getItem('roundDoneWords')));
		emptyArray('roundSkippedWords', JSON.parse(localStorage.getItem('roundSkippedWords')));
	
		var limit = $("#rangeslider").val();
		sessionStorage.setItem('timeLimit', parseInt(limit));
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
				$("#gamemenuModal").modal({show: true});
				e.preventDefault();
		} else if (gamemodes.length == 1 && gamemodes[0] == 'locationwords') {
			$(".modal-title").text("Only location word mode chosen");
				$(".modal-title").css("color", "red");
				$(".modal-body").text("This location might not have many location specific words, please also choose a second mode for the game!");
				$("#gamemenuModal").modal({show: true});
				e.preventDefault();
		} else {
			sessionStorage.setItem("gamemodes", JSON.stringify(gamemodes));
		}
	});

});



function resetTimer(time) {
	sessionStorage.setItem('countdownTime', parseInt(time));
}

function emptyArray(storageName, array) {
	array = [];
	localStorage.setItem(storageName, JSON.stringify(array));
}
