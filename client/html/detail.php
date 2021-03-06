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
                echo "<a href='./person.php' class='personal'>个人中心</a>";
            }
        ?> 
        </h1>    
	</div>
</header>


<script type="text/javascript" src="../dep/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="../dep/fancytree/dist/jquery.fancytree.min.js"></script>
<script type="text/javascript" src="../dep/ace-builds/src-min-noconflict/ace.js"></script>
<script type="text/javascript" src="../dep/diff-merge/dist/diff.min.js"></script>
<link rel="stylesheet" type="text/css" href="../dep/fancytree/dist/skin-lion/ui.fancytree.min.css">
<link rel="stylesheet" type="text/css" href="../css/detail.css">

<div class="main">
	<div id="menu-wrapper" class="menu-wrapper">
		<div id="menu-tree" class="menu-tree">
		</div>
	</div>
	<div id="detail-wrapper" class="detail-wrapper">
		<div id="code-blocks" class="code-blocks">
			<ul class="code-tabs">
				<li class="code-tab"><a href="#jshint-block">代码语法检查</a></li>
				<li class="code-tab"><a href="#jscs-block">代码格式检查</a></li>
				<li class="code-tab"><a href="#formatted-fix-block">代码实时格式化</a></li>
				<li class="code-tab"><a href="#formatted-diff-block">Formatted Diff</a></li>
			</ul>
			<div id="jshint-block" class="detail-block">
				<div id="jshint-code" class="code-block editer-wrapper"></div>
			</div>
			<div id="jscs-block" class="detail-block">
				<div id="jscs-code" class="code-block editer-wrapper"></div>
			</div>
			<div id="formatted-fix-block" class="detail-block">
				<div id="formatted-fix-code" class="code-block editer-wrapper"></div>
			</div>
			<div id="formatted-diff-block" class="detail-block">
				<div id="formatted-diff-code" class="code-block"></div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="../js/detail.js"></script>

<footer class="footer">
	<div class="inner-footer">
		<p class="about">Code Doctor@csfe</p>
	</div>
</footer>