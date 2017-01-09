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