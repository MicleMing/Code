<?php
	include_once './lib/CONST.php';
	class GetInfo 
	{

		public static $baseUrl = 'E:/graduation/project/CodeDoctor/upload/localUpload/';
		public static $jshintPath = '/jshint.json';
		public static $fecsPath = '/fecs.json';
		/**
		 * 获取源代码
		 * @param  {string} $filePath 文件路径
		 * @return {object}           返回源代码
		 */
		public function codeSource ($filePath) {
			$content = file_get_contents($filePath);
			//var_dump($content);
			return $content;
		}
		/**
		 * 获取jshint输出信息
		 * @param  {string} $jsonPath 
		 * @param  {string} $filePath 需要获取的文件
		 * @return {object}        
		 */
		public function readJshintJson ($jsonPath, $filePath) {
			$content = json_decode(file_get_contents($jsonPath));
			$filter = array();
			foreach ($content as $item) {
				if (is_object($item) && property_exists($item, 'fileName')) {
					if (strcasecmp (str_replace('/', '\\', $filePath),$item->fileName.'.js') == 0) {
						array_push($filter, $item);
					}
				}
			}
			return $filter;
		}

		/**
		 * 获取fecs信息
		 * @param  [string] $jsonPath 
		 * @param  [string] $fileName 
		 * @return [object]           
		 */
		public function readfecsJson ($jsonPath, $fileName) {
			$content = json_decode(file_get_contents($jsonPath));
			$filter = array();
			foreach ($content as $item) {
				if (is_object($item) && property_exists($item, 'fileName')) {
					if (strcasecmp(str_replace('/', '\\', $fileName),$item->fileName) == 0) {
						$filter = $item;
					}
				}
			}
			return $filter;
		}

		public function execFormatter ($filePath) {
			$formatter = CONSTANT::formatter;
			exec("node $formatter $filePath",$info,$val);
			$code = implode('<br>', $info);
	
			echo $code;
			exit();
		}

	}

	$getInfo = new GetInfo();

	//源文件路径
	$filePath = GetInfo::$baseUrl.str_replace('\\', '/', $_POST['path']);

	//执行formatter
	if (isset($_POST['formatter'])) {
		$getInfo->execFormatter($filePath);
	}
	//项目文件夹1433434
	$key = explode('/', $_POST['path'])[0];
	//jshint 信息
	$jsHintPath = GetInfo::$baseUrl.$key.GetInfo::$jshintPath;

	//fecs 信息
	$fecsJson = GetInfo::$baseUrl.$key.GetInfo::$fecsPath;

	//源代码
	$code = $getInfo->codeSource($filePath);
	//$code = $getInfo->codeSource("E:/graduation/project/CodeDoctor/upload/localUpload/1431764379/1/jshint/php.js");
	//jshint 执行信息
	$codeInfo = $getInfo->readJshintJson($jsHintPath, $filePath);

	//fecs执行信息
	$fecsInfo = $getInfo->readfecsJson($fecsJson, $_POST['path']);




	$result = array('code'=>$code, 'codeInfo'=>$codeInfo, 'fecsInfo' => $fecsInfo);
	echo json_encode($result);