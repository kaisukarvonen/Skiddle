
$(function() {
	
	if($('body').is('.index')) {
		navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);

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
		console.log("webuser:"+window.user);
	}
});

$(function() {
	if (window.user == 'null') {
		$(".nav-icon-link-profile").css('display', 'none');
	} else {
		$(".nav-icon-link-home").css('display', 'none');
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
	
	
	/*for testing
	$(".emptyWordsList").click(function() {
		emptyArray(allWords, "allWords");
	});*/
	
	if (allWords.length == 60) {
		emptyArray(allWords, "allWords");
	}
});




$(function() {
	$("#back-to-previous").click(function() {
		window.history.back();
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
		
		if (window.user != 'null') {
		addRoundWordstoDatabase(roundDoneWords, roundSkippedWords);
		}
	}
	
	$('#play-again').click(function() {
		emptyArray(roundDoneWords, 'roundDoneWords');
		emptyArray(roundSkippedWords, 'roundSkippedWords');
		window.location = "playpage.html";
	});
	
	
});


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
    $("#change-picture").click(function() {
		capturePhoto();
	});
	
	$("#change-password").click(function() {
		var newPassword = $("#new-password").val();
		var newPasswordAgain = $("#new-password-again").val();
		
		if (newPassword != newPasswordAgain) {
			$("#password-change-error-text").text("Passwords do not match!");
		} else if (newPassword.length < 6) {
			$("#password-change-error-text").text("Password must be at least 6 characters long!");
		} else {
			$("#password-change-error-text").text(" ");
			$.post("http://scoctail.com/changepassword.php", {
				password1: newPassword,
				username1: window.user
				}, function (data) {
					if (data == "passwordChanged") {
						$(".modal-title").text("Password changed");
						$(".modal-title").css("color", "#5AA892");
						$(".modal-body").text("Your password has been changed now!");
						$("#myModal").modal({show: true});
						$("#new-password").val("");
						$("#new-password-again").val("");
					} else {
						$(".modal-title").text("Password change failed");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("An error occured during registration, please try again later.");
						$("#myModal").modal({show: true});
					}
				}
					
			);
		}
		
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
						$("#username").val("");
						$("#email").val("");
						$("#password").val("");
						$("#password-again").val("");
					} else if (data == "usernameTaken") {
						$("#log-in-modal").css("display", "none");
						$(".modal-title").text("Username is taken");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("This username is already in use, please choose a different one.");
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
		var trimUsername = username.trim();
		var trimPassword = password.trim();
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
				username1: trimUsername,
				password1: trimPassword
				}, function (data) {
					if (data == "loginSuccessfull") {
						localStorage.setItem('user', trimUsername);
						window.location = "game-menu.html";
					} else if (data == "noMatchError") {
						$(".modal-title").text("Login failed");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("Username and password do not match!");
						$("#myModal").modal({show: true});
					} else {
						$(".modal-title").text("Login failed");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("An error occured during login, please try again later.");
						$("#myModal").modal({show: true});
					}
			});
			
		}
		
	});
});


$(function() {
	if($('body').is('.settings')) {
		if (window.user == 'null') {
			$("#log-out").css("display", "none");
		}
	}
	
	$("#shareWhatsapp").click(function() {
		var text = "I'm playing MobileGame and you should too!";
		var url = "http://someurl.com";
		window.plugins.socialsharing.shareViaWhatsApp(text, null /* img */, url, function() {
			console.log('whatsappshare ok');
		}, function(errormsg){
			alert(errormsg);
		});
	});
	
	$("#shareTwitter").click(function() {
		var text = "I'm playing MobileGame and you should too!";
		var url = "http://someurl.com";
		window.plugins.socialsharing.shareViaTwitter(text, null /* img */, url, function() {
			console.log('twittershare ok');
		}, function(errormsg){
			alert(errormsg);
		});
	});
	
	
	$("#shareEmail").click(function() {
		window.plugins.socialsharing.shareViaEmail(
			  "I'm playing MobileGame and you should too!", // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client 
			  "Invitation for MobileGame App",
			  ['to@person1.com'], // TO: must be null or an array 
			  null, // CC: must be null or an array 
			  null, // BCC: must be null or an array 
			  ['https://www.google.nl/images/srpr/logo4w.png','www/localimage.png'], // FILES: can be null, a string, or an array 
			  onSuccess, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below. 
			  onError // called when sh*t hits the fan 
		);
	});
	
});


var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true 
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false) 
}
 
var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}




$(function () {
	$("#log-out").click(function() {
		logout(window.user);
	});
});


function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function logout(webuser) {
		window.user = null;
		localStorage.setItem('user', user);
		window.location="index.html";
}





var allWords = JSON.parse(localStorage.getItem('allWords')) || [];
var gamemodes = JSON.parse(localStorage.getItem('gamemodes')) || [];
var roundDoneWords = JSON.parse(localStorage.getItem('roundDoneWords')) || [];
var roundSkippedWords = JSON.parse(localStorage.getItem('roundSkippedWords')) || [];
var locationWords = JSON.parse(localStorage.getItem('locationWords')) || [];

$(function() {
    $("#handle-settings").click(function() {
		gamemodes = [];
		emptyArray(roundDoneWords, 'roundDoneWords');
		emptyArray(roundSkippedWords, 'roundSkippedWords');
		
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
	} else if (gamemodes.length == 1 && gamemodes[0] == 'locationwords') {
		$(".modal-title").text("Only location word mode chosen");
			$(".modal-title").css("color", "red");
			$(".modal-body").text("This location might not have many location specific words, please also choose a second mode for the game!");
			$("#myModal").modal({show: true});
	} else {
		localStorage.setItem("gamemodes", JSON.stringify(gamemodes));
		window.location = "playpage.html";
	}
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
		var randomIndex = Math.floor(Math.random() * (lines.length-1));
		var word = lines[randomIndex];
		console.log(randomIndex);
		window.chosenWord = word;
		while (wordIsUsed(chosenWord)) {
			console.log(chosenWord + " has already been used");
			randomIndex = Math.floor(Math.random() * (lines.length-1));
			word = lines[randomIndex];
			console.log(randomIndex);
			window.chosenWord = word;
		}
		return chosenWord;
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
	saveWordToAllWordsList(word);
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
		localStorage.setItem('countdownTime', parseInt(diff));
		if (diff <= 5) {
			$("#remaining-time").css("color", "red");
		}

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
	if (parseInt(localStorage.getItem('countdownTime')) == 5) {
		navigator.vibrate(1000);
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




function onBackKeyDown() {
	if($('body').is('.playpage')) {
		alert("ho"); //alert stops timer, modal doesn't..
		$(".modal-title").text("Paused");
		/*$(".modal-title").css("color", "red");*/
		/*$(".modal-body").text("Username and password do not match!");*/
		$("#myModal").modal({show: true});
	}
}



var pictureSource;  
var destinationType; 

document.addEventListener("deviceready",onDeviceReady,false);
	
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
	document.addEventListener("backbutton", onBackKeyDown, false);
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
	 window.location.reload();
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