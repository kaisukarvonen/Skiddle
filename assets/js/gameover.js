$(function() {
	if($('body').is('.gameover')) {
		resetTimer(parseInt(sessionStorage.getItem("timeLimit")));
		console.log(allWords.length);
		listWordsOnPage(JSON.parse(localStorage.getItem('roundDoneWords')), '#list-done-words', '#explained-words');
		listWordsOnPage(JSON.parse(localStorage.getItem('roundSkippedWords')), '#list-skipped-words', '#skipped-words');
		footerPosition(".footer-bottom", roundDoneWords, roundSkippedWords);
		console.log(roundDoneWords + " -- "+ roundSkippedWords);
		/*if (window.user != 'null') {
			//addRoundWordstoDatabase(roundDoneWords, roundSkippedWords);
		}*/
	}
	
	$('#play-again').click(function() {
		emptyArray('roundDoneWords', JSON.parse(localStorage.getItem('roundDoneWords')));
		emptyArray('roundSkippedWords', JSON.parse(localStorage.getItem('roundSkippedWords')));
		window.location = "playpage.html";
	});
	
	
});




function listWordsOnPage(array, element, title) {
	if (array.length == 0) {
		$(title).css("display", "none");
	} else {
		for (var i=0; i < array.length; i++) {
			$(element).append("<li><span>"+array[i]+"</span></li>");
		}
	}
}


function footerPosition(footer, array1, array2) {
	var combinedLength = array1.length + array2.length;
	if (array1.length > 6 && array2.length == 0 || array2.length > 6 && array1.length == 0 || array1.length > 0 && array2.length > 0 && combinedLength > 4) {
		$(footer).css("position", "static");
	}
}