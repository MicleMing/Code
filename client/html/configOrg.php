<?php
    @session_start();
    if(!isset($_SESSION['username'])){
        $login = '../html/login.php';
        header("Location: $login");
    }
?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>Code Doctor</title>
	<script type="text/javascript" src="../dep/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="../js/util.js"></script>
    <script type="text/javascript" src="../js/cookie.js"></script>
    <script type="text/javascript" src="../js/logout.js"></script>
	<link rel="stylesheet" type="text/css" href="../css/main.css">
</head>
<body>

<svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="756" height="224" viewBox="0 0 756 224">
<defs>

<g id="icon-out">
	<path class="path1" d="M30 14c-1.105 0-2 0.896-2 2v12h-24v-12c0-1.104-0.894-2-2-2s-2 0.896-2 2v14c0 1.105 0.894 2 2 2h28c1.105 0 2-0.895 2-2v-14c0-1.104-0.895-2-2-2zM14 20c0 1.105 0.895 2 2 2s2-0.895 2-2v-12h6l-8-8-8 8h6v12z"></path>
</g>

</svg>

<header class="header">
	<div class="inner-header">
		<h1 class="title">
			<a href="./index.php">Code Doctor</a>
		
        <?php
            @session_start();
            if(isset($_SESSION['username'])){
                //echo $_SESSION['username'];
                echo "<a href='#' class='logout'>退出</a>";
                echo "<a href='#' class='personal'>个人中心</a>";
            }
        ?> 
        </h1>    
	</div>
</header>


<div class="main">
	<script type="text/javascript" src="../js/configOrg.js"></script>
	<link rel="stylesheet" type="text/css" href="../css/configOrg.css">

	<div class="config-org">
        <form id="form" class="org" action="">
            <p>团队名称:<input type="text" id="username" name="username"></p>
            <p>团队描述:<input type="text" id="descript" name="descript"></p>
            <p>负责人姓名:<input type="text" id="name" name="name"></p>
            <p>负责人邮箱:<input type="email" id="email" name="email"></p>
        </form>
        <button id="configOrg">确定</button>
	</div>

</div>



<footer class="footer">
	<div class="inner-footer">
		<p class="about">Code Doctor@csfe</p>
	</div>
</footer>