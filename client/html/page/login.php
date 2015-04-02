<% include "../common/head" %>

    <div class="main">
        <script type="text/javascript" src="../js/login.js"></script>
        <link rel="stylesheet" type="text/css" href="../css/login.css">
        <div class="login-container">
            <p class="register">没有账号？<a href="#">注册</a></p>
            <form id="form" class="inputs" action="">
                <p>用户名:<input type="text" id="username" name="username"></p>
                <p>密&nbsp;&nbsp;&nbsp;码:<input type="password" id="password" name="password"></p>
                <p>
                role:<select id="select" name="role">
                        <option  value="0">个人登录</option>
                        <option  value="1">团队登录</option>
                     </select>
                </p>
            </form>
            <button id="login">登录</button>
        </div>
    </div>

<% include "../common/footer" %>