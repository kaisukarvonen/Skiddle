

$(function() {
	$("#profile a").click(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'GET',
			url: 'assets/showprofile.php',
			beforeSend: function(request) {
				request.setRequestHeader('Authorization', 'Bearer '+localStorage.getItem("token"));
			},
			success: function(data) {
				//window.location="profile.html";
				alert("successfull");
			},
			error: function() {
				alert("Error occured"); //modal here
			}
			
		});
	});
});
	
	


	