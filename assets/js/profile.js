

$(function() {
	$("#profile a").click(function(e) {
		e.preventDefault();
		$.ajax({
			url: 'assets/showprofile.php',
			beforeSend: function(request) {
				request.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("token"));
			},
			type: 'GET',
			success: function(data) {
				//window.location="profile.html";
				alert("successfull");
			},
			error: function(data) {
				alert("Error occured");
			}
			
		});
	});
});
	//GET assets/showprofile.php 400 Bad Request????
	


	