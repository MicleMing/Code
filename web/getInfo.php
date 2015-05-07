<?php
	class GetInfo 
	{

		public static $baseUrl = 'E:/graduation/project/CodeDoctor/upload/localUpload/';
		public static $jshintPath = '/jshint.json';
		/**
		 * 获取源代码
		 * @param  {string} $filePath 文件路径
		 * @return {object}           返回源代码
		 */
		public function codeSource ($filePath) {
			$content = file_get_contents($filePath);
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

	}

	$getInfo = new GetInfo();

	//源文件路径
	$filePath = GetInfo::$baseUrl.$_POST['path'];
	//项目文件夹1433434
	$key = explode('/', $_POST['path'])[0];
	//jshint 信息
	$jsHintPath = GetInfo::$baseUrl.$key.GetInfo::$jshintPath;

	//源代码
	$code = $getInfo->codeSource($filePath);
	//jshint 执行信息
	$codeInfo = $getInfo->readJshintJson($jsHintPath, $filePath);


	$result = array('code'=>$code, 'codeInfo'=>$codeInfo);
	echo json_encode($result);