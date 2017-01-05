
$(window).load(function() {
    $('#loadscreen').fadeOut('fast');
});


$(function() {
	if (sessionStorage.getItem("splashscreenVisited") == null) {
		showSplashscreen("#splashscreen", 3000);
		navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
	} else {
		hideSplashscreen("#splashscreen");
	}
	console.log("is splashscreen already visited:"+sessionStorage.getItem("splashscreenVisited"));
	sessionStorage.setItem("splashscreenVisited", "true");

});




function showSplashscreen(div, time) {
	setTimeout(function() {
		$(div).fadeOut('slow');
	}, time); 
}


function hideSplashscreen(div) {
	$(div).hide();
}


$(document).on("pagechange", function (e, data) {
	sessionStorage.setItem("currentPage", data.toPage[0].id);
	console.log(sessionStorage.getItem("currentPage"));
});

$.mobile.loading().hide();
