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

	if($_GET['action'] == 'logout'){
		unset($_SESSION['username']);
		unset($_SESSION['role']);
		exit;
	}

	$lgn = new Login();

	$lgn->setUsername($_POST['username']);
	$lgn->setPassword($lgn->md5Func($_POST['password']));
	$lgn->setRole($_POST['role']);

	$result = array();

	$result = $lgn->getByPro(array(
		'username'=>$lgn->getUsername(),
		'password'=>$lgn->getPassword(),
		'role'=>$lgn->getRole();
		));

	if(count($result) == 1){
		$_SESSION['username'] = $result[0]->getUsername;
		$_SESSION['role'] = $result[0]->getRole();
	}
	else{
		exit('用户名或者密码不正确');
	}
