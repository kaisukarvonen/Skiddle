
$(function() {
	
	if($('body').is('.index')) {
		navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
		/* based on country code check if there is file named /location-countrycode-words.txt
		-> if not: disable checkbox location-words
		*/
		
		window.user = null;
		localStorage.setItem('user', user);

	}
});


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
		resetTimer();
		
		if (countryIsValid == 'true') {
				console.log(localStorage.getItem('countryIsValid'));
				
		} else {
			console.log(localStorage.getItem('countryIsValid'));
			$("#location-words").prop('disabled', true);
		}
		
		if (window.user == 'null') {
			$(".nav-icon-link").css('display', 'none');
		}
		console.log("current user:"+window.user);
	}
});


$(function() {
	if($('body').is('.playpage')) {
		setRandomWord();
		startTimer(window.countdownTime, document.querySelector('#remaining-time'));
	}


	$(".word-is-done").click(function() {
		saveDoneWordtoList(window.chosenWord);
	});


	$(".skip-word").click(function() {
		saveSkippedWordtoList(window.chosenWord);
	});
	
	
	//for testing
	$(".emptyWordsList").click(function() {
		allWords = [];
		localStorage.setItem("allWords", JSON.stringify(allWords));
	});
});


function listWordsOnPage(array, element) {
	for (var i=0; i < array.length; i++) {
		$(element).append("<li><span>"+array[i]+"</span></li>");
	}
}

$(function() {
	if($('body').is('.gameover')) {
		resetTimer();
		listWordsOnPage(roundDoneWords, '#list-done-words');
		listWordsOnPage(roundSkippedWords, '#list-skipped-words');
	}
	
	$('.play-again').click(function() {
		emptyArray(roundDoneWords, 'roundDoneWords');
		emptyArray(roundSkippedWords, 'roundSkippedWords');
		window.location = "playpage.html";
	});
});



$(function() {
	if($('body').is('.profile')) {
		
		showProfilePicture(window.user);
	}
});


function showProfilePicture(webuser) {
	$("#profile-picture").attr("src", "http://scoctail.com/images/profile-pic-"+webuser+".jpg");
	$(".header-title").text(webuser);
}


function showDefaultPicture() {
	$("#profile-picture").attr("src", "assets/img/default-profile-pic.jpg");
}
		

$(function() {
    $("#take-picture").click(function() {
		capturePhoto();
	});
});



$(function() {
	$("#register").click(function() {
		var username = $("#username").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordAgain = $("#password-again").val();
		//alert(username+", "+email+", "+password+", "+passwordAgain);
		
		if (username=='' || email=='' || password=='' || passwordAgain=='') {
			$(".alert").css("display", "block");
			$("#error-text").text("Please fill all fields!");
		} else if (username.length < 5) {
			$(".alert").css("display", "block");
			$("#error-text").text("Username must be at least 5 characters long!");
		} else if (password != passwordAgain) {
			$(".alert").css("display", "block");
			$("#error-text").text("Passwords do not match!");
		} else if (password.length < 6) {
			$(".alert").css("display", "block");
			$("#error-text").text("Password must be at least 6 characters long!");
		} else if (!isValidEmail(email)) {
			$(".alert").css("display", "block");
			$("#error-text").text("Email is not valid!");
		} else {
			$(".alert").css("display", "none");
			
			$.post("http://scoctail.com/register.php", {
				username1: username,
				email1 : email,
				password1: password
				}, function (data) {
					if (data == "registerSuccessfull") {
						console.log("register done");
						$("#log-in-modal").css("display", "inline");
						$(".modal-title").text("Registration complete");
						$(".modal-title").css("color", "#5AA892");
						$(".modal-body").text("Your account has been successfully activated. You can log in now!");
						$("#myModal").modal({show: true});
					} else if (data == "emailTaken") {
						$("#log-in-modal").css("display", "none");
						$(".modal-title").text("Email is in use");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("This email is already in use, please choose a different one.");
						$("#myModal").modal({show: true});
					} else {
						console.log("register error");
						$("#log-in-modal").css("display", "none");
						$(".modal-title").text("Account registration failed");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("An error occured during registration, please try again later.");
						$("#myModal").modal({show: true});
					}
				});
			}
	});
});

var user = localStorage.getItem('user');


