<% include "../common/head" %>

    <div class="main">
        <script type="text/javascript" src="../js/register.js"></script>
        <link rel="stylesheet" type="text/css" href="../css/register.css">
        <div class="register-container">
            <p class="login">已有账号？<a href="#">登录</a></p>
            <form id="form" class="inputs" action="">
                <p>用户名:<input type="text" id="username" name="username"></p>
                <p>密&nbsp;&nbsp;&nbsp;码:<input type="password" id="password" name="password"></p>
                <p>
                role:<select id="select" name="role">
                        <option  value="0">个人注册</option>
                        <option  value="1">团队注册</option>
                     </select>
                </p>
            </form>
            <button id="submit">注册</button>
        </div>
    </div>

<% include "../common/footer" %>