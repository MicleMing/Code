/**
 * @fileOverview  localstorage
 * @author lanmingming
 */
(function (window) {

	'use strict';

	var Ls = (function() {
		if ('localStorage' in window) {
			try{
				return window.localStorage;
			}
			catch (e) {
				alert('浏览器不支持localStorage,或者关闭了该功能，请更换浏览器或者取消设置');
				return null;
			}		
		}
	})(); 

	var setItem = function (key, value) {
		
	}

})(this)