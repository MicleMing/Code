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
	<link rel="stylesheet" type="text/css" href="../css/overview.css">

	<div class="details-block">
		<ul class="score-lines">
			<li class="score-line">
				<div class="progress-wrapper success">
					<div class="progress-bar" style="width:80%;">
						<span>TTTS</span>
					</div>
				</div>
				<span class="score">80</span>
			</li>

			<li class="score-line">
				<div class="progress-wrapper info">
					<div class="progress-bar" style="width:60%;"></div>
				</div>
				<span class="score">60</span>
			</li>

			<li class="score-line">
				<div class="progress-wrapper warning">
					<div class="progress-bar" style="width:40%;"></div>
				</div>
				<span class="score">40</span>
			</li>

			<li class="score-line">
				<div class="progress-wrapper danger">
					<div class="progress-bar" style="width:20%;"></div>
				</div>
				<span class="score">20</span>
			</li>
		</ul>
	</div>

	<div class="overview-block">
		<div class="overview-score">50</div>
		<p class="overview-info">
			导入工作与你预期的一样。你可以导入一个 .less 文件。
		</p>
		<p class="overview-ops">
			<a href="./detail.php" class="overview-op">查看详情</a>
			<a href="../../web/fix.php" class="overview-op">一键修复</a>
		</p>
	</div>

</div>



</body>
</html>