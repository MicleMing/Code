$(function() {
	var logout = $(".logout");

	logout.on("click", function() {
		var url = "../../web/login.php";
		$.ajax({
			url: url,
			data: {
				'action': 'logout'
			},
			type: "GET"
		})
		.success(function(data) {
			location.href = "../html/login.php"
		})
		.error(function(error) {
			alert("退出失败");
		})
	})

	var $personal = $(".personal");

	$personal.on("click", function() {
		var url = "../html/detail.php";
		location.href = url;
	})
})