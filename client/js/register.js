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
			$(".register-container").append(success);
		})
	})

	//location to login

	var gotoLogin = $(".login").find("a");
	gotoLogin.on("click", function(e) {
		e.preventDefault();
		location.href = "../html/login.html";
	})

})