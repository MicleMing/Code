<?php
    include_once './lib/Task.php';
    include_once './lib/CONST.php';

    session_start();

    class TaskInfo extends Task
    {
        /**
         * 获取task列表
         * @param  [array] $key 查询条件
         * @return [array]      查询结果
         */
        public function getTaskInfo ($key) {
            $tasks = $this->getByPro($key);
            return $tasks;
        }

        /**
         * 递归删除文件夹
         * @param  [string] $dirName 
         */
        function delDirAndFile ($dirName) {
            if ($handle = opendir("$dirName") ) {
                while (false !== ( $item = readdir($handle))) {
                    if ($item != "." && $item != ".." ) {
                        if (is_dir("$dirName/$item")) {
                            $this->delDirAndFile("$dirName/$item");
                        } 
                        else {
                            unlink("$dirName/$item");
                        }
                    }
                }
               closedir($handle);
               rmdir($dirName);
            }
        }

        /**
         * 删除
         * @param  [array] $key 删除条件
         * @return [boolean]      是否删除
         */
        public function deleteTask ($key, $dirName) {
            $isSuccess = $this->delete($key);
            if ($isSuccess['err'] == null) {
                $this->delDirAndFile($dirName);
            }
        }

        /**
         * 查看详情，其实就是设置session['file']
         */
        public function detailTask ($file) {
            $_SESSION['file'] = $file;
        }
    }

    $taskInfo = new TaskInfo();

    if (isset($_POST['deleteItem'])) {
        $key = array('time'=>(int)$_POST['deleteItem']);
        $dirName = CONSTANT::uploadUrl.'localUpload/'.$_POST['deleteItem'];
        $isSuccess = $taskInfo->deleteTask($key, $dirName);
        echo json_encode($isSuccess);
        exit();
    }

/*    if (isset($_POST['taskDetail'])) {
        $key = $_POST['taskDetail'];
        
    }*/

    $key = array('userId' => $_SESSION['userId']);
    $tasks = $taskInfo->getTaskInfo($key);
    echo json_encode($tasks);
