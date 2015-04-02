<% include "../common/auth" %>
<% include "../common/head" %>

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
			<a href="./detail.php" class="overview-op">一键修复</a>
		</p>
	</div>

</div>

<% include "../common/foot" %>