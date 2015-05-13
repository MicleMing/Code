<?php
	include_once './lib/Config.php';
	session_start();
	class doConfig extends Config
	{
/*		public $map;
		public $config;
		public function configHash (config) {
			$this->map = array(
								 '单行代码长度' => 'maxlength',
								 '缩进长度' => 'indent',
								 'tab缩进' => 'useTabIndent',
								 '空格' => array(
								 	'前后' => array(
								 		'一元运算符' => 'unaryOperations' ,
								 		'二元运算符' => 'binaryOperators',
								 		'三元运算符' => 'ternaryOperation'
								 		 ),
								 	'前面' => array(
								 		'声明式函数圆括号' => 'functionDecalarationParentheses',
								 		'函数表达式圆括号' => 'functionExpressionParentheses',
								 		'圆括号' => 'parenthess',
								 		'左侧花括号' => 'leftBrace',
								 		'关键词' => 'keywords'
								 		),
								 	'内部' => array(
								 		'圆括号' => 'parenthess'
								 		),
								 	'其它' => array(
								 		'键值对分隔符前面' => 'beforePropertyNameValueSeparator',
								 		'键值对分隔符后面' => 'afterPropertyNameValueSeparator'
								 		 )
								 	),
								 '空行' => array(
								 		'最大空行数' => 'keepMaxBlankLines',
								 		'文件结尾' => 'atEndOfFile'
								 	),
								 '其它' => array(
								 		'数组保持单行' => 'keepArraySingleLine'
								 	)
								 );
				return $this;
			
		}

		public function translate ($origin) {
			if (!is_array($origin)) {
				return false;
			}
			foreach ($this->map as $key => $value) {
				if (is_array($value)) {
					translate($value);
				}
				else {
					if (in_array($key, $_POST)) {

					}
				}
			}

			array_map(, arr1)
		}*/


		public function storeConfig ($config)
		{
			$this->setConfig($config)->setUserId($_SESSION['userId']);
			return $this;
		}

	}

	$doConf = new doConfig();

	$doConf->storeConfig(json_encode($_POST))->update(
		array('userId'=>$_SESSION['userId']),
		array('config'=>$doConf->getConfig())
		);
