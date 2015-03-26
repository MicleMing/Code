<?php
	include_once './lib/User.php';
	class Register extends User
	{
		public function md5Func($password){
			return md5($password);
		}

		/*public function check($property,$value){
			this
		}*/
	}

	$reg = new Register();
	//echo $reg->getBypro('username','lanmingming')[0]->getUsername();