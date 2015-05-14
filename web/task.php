<?php
	include_once "./lib/Task.php";
	include_once "./lib/CONST.php";
	session_start();
	class DoTask extends Task
	{

		public function repo($filename) 
		{

			$this->time = time();
			unset($info);
			$url = CONSTANT::uploadUrl."repo/$this->time";
			exec("git clone $filename $url",$info,$val);
			$userId = $_SESSION['userId'];
			$this->setUri($filename)->setPath($url)->settype('git')->setUserId($userId)->save();
		}

		public function localUpload()
		{
			$this->time = time();

			//只能上传压缩文件
			if($_FILES['file']['type'] == 'application/octet-stream')
			{
				if ($_FILES['file']['error'])
				{
					echo 'Error:'.$_FILES['file']['error'];
				}
				else
				{
					$url = CONSTANT::uploadUrl."localUpload/$this->time";
					if(file_exists($url))
					{
						echo "文件已经存在";
					}
					else
					{
						//解压
						$zip = new ZipArchive; 
						$res = $zip->open($_FILES['file']['tmp_name']);

						if ($res == true)
						{
							$zip->extractTo($url);
							$zip->close();
							$userId = $_SESSION['userId'];
							$this->setUri($_FILES['file']['name'])->setPath($url)->settype('zip')->setUserId($userId)->save();
						}
						else
						{
							echo "error code:".$res;
						}
					}
				}
			}

		}
		
	}


	$doTask = new DoTask();

	$repoUrl = $_POST['url'];
	$zipName = $_FILES['file']['tmp_name'];
	$successPage = '../client/html/overview.php';

	if(isset($repoUrl)&&$repoUrl != '')
	{
		echo "repo:".$repoUrl;
		$doTask->repo($repoUrl);
		$fileKey = $doTask->getTime();
		$_SESSION['file'] = $fileKey;
		header("Location: $successPage");

	}
	elseif (isset($zipName)&&$zipName != '') {
		echo "zipName:".$zipName;
		$doTask->localUpload();
		$fileKey = $doTask->getTime();
		$_SESSION['file'] = $fileKey;
		header("Location: $successPage");
	}
	else
	{
		$prePage = $_SERVER['HTTP_REFERER'];
		header("Location: $prePage");
	}