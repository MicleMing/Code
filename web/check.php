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

	$check = new Check();

	$time = $_SESSION['file'];
	$checkFile = $check->getByPro(array('time'=>$time));
	$dirPath = $checkFile[0]->getPath();
	$key = $checkFile[0]->getTime();
	$check->execTask($dirPath);
	echo json_encode(['key'=>$key]);
