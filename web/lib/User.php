<?php

include_once 'Entity.php';

class User extends Entity
{
	protected $username;
	protected $password;
	protected $role;

	protected static $class = __CLASS__;

	public function __construct()
	{

	}

	//set 
	public function setUsername($username)
	{
		$this->username = $username;
		return $this;
	}

	public function setPassword($password)
	{
		$this->password = $password;
		return $this;
	}

	public function setRole($role)
	{
		$this->role = $role;
		return $this;
	}

	//get
	public function getUsername()
	{
		return $this->username;
	}

	public function getPassword()
	{
		return $this->password;
	}

	public function getRole()
	{
		return $this->role;
	}
}

/*$user = new User();
$user->setUsername("lanmingming")->setPassword("fzuming")->setRole("0")->save();*/