<?php
class Entity
{
    /**
     * @var int
     */
    protected $_id;

    protected static $class = __CLASS__;//该常量表示当前类的名称

    /**
     * @param int $id
     * @return $this
     */
    public function setId($id)
    {
        $this->_id = $id;
        return $this;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->_id;
    }

    public function save()
    {
        include_once 'Db.php';
        $collectionName = strtolower(get_class($this));
       // echo "name:".$collectionName;
        $collection = Db::getInstance()->getCollection($collectionName);

        //echo "id:".$this->_id;
        if (isset($this->_id)) {
            $entity = $collection->findOne(array('_id' => $this->_id));
            //var_dump($entity);
            if ($entity) {
                $data = $this->toArray();
                foreach ($data as $key => $value) {
                    $entity[$key] = $value;
                }
                $collection->save($entity);
            }
        } else {
            $this->_id = Db::getInstance()->autoIncrement($collectionName);
            var_dump($this->toArray());
            $collection->insert($this->toArray());
        }

        return $this;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        $array = get_object_vars($this);
        $array['id'] = $array['_id'];
        return $array;
    }

    /**
     * @param $array
     * @return $this
     */
    public function fromArray($array)
    {
        $tplArray = $this->toArray();
        foreach ($tplArray as $key => $value) {
            $methodName = 'set' . ucfirst($key);
            if (isset($array[$key]) && method_exists($this, $methodName)) {
                $this->$methodName($array[$key]);
            }
        }
        return $this;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public static function getById($id)
    {
        include_once 'Db.php';
        $name = strtolower(static::$class);
        //echo "class:". static::$class;
        $collection = Db::getInstance()->getCollection($name);

        $result = null;

        $data = $collection->findOne(array('_id' => $id));

        if ($data) {
            $className = ucfirst($name);
            /**
             * @var Entity $entity
             */
            $entity = new $className();
            $vars = $entity->toArray();
            foreach ($vars as $key => $value) {
                if ($key == '_id') {
                    $entity->setId($data['_id']);
                } elseif ($key != 'id') {
                    $methodName = 'set' . ucfirst($key);
                    $entity->$methodName($data[$key]);
                }
            }

            $result = $entity;
        }
        return $result;
    }

    /**
    * @param string $property
    * @param string $value
    * @param array
    */

    public function getByPro($property,$value)
    {
        include_once 'Db.php';
        $collectionName = strtolower(get_parent_class($this));
        //echo $collectionName;
        $collection = Db::getInstance()->getCollection($collectionName);

        $result = array();
        $cursor = $collection->find(array($property => $value));

        if ($cursor) {
            $className = ucfirst($collectionName);
            foreach ($cursor as $data) {
                $entity = new $className();
                $vars = $entity->toArray();
                foreach ($vars as $key => $value) {
                    if ($key == "_id"){
                        $entity->setId($data[$key]);
                    }elseif ($key != "id") {
                        $methodName = "set".ucfirst($key);
                        $entity->$methodName($data[$key]);
                    }
                }
                array_push($result, $entity);
            };
        }
        return $result;
    }

    /**
     * @return array
     */
    public static function getAll()
    {
        include_once 'Db.php';
        $name = strtolower(static::$class);
        $collection = Db::getInstance()->getCollection($name);

        $result = array();

        $cursor = $collection->find();

        if ($cursor) {
            $cursor->sort(array('_id' => 1));

            $className = ucfirst($name);
            foreach ($cursor as $data) {
                /**
                 * @var Entity $entity
                 */
                $entity = new $className();
                $vars = $entity->toArray();
                foreach ($vars as $key => $value) {
                    if ($key == '_id') {
                        $entity->setId($data['_id']);
                    } elseif ($key != 'id') {
                        $methodName = 'set' . ucfirst($key);
                        $entity->$methodName($data[$key]);
                    }
                }
                array_push($result, $entity);
            }
        }

        return $result;
    }
}

/*$entity = new Entity();
Entity::getById($entity->getId());
$entity->setId(1);
$entity->save();*/
