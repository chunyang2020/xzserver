
//引入头部html代码片段 并插入页面指定位置
import headerHtml from '../common/htmljs/header-html'
//引入隐层的头部 并插入指定位置
import hidenHeaderHtml from '../common/htmljs/hiden_header-html'
//引入登录对话框  并插入指定位置
import loginModalHtml from '../common/htmljs/login_modal-html'
//引入footerhtml
import footerHtml from '../common/htmljs/footer-html'
require('../less/index.less')


$('#floor3').html(headerHtml())
$(hidenHeaderHtml()).insertBefore($('div.footer'))
$('div.login-modal').html(loginModalHtml())
$('div.footer').html(footerHtml())


//引入登录js
require('../common/atcsjs/login_modal')
//广告轮播js
require('../common/atcsjs/banner')
//引入头部header.js
require('../common/atcsjs/header')




/
//楼层商品信息请求并展示
$(()=>{
    $.get('http://127.0.0.1:3336/index/banner').then(
        data => {
            //console.log(data)
            //循环得到 模板数据 数组
            let arr = []
            for(let i = 0; i < data.length; i++){
                if( i < 4){
                    arr.push(
                        `<div>
                            <p class="title">${data[i].title}</p>
                            <p class="content">${data[i].details}</p>
                            <p class="price">￥ ${data[i].price}</p>
                            <p class="detail-btn"><a href="html/${data[i].href}">查看详情</a></p>
                        </div>
                        <span>
                            <img src="${data[i].pic}" alt="" />
                        </span>`
                    )
                } else {
                    arr.push(
                        `<span>
                            <img src="${data[i].pic}" alt="" />
                        </span>
                        <div>
                            <p>${data[i].title}</p>
                            <p class="price">￥${data[i].price}</p>
                            <p class="detail-btn"><a href="html/${data[i].href}">查看详情</a></p>
                        </div>
                `
                    )
                }
            }

            //一层、1楼左侧大图
            $('div.first-floor>div.first-floor1>div.left').html(arr[0])
            //一层、1楼右侧图
            $('div.first-floor>div.first-floor1>div.right').html(arr[1])
            //一层、2楼左侧中图
            for(let i = 1; i < 5; i++){
                 $(`div.first-floor>div.first-floor2>div:nth-child(${i})`).html(arr[i + 3])
            }

            //二层、1楼左侧大图
            $('div.second-floor>div.first-floor1>div.left').html(arr[2])
            //二层、1楼右侧图
            $('div.second-floor>div.first-floor1>div.right').html(arr[3])
            //二层、2楼左侧中图
            for (let i = 1; i < 5; i++) {
                $(`div.second-floor>div.first-floor2>div:nth-child(${i})`).html(arr[i + 7])
            }

        }
    )
})


//div.lif楼层电梯的显示  和楼层高亮显示 点击页面滚动到楼层
$(() => {
    //页面滚动显示电梯div.life
    let scrol = () => {
        let scrollTop = document.documentElement.scrollTop ||
            document.body.scrollTop
        let offsetTop1 = $('div#floor1').offset().top,
            offsetTop2 = $('div#floor2').offset().top,
            scr = scrollTop + (innerHeight / 4),
            off1 = offsetTop1,
            off2 = offsetTop2

        if (off1 < scr) {
            $('div.lift').show()
            $('div.lift li:first span').css('color', 'red')
            $('div.lift li:first').siblings().children().children().css('color', '#f5f5f5')
        } else {
            $('div.lift').hide()
        }

        if (off2 < scr) {
            $('div.lift>ul>li:nth-child(2)>a>span').css('color', 'red')
            $('div.lift>ul>li:nth-child(2)').siblings().children().children().css('color', '#f5f5f5')
        }

    }
    $(window).scroll(() => {
        scrol()
        //console.log(1)
    })
    scrol() //页面初始化时用


    //单击高航条滚动至指定楼层
    let scroTo = (tar, num) => { //滚动函数
        let $e = $(tar.target),
            i = $e.parent().parent().index(),
            offsetTop = $(`div#floor${i + 1 -num}`).offset().top

        $('html').stop(true).animate({ //防止动画叠加
            scrollTop: `${offsetTop - 80}`,
        }, 500)
    }
    $('div.lift').on('click', 'span', e => { //电梯触发事件
        scroTo(e, 0)
    })
    $('div.nav').on('click', 'span', e => {
        scroTo(e, 1)
    })
})



//引入样式
require('../less/index.less')



































