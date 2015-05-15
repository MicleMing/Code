<?php
	session_start();
	include_once "./lib/Task.php";
	include_once "./lib/CONST.php";

	class Check extends Task 
	{
		public static $server = CONSTANT::server;

		public function execTask ($dirPath)
		{
			$fileName = self::$server;
			unset($info);
			exec("node $fileName $dirPath",$info,$val);
		}

	}

/*	$check = new Check();

	if (isset($_GET['item'])) {
		$time = $_GET['item'];
	}elseif (isset($_SESSION['file'])) {
		$time = $_SESSION['file'];
	}
	
	$checkFile = $check->getByPro(array('time'=>(int)$time));
	$dirPath = $checkFile[0]->getPath();
	$key = $checkFile[0]->getTime();
	$check->execTask($dirPath);

	//返回上传文件的唯一标示
	echo json_encode(['key'=>$key]);*/
