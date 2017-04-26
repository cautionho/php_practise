$(function(){

	$('#sub').on('mousedown',check);

	var pattern = /^\w{6,12}$/;

	function check(){

		var username = $('#username').val();

		var pwd = $('#pwd').val();

		if(username == '' || pwd == ''){

			alert('用户名和密码不能为空!');
			return;

		}else if(pattern.test(username)){

			$.ajax({
				type:"post",
				url:"./js/php/register.php",
				data : {
					jsonData : JSON.stringify({

						"username" : username,
						"pwd" : pwd

					})
				},
				async:true,
				success : function(data){

					var data = JSON.parse(data);

					if(data.result == '200'){

						alert('注册成功!');
						window.location.href = 'profile.html';

					}else{

						alert('该用户名已存在或未知错误!');
						return;

					}

				}
			});

		}else{
			alert('用户名或密码输入格式有误!');
		}

	}

})
