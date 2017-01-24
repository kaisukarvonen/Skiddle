
function setToken(data) {
	localStorage.setItem("token", data);
}


function setDecodedToken(data) {
	var separated = data.split(".");
    var decoded = b64utos(separated[1]);
	localStorage.setItem("decodedToken", decoded);
}





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
			$.post("assets/login2.php", {
				username1: trimUsername,
				password1: trimPassword
				}, function (data) {
					setToken(data);
					setDecodedToken(data);
					window.location="game-menu.html";
			}).fail(function(xhr) {
				if (xhr.status == 401) {
					$(".modal-title").text("Login failed");
					$(".modal-title").css("color", "red");
					$(".modal-body").text("Username and password do not match!");
					$("#myModal").modal({show: true});
				} else if (xhr.status == 500) {
					$(".modal-title").text("Login failed");
					$(".modal-title").css("color", "red");
					$(".modal-body").text("An error occured during login, please try again later.");
					$("#myModal").modal({show: true});
				}
			});
		}
		
	});
});