<?php
	include_once './lib/User.php';
	include_once './lib/Db.php';
	include_once './lib/CONST.php';
	session_start();

	class Login extends User
	{
		public function __construct(){

		}

		public function md5Func($password){
			return md5($password);
		}

	}


	/**
	 * 每次登陆跟新配置文件
	 * @return string 配置文件
	 */
	class updateConfig
	{
		public function getConfig () {
			$configCollectionName = 'config';

			$collection = Db::getInstance()->getCollection($configCollectionName);

			$cursor = $collection->find(array('userId' => $_SESSION['userId']));

			$result = array();

	        if ($cursor) {
	            foreach ($cursor as $data) {
	                array_push($result, $data);
	            };
	        }
	        return $result[0]['config'];
		}

		/**
		 * 获取task列表
		 * @return array 任务列表
		 */
		public function getTasks () {
			$taskCollectionName = 'task';

			$collection =Db::getInstance()->getCollection($taskCollectionName);
			$cursor = $collection->find(array('userId' => $_SESSION['userId']));

			$result = array();
			if ($cursor) {
				foreach ($cursor as $data) {
					array_push($result, $data['time']);
				};
			}
			return $result;
		}

		/**
		 * 给每个任务跟新配置文件
		 */
		public function updateTaskConf ($config, $tasks) {
			foreach ($tasks as $data) {
				$filename = CONSTANT::uploadUrl."localUpload/".$data."/config.json";
				file_put_contents($filename, $config);
			}
		}
	}  

	//退出
	if(isset($_GET['action'])&&$_GET['action'] == 'logout'){
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
		'role'=>$lgn->getRole()
		));

	if(count($result) == 1){

		$username = $result[0]->getUsername();
		$role = $result[0]->getRole();
		$userId = $result[0]->getId();

		$_SESSION['username'] = $username;
		$_SESSION['role'] = $role;
		$_SESSION['userId'] = $userId;

		//setcookie('username', $username, time()+3600);
		//$_SESSION['role'] 0 个人注册 ；1 团队注册

		if($_SESSION['role'] == 1) {
			$url = "../html/configOrg.php";
			//header("Location: $url");
		}elseif ($_SESSION['role'] == 0) {
			$url = "../html/index.php";
			echo json_encode($url);
			//header("Location: $url");
		}

/*		echo json_encode([
			"url"=>$url,
			"username"=> $username,
			"role"=> $role,
			"userId"=>$userId
			]);*/

		$updateConf = new updateConfig();
		$config = $updateConf->getConfig();
		$tasks = $updateConf->getTasks();
		$updateConf->updateTaskConf($config, $tasks);
	}
	else{
		exit(json_encode([
			'error'=> '密码或者用户名不正确'
			]));
	}
