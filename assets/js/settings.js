$(function() {
	if($('body').is('.settings')) {
		/*if (window.user == 'null') {
			$("#log-out").css("display", "none");
		}*/
	}
	
	$("#shareWhatsapp").click(function() {
		var text = "I'm playing Skiddle and you should too!";
		var url = "http://someurl.com";
		window.plugins.socialsharing.shareViaWhatsApp(text, img , url, function() {
			console.log('whatsappshare ok');
		}, function(errormsg){
			alert(errormsg);
		});
	});
	
	$("#shareTwitter").click(function() {
		var text = "I'm playing Skiddle and you should too!";
		var url = "http://someurl.com";
		window.plugins.socialsharing.shareViaTwitter(text, null, url, function() {
			console.log('twittershare ok');
		}, function(errormsg){
			alert(errormsg);
		});
	});
	
	
	$("#shareEmail").click(function() {
		window.plugins.socialsharing.shareViaEmail(
			  "I'm playing Skiddle and you should too!", 
			  "Invitation for Skiddle Mobile App",
			  null,
			  null, 
			  null, 
			  null,  
			  onSuccess, 
			  onError
		);
	});
	
});


var onSuccess = function(result) {
  console.log("Share completed? " + result.completed);  
  console.log("Shared to app: " + result.app);
}
 
var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}


$(function () {
	$("#log-out").click(function() {
		
	});
});
