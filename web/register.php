<?php
	include_once './lib/User.php';
	class Register extends User
	{
		public function __construct(){

		}

		public function md5Func($password){
			return md5($password);
		}

		/*public function check($property,$value){
			this
		}*/
		public function check () {
			if(!preg_match('/^[\w\x80-\xff]{3,15}$/', $this->username)){
				exit('用户名错误');
			}
			if(strlen($this->password)<6){
				exit('密码长度不够')
			}
		}
	}

	$reg = new Register();

	$reg->setUsername($_POST['username']);
	$reg->setPassword($_POST['password']);
	$reg->setRole($_POST['role']);

	$reg->check();
	$result = array();
	$result = $reg->getBypro(array('username'=>$reg->getUsername());
	if(count($result) != 0){
		exit('该用户名已经被注册');
	}

	$reg->setPassword($reg->md5($reg->getPassword()));

	$reg->save();

	//echo $reg->getBypro('username','lanmingming')[0]->getUsername();