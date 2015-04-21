<?php
	session_start();
	include_once "./lib/Task.php";

	class Check extends Task 
	{
		public static $server = "E:/graduation/project/CodeDoctor/server/httpd.js";

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
	echo json_encode(['key'=>$key]) ;
