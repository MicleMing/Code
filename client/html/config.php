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


<div class="main">
    <script type="text/javascript" src="../js/config.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/config.css">
    <form class="config-container" action='../../web/config.php' method="POST">
    
    	<div class="config-item">
    		<span>单行代码长度 </span>
    		<input type="number" name="maxlength" min="-1000" max="1000" value="120">
    	</div>
    	<div class="config-item">
    		<span>缩进长度 </span>
    		<input type="number" name="indent" min="-1000" max="1000" value="4">
    	</div>
    	<div class="config-item">
    		<span>tab缩进 </span>
    		<input type="checkbox" name="useTabIndent">
    	</div>
    	<div class="config-item">
    		<span class='classify'>空格</span>
    		<div class="config-inner-container">
    			<div class="config-item">
    				<span class='classify'>前后</span>
    				<div class="config-inner-container">
    					<div class="config-item">
    						<span>一元运算符 </span>
    						<input type="checkbox" name="unaryOperations">
    					</div>
    					<div class="config-item">
    						<span>二元运算符 </span>
    						<input type="checkbox" name="binaryOperators" checked="">
    					</div>
    					<div class="config-item">
    						<span>三元运算符 </span>
    						<input type="checkbox" name="ternaryOperation" checked="">
    					</div>
    				</div>
    			</div>
    			<div class="config-item">
    				<span class='classify'>前面</span>
    				<div class="config-inner-container">
    					<div class="config-item">
    						<span>声明式函数圆括号 </span>
    						<input type="checkbox" name="functionDecalarationParentheses">
    					</div>
    					<div class="config-item">
    						<span>函数表达式圆括号 </span>
    						<input type="checkbox" name="functionExpressionParentheses" checked="">
    					</div>
    					<div class="config-item">
    						<span>圆括号 </span>
    						<input type="checkbox" name="parenthess" checked="">
    					</div>
    					<div class="config-item">
    						<span>左侧花括号 </span>
    						<input type="checkbox" name="leftBrace" checked="">
    					</div>
    					<div class="config-item">
    						<span>关键词 </span>
    						<input type="checkbox" name="keywords" checked="">
    					</div>
    				</div>
    			</div>
    			<div class="config-item">
    				<span class='classify'>内部</span>
    				<div class="config-inner-container">
    					<div class="config-item">
    						<span>圆括号 </span>
    						<input type="checkbox" name="parenthess">
    					</div>
    				</div>
    			</div>
    			<div class="config-item">
    				<span class='classify'>其他</span>
    				<div class="config-inner-container">
    					<div class="config-item">
    						<span>键值对分隔符前面 </span>
    						<input type="checkbox" name="beforePropertyNameValueSeparator">
    					</div>
    					<div class="config-item">
    						<span>键值对分隔符后面 </span>
    						<input type="checkbox" name="afterPropertyNameValueSeparator" checked="">
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="config-item">
    		<span class='classify'>bracesPlacement</span>
    		<div class="config-inner-container">
    			<div class="config-item">
    				<span>functionDeclaration </span>
    				<input type="number" name="functionDeclaration" min="-1000" max="1000" value="1">
    			</div>
    			<div class="config-item">
    				<span>other </span>
    				<input type="number" name="other" min="-1000" max="1000" value="1">
    			</div>
    		</div>
    	</div>
    	<div class="config-item">
    		<span class='classify'>blankLines</span>
    		<div class="config-inner-container">
    			<div class="config-item">
    				<span>最大空行数 </span>
    				<input type="number" name="keepMaxBlankLines" min="-1000" max="1000" value="1">
    			</div>
    			<div class="config-item">
    				<span>文件结尾 </span>
    				<input type="checkbox" name="atEndOfFile" checked="">
    			</div>
    		</div>
    	</div>
    	<div class="config-item">
    		<span class='classify'>其它</span>
    		<div class="config-inner-container">
    			<div class="config-item">
    				<span>数组保持单行 </span>
    				<input type="checkbox" name="keepArraySingleLine">
    			</div>
    		</div>
    	</div>
    	<input class="btn" type="submit" value="确定">
    </form>
</div>

<footer class="footer">
	<div class="inner-footer">
		<p class="about">Code Doctor@csfe</p>
	</div>
</footer>