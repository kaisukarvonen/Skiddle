$(function() {
	$("#register").click(function() {
		var username = $("#username").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordAgain = $("#password-again").val();
		
		
		if (username=='' || email=='' || password=='' || passwordAgain=='') {
			$(".alert").css("display", "block");
			$("#error-text").text("Please fill all fields!");
		} else if (username.length < 5) {
			$(".alert").css("display", "block");
			$("#error-text").text("Username must be at least 5 characters long!");
		} else if (password != passwordAgain) {
			$(".alert").css("display", "block");
			$("#error-text").text("Passwords do not match!");
		} else if (password.length < 6) {
			$(".alert").css("display", "block");
			$("#error-text").text("Password must be at least 6 characters long!");
		} else if (!isValidEmail(email)) {
			$(".alert").css("display", "block");
			$("#error-text").text("Email is not valid!");
		} else {
			$(".alert").css("display", "none");
			
			$.post("http://scoctail.com/register.php", {
				username1: username,
				email1 : email,
				password1: password
				}, function (data) {
					if (data == "registerSuccessfull") {
						console.log("register done");
						$("#log-in-modal").css("display", "inline");
						$(".modal-title").text("Registration complete");
						$(".modal-title").css("color", "#5AA892");
						$(".modal-body").text("Your account has been successfully activated. You can log in now!");
						$("#myModal").modal({show: true});
						$("#username").val("");
						$("#email").val("");
						$("#password").val("");
						$("#password-again").val("");
					} else if (data == "usernameTaken") {
						$("#log-in-modal").css("display", "none");
						$(".modal-title").text("Username is taken");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("This username is already in use, please choose a different one.");
						$("#myModal").modal({show: true});
					} else {
						console.log("register error");
						$("#log-in-modal").css("display", "none");
						$(".modal-title").text("Account registration failed");
						$(".modal-title").css("color", "red");
						$(".modal-body").text("An error occured during registration, please try again later.");
						$("#myModal").modal({show: true});
					}
				});
			}
	});
});


function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}