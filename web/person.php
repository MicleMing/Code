<?php
    include_once './lib/Task.php';
    include_once './lib/CONST.php';
    include_once './lib/Zip.php';

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

        /**
         * 下载zip文件
         * @param  [array] $filePath 下载的文件路径
         */
        public function getFile ($filePath) {

            HZip::zipDir(substr($filePath, 0, -4), $filePath);
            //检查文件是否存在
            if (file_exists($filePath)) {
                $file = fopen($filePath, 'r');
                //返回文件类型
                Header('Content-type: application/octet-stream');
                //按字节大小返回
                Header('Accept-Ranges: bytes');
                //返回文件大小
                Header('Accept-Length:'.filesize($filePath));
                //对客户端弹出对话框，提示对应文件名
                Header('Content-Disposition: attachment;filename='.$filePath);

                //开始传输
                
                $buffer = 1024;

                while (!feof($file)) {
                    $file_data = fread($file, $buffer);
                    echo $file_data;
                }
                fclose($file);

                //删除压缩文件
                unlink($filePath);
            }
            else {
                echo "<script>alert('error in download file');</script>";
            }
        }

        /**
         * 格式化代码
         */
        
    }

    $taskInfo = new TaskInfo();

    if (isset($_POST['deleteItem'])) {
        $key = array('time'=>(int)$_POST['deleteItem']);
        $dirName = CONSTANT::uploadUrl.'localUpload/'.$_POST['deleteItem'];
        $isSuccess = $taskInfo->deleteTask($key, $dirName);
        echo json_encode($isSuccess);
        exit();
    }

    if (isset($_GET['download'])) {
        $filePath = CONSTANT::uploadUrl.'localUpload/'.$_GET['download'];
        $taskInfo->getFile($filePath);
        exit();
    }

/*    if (isset($_POST['taskDetail'])) {
        $key = $_POST['taskDetail'];
        
    }*/

    $key = array('userId' => $_SESSION['userId']);
    $tasks = $taskInfo->getTaskInfo($key);
    echo json_encode($tasks);
