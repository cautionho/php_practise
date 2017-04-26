<?php


	$data = json_decode($_POST['jsonData']);

	sleep(1);

	$username = $data->username;
	$pwd = $data->pwd;

	$conn = mysqli_connect('localhost','root','');

	if(!$conn){
		die('cannot connect mysql!').mysqli_error();
	}

	//选择数据库
	mysqli_select_db($conn,'test');
	//查询
	$sql = "SELECT * FROM user";

	$res = mysqli_query($conn,$sql);

	while($row = mysqli_fetch_array($res)){
		if($row['username'] == $username){
			$result = 200;
			break;
		}else{
			$result = 400;
			continue;
		}
	}

	$data->result = $result;
	echo json_encode($data);
	exit;
