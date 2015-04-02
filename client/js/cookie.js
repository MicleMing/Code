$(function() {
	Cookie = (function() {

		var Cookie = {
		
			get: function(name) {
				var arr,
					reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
					if(arr = document.cookie.match(reg))
						return unescape(arr[2]);
					else
						return null
			}			
		};

		return Cookie;

	})();
})