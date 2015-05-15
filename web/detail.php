<?php
	session_start();
	class Detail
	{
		public $key;
		public function getDetailItem () {
			if (isset($_GET['item'])) {
				$this->key = $_GET['item'];
			}elseif (isset($_SESSION['file'])) {
				$this->key = $_SESSION['file'];
			}
			echo json_encode(['key'=>$this->key]);
		}
	}

	$detail = new Detail();
	$detail->getDetailItem();