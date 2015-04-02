$(function() {

	var login = $("#login");

	login.on("click", function() {

		var data = {
			username: $("#username").val(),
			password: $("#password").val(),
			role: $("#select").val()
		};

		var url = "../../web/login.php";

		$.ajax({
			url: url,
			data: data,
			type: "POST"
		})
		.success(function(data) {
			var data = JSON.parse(data);
			location.href = data.url;
		})
	})

	//location

	var gotoRegister = $(".register").find("a");
	gotoRegister.on("click", function(e) {
		e.preventDefault();
		location.href = "../html/register.php";
	})
})