<% include "../common/auth" %>
<% include "../common/head" %>

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
				<li class="code-tab"><a href="#jshint-block">JSHint</a></li>
				<li class="code-tab"><a href="#jscs-block">JSCS</a></li>
				<li class="code-tab"><a href="#formatted-diff-block">Formatted Diff</a></li>
			</ul>
			<div id="jshint-block" class="detail-block">
				<div id="jshint-code" class="code-block editer-wrapper"></div>
			</div>
			<div id="jscs-block" class="detail-block">
				<div id="jscs-code" class="code-block editer-wrapper"></div>
			</div>
			<div id="formatted-diff-block" class="detail-block">
				<div id="formatted-diff-code" class="code-block"></div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="../js/detail.js"></script>

<% include "../common/foot" %>