/*
此div为楼层滚动显示的div
在页面位置为独立位置 不属于任何页面部分  
在footer之上就可以  常态display：none
其行为js  在js/acts/header.js中
less样式为less/actsLess/hiden-header.less
*/



export default function () {
    return (`<!-- 滚动显示的搜索框 -->
        <div class='hiden-header row'>
            <!--1图标列-->
            <div class="col-xs-2 left-l">
                <a href="../index.html" target="_parent"><img src="../img/footer/log.png" alt="图标" /></a>
            </div>

            <!-- 2搜索input框列-->
            <div class="col-xs-5 midl-m">
                <!--2.1搜索框-->
                <input type="text" class="txtSearch" placeholder="请输入您要搜索的内容">
                <!--2.2分类搜索-->
                <a href="#" class="sortSearch">分类搜索</a>

                <!--2.4放大镜的搜索图片-->
                <img class="searchImg" src="../img/header/search.png" data-trigger="search">

                <!--2.3倒三角-->
                <i class="caret"></i>
                <!-- 隐藏的搜索帮助 -->
                <ul class="shelper hiden" style="display: none;">
                </ul>
            </div>
        </div>`
    )
}
