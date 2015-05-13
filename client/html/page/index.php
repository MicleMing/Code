<% include "../common/auth" %>
<% include "../common/head" %>
<div class="main">
	<link rel="stylesheet" type="text/css" href="../css/index.css">
	<div class="main-content">
		<form id="form" class="inputs" action="../../web/task.php" method="post" enctype="multipart/form-data">
			<input id="url-in" class="input url-in" type="url" name="url" placeholder="SVN/GIT ADDRESS OR ZIP/JS FILE" autofocus>
			<span id="file-btn" class="input file">
				<svg class="icon icon-out" viewBox="0 0 32 32"><use xlink:href="#icon-out"></use></svg>
				<input id="file-in" class="input file-in" type="file" name="file">
			</span>
			<span id="file-name" class="input file-name"></span>
			<button class="input submit" type="submit">Check</button>
		</form>
	</div>
</div>
<script type="text/javascript" src="../js/index.js"></script>
<% include "../common/footer" %>