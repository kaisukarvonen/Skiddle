


	$(".nav-icon-link-profile").click(function(e) {
		e.preventDefault();
		$.ajax({
			url: 'http://scoctail.com/showprofile.php',
			beforeSend: function(request) {
				request.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("token");
			},
			type: 'GET',
			success: function(data) {
				window.location="profile.html";
				//take to profile.html, show profile picture
			},
			error: function() {
				alert("Error occured") //modal here
			}
			
		});
	});
	
	


	