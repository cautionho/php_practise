<?php

	header('content-type:text/html;charset=utf-8');
	date_default_timezone_set('prc');

	$conn = mysqli_connect('localhost','root','');

	if(!$conn){
		die('cannot connect!').mysqli_error();
	}

	mysqli_select_db($conn,'test');

	$data = json_decode($_POST['jsonData']);

	$username = $data->username;

	$pwd = $data->pwd;

//	查询数据表
	$sql = "SELECT * FROM user";

	$res = mysqli_query($conn,$sql);

	while($row = mysqli_fetch_array($res)){

		if($row['username'] == $username){
			$result = 400;
			break;
		}else{

			$result = 200;
		}

	}

	if($result == 200){
		//将数据插入数据表
		$sql = "INSERT INTO user (username,password) VALUES ('".$username."','".$pwd."')";

		$conn->query($sql);
	}

	$data->result = $result;
	echo json_encode($data);

	mysqli_close($conn);
	exit;


?>