$(function() {
	$("#login").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if (username == '') {
			$(".modal-title").text("Error");
			$(".modal-title").css("color", "red");
			$(".modal-body").text("Please enter your username.");
			$("#myModal").modal({show: true});
		} else if (password == '') {
			$("#log-in-modal").css("display", "inline");
			$(".modal-title").text("Error");
			$(".modal-title").css("color", "red");
			$(".modal-body").text("Please enter your password.");
			$("#myModal").modal({show: true});
		} else {
			$.post("http://scoctail.com/login.php", {
				username1: username,
				password1: password
				}, function (data) {
					if (data == "loginSuccessfull") {
						localStorage.setItem('user', username);
						window.location = "game-menu.html";
					} else {
						$(".modal-title").text("Login failed");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("Username and password do not match!");
						$("#myModal").modal({show: true});
					}
				});
		}
		
	});
});


function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}





var allWords = JSON.parse(localStorage.getItem('allWords')) || [];
var gamemodes = JSON.parse(localStorage.getItem('gamemodes')) || [];
var roundDoneWords = JSON.parse(localStorage.getItem('roundDoneWords')) || [];
var roundSkippedWords = JSON.parse(localStorage.getItem('roundSkippedWords')) || [];

$(function() {
    $("#handle-settings").click(function() {
		gamemodes = [];
		emptyArray(roundDoneWords, 'roundDoneWords');
		emptyArray(roundSkippedWords, 'roundSkippedWords');
		
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
		window.location = "playpage.html";
	});
});


function resetTimer() {
	countdownTime = 20;
	localStorage.setItem('countdownTime', parseInt(countdownTime));
}

function emptyArray(array, element) {
	array = [];
	localStorage.setItem(element, JSON.stringify(array));
}



function wordFromFile(fileName) {
	return $.get(fileName).then(function(data) {
		var lines = data.split("\n");
		var randomIndex = Math.floor(Math.random() * lines.length);
		var word = lines[randomIndex];
		window.chosenWord = word;
		if (wordIsUsed(word)) {
			wordFromFile(fileName);
		}
		return word;
	});
}


//If you return a promise, the next 'then' in the chain will use the value that the promise resolves to.


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

var chosenWord; //nollaantuu aina kun uusi sivu ladataan

function setRandomWord() {
	var randomMode = gamemodes[Math.floor(Math.random() * gamemodes.length)];
	console.log("random: "+randomMode+", modes:" +gamemodes);
	console.log("allWords:" +JSON.parse(localStorage.getItem('allWords')));
	
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

function appendWord(word) {
	$('.word').text(word);
	saveWordToAllWordsList(window.chosenWord);
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
		vibrateTimeIsRunningOut();
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
	
	window.setTimeout(function() {
	window.location = "gameover.html"}, duration*1000);
}

var countdownTime = parseInt(localStorage.getItem('countdownTime'));


function vibrateTimeIsRunningOut() {
	if (parseInt(localStorage.getItem('countdownTime')) == 10) {
		navigator.vibrate(2000);
		console.log("im here");
	} 
}



var countrycode = localStorage.getItem('countrycode');

var onLocationSuccess = function(position) {
        getCountrycode(position.coords.latitude, position.coords.longitude);
    };

    // onError Callback receives a PositionError object
    //
function onLocationError(error) {
     alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

	
var countryIsValid = localStorage.getItem('countryIsValid');
	
function getCountrycode(lat, lng) {
	grid = codegrid.CodeGrid();
	grid.getCode(lat, lng, function (error, code) {
		if (error) {
			console.log("Error: could not get country code");
		}
		countrycode = code;
		localStorage.setItem('countrycode', countrycode);
		console.log("current countrycode: " +countrycode);
		
		$.ajax({
			type: 'HEAD',
			url: 'http://scoctail.com/location-'+countrycode+'-words.txt',
			success: function() {
				countryIsValid = 'true';
				localStorage.setItem('countryIsValid', countryIsValid);
			},
			error: function() {
				countryIsValid = 'false';
				localStorage.setItem('countryIsValid', countryIsValid);
			}
		});
		
	});
}



var pictureSource;  
var destinationType; 

document.addEventListener("deviceready",onDeviceReady,false);
	
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}


function capturePhoto() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 alert('get picture failed');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

function uploadPhoto(imageURI) {
	 var options = new FileUploadOptions();
	 options.fileKey = "file";
	 options.fileName = "profile-pic-"+window.user+".jpg";
	 options.mimeType = "image/jpeg";
	 console.log(options.fileName);
	 var params = new Object();
	 params.value1 = "test";
	 params.value2 = "param";
	 options.params = params;
	 options.chunkedMode = false;

	var ft = new FileTransfer();
	 ft.upload(imageURI, "http://scoctail.com/upload.php", function(result){
	 console.log(JSON.stringify(result));
	 //showProfilePicture(window.user); how to load new image without navigating back to page.. clear cache etc?
	 }, function(error){
	 console.log(JSON.stringify(error));
	 }, options);
}



function getPhoto(source) {
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}


    function onFail(message) {
      alert('Failed because: ' + message);
    }