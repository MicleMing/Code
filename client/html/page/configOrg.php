<% include "../common/auth" %>
<% include "../common/head" %>

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



<% include "../common/foot" %>