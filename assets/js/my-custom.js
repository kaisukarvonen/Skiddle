
$(function() {
	
	if($('body').is('.game-menu')) {
		
		$('#time-slider').noUiSlider({
			start: 90,
			connect: "lower",
			range: {
				min: 60,
				max: 300
			}
		});
		
		/*if doesnt work, replace with input box: xx minutes (so can be from 1-whatever);
		default value is 2 minutes, up and down arrows 
		*/
		countdownTime = 20; //this never changes
		localStorage.setItem('countdownTime', parseInt(countdownTime));
	}
});






var allWords = JSON.parse(localStorage.getItem('allWords')) || [];
var gamemodes = JSON.parse(localStorage.getItem('gamemodes')) || [];

$(function() {
    $("#handle-settings").click(function() {
		gamemodes = [];
		roundDoneWords = [];
		roundSkippedWords = [];
		//allWords is emptied when app is closed? 
		
		if ($('#explain-words').is(':checked')) {
			gamemodes.push("explain");
		}
		if  ($('#mime-words').is(':checked')) {
			gamemodes.push("mime");
		}
		if  ($('#location-words').is(':checked')) {
			gamemodes.push("locationwords");
		}
		
		localStorage.setItem("gamemodes", JSON.stringify(gamemodes));
		//reset countdownTime
		window.location = "playpage.html";
	});
});




function wordFromFile(fileName) {
	return $.get(fileName).then(function(data) {
		var lines = data.split("\n");
		var randomIndex = Math.floor(Math.random() * lines.length);
		var word = lines[randomIndex];
		window.chosenWord = word;
		//console.log("wordFromFile: "+word);
		if (wordIsUsed(word)) {
			wordFromFile(fileName);
		}
		return word;
	});
	
}

function wordIsUsed(word) {
	var allWordsList = JSON.parse(localStorage.getItem("allWords"));
	var isUsed = false;
	if (allWordsList.length == 0) {
		return false;
	} else {
		for (i=0; i < allWordsList.length; i++) {
			if (word == allWordsList[i]) {
				return true;
			}
		}
	}
	return false;
}

var chosenWord;

function setRandomWord() {
	var randomMode = gamemodes[Math.floor(Math.random() * gamemodes.length)];
	console.log("random: "+randomMode);
	console.log(gamemodes);
	console.log(JSON.parse(localStorage.getItem('allWords')));
	
	if (randomMode == "explain" || randomMode == "locationwords") {
		$('#word-title').append("<h4>Explain it!</h4>");
	} else {
		$('#word-title').append("<h4>Mimic it!</h4>");
	}
	
	if (randomMode == "explain") {
		return wordFromFile("http://scoctail.com/english-explain-words.txt").then(appendWord);
	} else if (randomMode == "mime") {
		return wordFromFile("http://scoctail.com/english-mime-words.txt").then(appendWord);
	}
}

function appendWord(word) {
	$('.word').text(word);
}

var roundDoneWords = JSON.parse(localStorage.getItem('roundDoneWords')) || [];
var roundSkippedWords = JSON.parse(localStorage.getItem('roundSkippedWords')) || [];

function saveDoneWordtoList(word) {
	roundDoneWords.push(word);
	localStorage.setItem('roundDoneWords', JSON.stringify(roundDoneWords));
	//alert("done this round:" +roundDoneWords);
}

function saveSkippedWordtoList(word) {
	roundSkippedWords.push(word);
	localStorage.setItem('roundSkippedWords', JSON.stringify(roundSkippedWords));
	//alert("skipped this round:" +roundSkippedWords);
}

function saveWordToAllWordsList(word) {
	allWords.push(word);
	localStorage.setItem('allWords', JSON.stringify(allWords));
}





function startTimer(duration, display) {
    var start = Date.now(), //milliseconds
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
		localStorage.setItem('countdownTime', parseInt(diff));

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
	
	window.setTimeout(function() {
	window.location = "gameover.html"}, duration*1000); //milliseconds to seconds
}

var countdownTime = parseInt(localStorage.getItem('countdownTime'));



$(function() {
	if($('body').is('.playpage')) {
		setRandomWord();
		startTimer(window.countdownTime, document.querySelector('#remaining-time'));
		
	}


	$(".word-is-done").click(function() {
		saveWordToAllWordsList(window.chosenWord);
		saveDoneWordtoList(window.chosenWord);
	});


	$(".skip-word").click(function() {
		saveWordToAllWordsList(window.chosenWord);
		saveSkippedWordtoList(window.chosenWord);
	});
	
	
	//for testing
	$(".emptyWordsList").click(function() {
		allWords = [];
	});
});


$(function() {
	if($('body').is('.gameover')) {
		$("li")
	}
});
		

$(function() {
    $(".take-picture").click(function() {
		capturePhotoEdit();
	});
});


    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    // Wait for PhoneGap to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);
    // PhoneGap is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true }); 
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }