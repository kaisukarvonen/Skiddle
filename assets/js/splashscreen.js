$(function() {
	setTimeout(function() {
		$('#splashscreen').fadeOut('slow');
	}, 3000); 
	//disable from viewing div again? only shows once?
});




$(window).load(function() {
    $('#loadscreen').fadeOut('slow');
});



$.mobile.loading().hide();