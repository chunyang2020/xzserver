/*
页面分为三部分  头部 header  主题 container  底部 footer 三个div;
此功能放在  <div class="login-modal">  中;

<div class = "login-modal">此div的位置在页面的 container 和 footer 之间，不属于任何页面部分;
div.login-modal此div display为none;
对应acts_js  为  js/acts_js/login-modal.js;
对应的less 为 less/acts_less/login-modal.less;

*/

export default function () {
    return (`<div class="login-table">
            <button>X</button>
            <p>
                登录解锁功能
                <span>
                    <a href="html/register.html">新用户注册</a>
                </span>
            </p>
            <div class="user">
                <input type="text" placeholder="请输入用户名">
                <span>
                    <img src="../img/register/yhm.png" alt="">
                </span>
                <div data-type=0></div>
            </div>
            <div class="pwd">
                <input type="password" placeholder="请输入密码">
                <span>
                    <img src="../img/register/mm.png" alt="">
                </span>
                <div data-type=0></div>
            </div>
            <div class="chose">
                <label>
                    <input type="checkbox">
                    :自动登录
                </label>
                <span>
                    <a href="#">忘记密码?</a>
                </span>
            </div>
            <input type="button" value="登录">
            <div></div>
        </div>`)
}
