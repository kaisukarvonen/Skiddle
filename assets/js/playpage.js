$(function() {
	if($('body').is('.playpage')) {
		setRandomWord();
		startTimer(parseInt(sessionStorage.getItem('countdownTime')), document.querySelector('#remaining-time'));
	}


	$(".word-is-done").click(function() {
		saveDoneWordtoList(chosenWord);
	});


	$(".skip-word").click(function() {
		saveSkippedWordtoList(chosenWord);
	});
	
	
	if (allWords.length > 60) {
		emptyArray(allWords, "allWords");
	}
});


var allWords = JSON.parse(localStorage.getItem('allWords')) || [];
var gamemodes = JSON.parse(sessionStorage.getItem('gamemodes')) || [];
var roundDoneWords = JSON.parse(localStorage.getItem('roundDoneWords')) || [];
var roundSkippedWords = JSON.parse(localStorage.getItem('roundSkippedWords')) || [];

function addRoundWordstoDatabase(arrayDone, arraySkipped) {
	$.post("http://scoctail.com/addwords.php", {
			doneWords: arrayDone.length,
			skippedWords: arraySkipped.length,
			username1: window.user
			}, function (data) {
				console.log(data);
			}
	);
}


function wordFromFile(fileName) {
	return $.get(fileName).then(function(data) {
		var lines = data.split("\n");
		var randomIndex = Math.floor(Math.random() * (lines.length-1));
		var word = lines[randomIndex];
		console.log(randomIndex);
		while (wordIsUsed(word)) {
			console.log(word + " has already been used");
			randomIndex = Math.floor(Math.random() * (lines.length-1));
			word = lines[randomIndex];
		}
		chosenWord = word;
		return chosenWord;
	});
}




function wordIsUsed(word) {
	if (allWords.length == 0) {
		return false;
	} else {
		for (i=0; i < allWords.length; i++) {
			if (word == allWords[i]) {
				return true;
			}
		}
	}
	return false;
}

var chosenWord;

function setRandomWord() {
	var randomMode = gamemodes[Math.floor(Math.random() * gamemodes.length)];
	console.log("random: "+randomMode+", modes:" +gamemodes);
	console.log("allWords:" +JSON.parse(localStorage.getItem('allWords')));
	var countrycode = sessionStorage.getItem("countrycode");
	
	if (randomMode == "explain" || randomMode == "locationwords") {
		$('#word-title').append("<h3>Explain it!</h3>");
	} else {
		$('#word-title').append("<h3>Mimic it!</h3>");
	}
	
	if (randomMode == "explain") {
		return wordFromFile("http://scoctail.com/english-explain-words.txt").then(appendWord);
	} else if (randomMode == "mime") {
		return wordFromFile("http://scoctail.com/english-mime-words.txt").then(appendWord);
	} else if (randomMode == "locationwords") {
		return wordFromFile("http://scoctail.com/location-"+countrycode+"-words.txt").then(appendWord);
	}
}


function appendWord(chosenWord) {
	$('.current-word').text(chosenWord);
	saveWordToAllWordsList(chosenWord);
}




function saveDoneWordtoList(word) {
	roundDoneWords.push(word);
	localStorage.setItem('roundDoneWords', JSON.stringify(roundDoneWords));
}

function saveSkippedWordtoList(word) {
	roundSkippedWords.push(word);
	localStorage.setItem('roundSkippedWords', JSON.stringify(roundSkippedWords));
}

function saveWordToAllWordsList(word) {
	allWords.push(word);
	localStorage.setItem('allWords', JSON.stringify(allWords));
}





function startTimer(duration, display) {
    var start = Date.now(), 
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 
		sessionStorage.setItem('countdownTime', parseInt(diff));
		if (diff <= 5) {
			$("#remaining-time").css("color", "red");
		}

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
		vibrateTimeIsRunningOut();
    };
   
    timer();
    setInterval(timer, 1000);
	
	window.setTimeout(function() {
		window.location = "gameover.html"}, duration*1000);
}

var countdownTime = parseInt(sessionStorage.getItem('countdownTime'));


function vibrateTimeIsRunningOut() {
	if (parseInt(sessionStorage.getItem('countdownTime')) == 5) {
		navigator.vibrate(1000);
	} 
}