$(function() {
	if($('body').is('.gameover')) {
		resetTimer(parseInt(sessionStorage.getItem("timeLimit")));
		console.log(allWords.length);
		listWordsOnPage(JSON.parse(localStorage.getItem('roundDoneWords')), '#list-done-words', '#explained-words');
		listWordsOnPage(JSON.parse(localStorage.getItem('roundSkippedWords')), '#list-skipped-words', '#skipped-words');
		footerPosition(".footer-bottom", roundDoneWords, roundSkippedWords);
		console.log("done words: "+localStorage.getItem('roundDoneWords') + " -- skipped words: "+ localStorage.getItem('roundSkippedWords'));
		
		if (localStorage.getItem("token") === null) {
			$(".nav-icon-link-profile").css('display', 'none');
		} else {
			$(".nav-icon-link-home").css('display', 'none');
		}
		if (localStorage.getItem("token") !== null && userName !==null) {
			addRoundWordstoDatabase(localStorage.getItem('roundDoneWords'), localStorage.getItem('roundSkippedWords'));
		}
	}
	
	$('#play-again').click(function() {
		emptyArray('roundDoneWords', JSON.parse(localStorage.getItem('roundDoneWords')));
		emptyArray('roundSkippedWords', JSON.parse(localStorage.getItem('roundSkippedWords')));
		window.location = "playpage.html";
	});
	
	
});

var userName = function getUsername(token) {
	var decodedToken = localStorage.getItem("decodedToken");
	console.log(decodedToken);
	var tokenJson = JSON.parse(decodedToken);
	return tokenJson.data.userName;
}

function addRoundWordstoDatabase(arrayDone, arraySkipped) {
	var explained, mimicked, location;
	explained = mimicked = location = 0;
	for (var i=0; i<arrayDone.length; i++) {
		if (arrayDone[i].mode = "explain") {
			explained++;
		} else if (arrayDone[i].mode = "mime") {
			mimicked++;
		} else {
			location++;
		}
	}
	$.post("assets/addwords.php", {
		explainedWords: explained,
		mimickedWords: mimicked,
		locationWords: location,
		skippedWords: arraySkipped.length,
		username1: userName
	}, function (data) {
		console.log("user's round words added to database");
	}).fail(function(data) {
		alert("Error adding user's round words to database");
	});
}




function listWordsOnPage(array, element, title) {
	if (array.length == 0) {
		$(title).css("display", "none");
	} else {
		for (var i=0; i < array.length; i++) {
			$(element).append("<li><span>"+array[i].name+"</span></li>");
		}
	}
}


function footerPosition(footer, array1, array2) {
	var combinedLength = array1.length + array2.length;
	if (array1.length > 6 && array2.length == 0 || array2.length > 6 && array1.length == 0 || array1.length > 0 && array2.length > 0 && combinedLength > 4) {
		$(footer).css("position", "static");
	}
}