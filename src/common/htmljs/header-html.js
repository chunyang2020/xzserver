/*
页面分为三部分  头部 header  主题 container  底部 footer 三个div;
此功能放在 < div class = "header"id = 'floor3' > 中 id为页面滚动导航;

此div的位置属于页面头部;

对应acts_js  为  js/acts_js/header.js;
对应的less 为 less/acts_less/header.less;
*/

export default function () {
    return (`<div class="iframe">
            <div class="row header-top">

                <!--1图标列-->
                <div class="col-xs-2 left-l">
                    <a href="javascript: location='/index.html'" target="_parent"><img src="../img/footer/log.png" alt="图标" /></a>
                </div>

                <!-- 2搜索input框列-->
                <div class="col-xs-5 midl-m textArea">
                    <!--2.1搜索框-->
                    <input type="text" class="txtSearch" placeholder="请输入您要搜索的内容">
                    <!--2.2分类搜索-->
                    <a href="javascript:" class="sortSearch">分类搜索</a>

                    <!--2.4放大镜的搜索图片-->
                    <img class="searchImg" src="../img/header/search.png" data-trigger="search">

                    <!--2.3倒三角-->
                    <i class="caret"></i>
                    <!-- 隐藏的搜索帮助 -->
                    <ul class="shelper top" style="display: none;">
                    </ul>
                </div>

                <!--3导航列-->
                <div class="col-xs-4 right-r">
                    <ul class="list-inline list-l">
                        <li>
                            <a href="javascript:location='/html/favorite.html'" target="_parent">
                                <img src="../img/header/care.png" 
                                data-pass title = "已收藏商品">
                            </a>
                            <b>|</b>
                        </li>
                        <li>
                            <a href="javascript:location='/html/orders.html'" target="_parent">
                                <img src="../img/header/order.png" 
                                data-pass title = "订单详情">
                            </a>
                            <b>|</b>
                        </li>
                        <li>
                            <a href="javascript:location='/html/cart.html'" >
                                <img src="../img/header/shop_car.png"
                                data-pass title="购物车">
                            </a>
                            <b>|</b>
                        </li>
                        <li>
                            <a href="javascript: location='/html/register.html'" data-ur='sele'>注册</a>
                            <b>|</b>
                        </li>
                        <li>
                            <a href = "javascript: location='/html/login.html'"> 登录 </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`)
}
