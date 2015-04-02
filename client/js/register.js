$(function(){
	//ajax
	var submit = $("#submit");

	submit.on("click", function () {
		// body...
		var	data = {
			username: $("#username").val(),
			password: $("#password").val(),
			role: $("#select").val()
		};

		$.ajax({
			url: "../../web/register.php",
			data: data,
			type: "POST"
		})
		.success(function (data) {
			// body...
			var data = JSON.parse(data);
			var success = $("<p></p>");
			success.html(data.message);
			$(".register-container").children('p').not('.login').remove();
			$(".register-container").append(success);
		})
		.error(function (error) {
			var error = JSON.parse(error);
			var errorMsg = $("<p></p>");
			errorMsg.html(error.message);
			$(".register-container").children('p').remove();
			$(".register-container").append(error);
		})
	})

	//location to login

	var gotoLogin = $(".login").find("a");
	gotoLogin.on("click", function(e) {
		e.preventDefault();
		location.href = "../html/login.php";
	})

})