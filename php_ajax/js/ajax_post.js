$(function() {

	var vm = new Vue({

		data: {

			remember: false

		}

	}).$mount('#main');

	//判断cookie中是否有值
	var isLogin = getCookie('username');
	var isLoginPwd = getCookie('password');

	if(isLogin && isLoginPwd) {

		vm.remember = true;

		$('#user').val(isLogin);
		$('#pwd').val(isLoginPwd);

		$.ajax({
			type: "post",
			url: "./js/php/do.php",
			data: {
				jsonData: JSON.stringify({
					"username": isLogin,
					"pwd": isLoginPwd
				})
			},
			async: true,
			success: function(data) {
				var data = JSON.parse(data);

				if(data.result == '200') {
					alert('登录成功!');
					window.location.href = 'profile.html';
				} else {
					alert('用户名或密码错误!');
				}
			}
		});

	}

	$('#sub').on('mousedown', submitMsg);

	function submitMsg() {

		var username = $('#user').val();

		var pwd = $('#pwd').val();

		if(username == '' || pwd == '') {

			alert('用户名和密码不能为空!');
			return;

		} else {
			$.ajax({
				type: "post",
				url: "./js/php/do.php",
				data: {
					jsonData: JSON.stringify({
						"username": username,
						"pwd": pwd
					})
				},
				async: true,
				success: function(data) {
					var data = JSON.parse(data);

					if(data.result == '200') {
						alert('登录成功!');

						if(vm.remember == true) {
							//将用户资料存到cookie
							setCookie('username', data.username);
							setCookie('password', data.pwd);
						}

						window.location.href = 'profile.html';

					} else {
						alert('用户名或密码错误!');
					}
				}
			});
		}

	}

	function setCookie(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}

	function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}

})