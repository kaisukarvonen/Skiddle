var token = localStorage.getItem("token");

$(function() {
	$("#profile a").click(function(e) {
		console.log(token);
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'assets/showprofile.php',
			data: {jwt: '1234'},
			dataType: 'json',
			/*beforeSend: function(request) {
				request.setRequestHeader('Authorization', 'Bearer '+ token);
			},*/
			contentType: "application/json; charset=utf-8",
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
	//Authorization header is string(0) "" on server????
	


	