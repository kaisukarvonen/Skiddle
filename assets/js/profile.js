var token = localStorage.getItem("token");

/*$(function() {
	$("#profile a").click(function(e) {
		console.log(token);
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'assets/showprofile.php',
			data: {jwt: '1234'},
			/*beforeSend: function(request) {
				request.setRequestHeader('Authorization', 'Bearer '+ token);
			},
			success: function(data) {
				//window.location="profile.html";
				alert("successfull");
				
			},
			error: function(data) {
				alert("Error occured");
			}
			
		});
	});
});*/
	//Authorization header is string(0) "" on server????
	
	
$(function() {
	$("#profile").click(function(event) {
		/*event.preventDefault();
		$.post("assets/showprofile.php", {
			authToken: token
		}, function(data) {
			alert("successfull");
			console.log(data);
			//window.location="profile.html";
		}).fail(function(data) {
			alert("error");
		})*/
		window.location="profile.html";
	})
});


	