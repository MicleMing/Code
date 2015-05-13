<?php
/**
 * @author ishowshao
 */
include_once 'Entity.php';

class Task extends Entity
{
    /**
     * zip git svn
     * @var string
     */
    protected $type;

    /**
     * 用户提交的repo url或者zip文件存放位置
     * @var string
     */
    protected $uri;

    /**
     * repo拉取下来之后存放位置或者zip解压路径
     * @var string
     */
    protected $path;

    /**
    * 上传时间
    */
    protected $time;

    /**
     * 所属用户id
     */
    protected $userId;
    
    protected static $class = __CLASS__;

    public function __construct()
    {
    }

    /**
     * @param string $path
     * @return Task
     */
    public function setPath($path)
    {
        $this->path = $path;
        return $this;
    }

    /**
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @param string $type
     * @return Task
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $uri
     * @return Task
     */
    public function setUri($uri)
    {
        $this->uri = $uri;
        return $this;
    }

    /**
     * @return string
     */
    public function getUri()
    {
        return $this->uri;
    }

    public function setTime($time)
    {
        $this->time = $time;
        return $this;
    }

    public function getTime()
    {
        return $this->time;
    }

    public function setUserId($userId) 
    {
        $this->userId = $userId;
        return $this;
    }
    public function getUserId() 
    {
        return $this->userId;
    }
}

//test
//$task = new Task();
//$task->setType('zip')->setUri('a.zip')->setPath('/data/db/a_zip/')->save();
//$t = Task::getById(2);
//var_dump($t);
