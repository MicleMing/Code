<% include "../common/auth" %>
<% include "../common/head" %>

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

<% include "../common/footer" %>