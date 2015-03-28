<?php
	include_once './lib/User.php';
	session_start();

	class Login extends User
	{
		public function __construct(){

		}

		public function md5Func($password){
			return md5($password);
		}

	}

/*	if($_GET['action'] == 'logout'){
		unset($_SESSION['username']);
		unset($_SESSION['role']);
		exit;
	}*/

	$lgn = new Login();

	$lgn->setUsername($_POST['username']);
	$lgn->setPassword($lgn->md5Func($_POST['password']));
	$lgn->setRole($_POST['role']);

	$result = array();

	$result = $lgn->getByPro(array(
		'username'=>$lgn->getUsername(),
		'password'=>$lgn->getPassword(),
		'role'=>$lgn->getRole()
		));

	if(count($result) == 1){

		$username = $result[0]->getUsername();
		$role = $result[0]->getRole();

		$_SESSION['username'] = $username;
		$_SESSION['role'] = $role;



		echo json_encode([
			"username"=> $username,
			"role"=> $role
			]);
	}
	else{
		exit(json_encode([
			'error'=> '密码或者用户名不正确'
			]));
	}