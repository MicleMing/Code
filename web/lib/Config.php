<?php
	include_once './lib/Entity.php';
	class Config extends Entity
	{

		public $config;
		public $userId;

		public function getConfig ()
		{
			return $this->config;
		}

		public function setConfig ($config)
		{
			$this->config = $config;
			return $this;
		}

		public function getUserId ()
		{
			return $this->userId;
		}

		public function setUserId ($userId)
		{
			$this->userId = $userId;
			return $this;
		}

	}