//引入头部html代码片段 并插入页面指定位置
import headerHtml from '../common/htmljs/header-html'
//引入隐层的头部 并插入指定位置
import hidenHeaderHtml from '../common/htmljs/hiden_header-html'
//引入登录对话框  并插入指定位置
import loginModalHtml from '../common/htmljs/login_modal-html'
//引入footerhtml
import footerHtml from '../common/htmljs/footer-html'
//引入商品展示html
import detailHtml from '../common/htmljs/detail_html'
require('../less/index.less')


$('#floor3').html(headerHtml())
$(hidenHeaderHtml()).insertBefore($('div.footer'))
$('div.login-modal').html(loginModalHtml())
$('div.footer').html(footerHtml())


//引入登录js
require('../common/atcsjs/login_modal')
//引入头部header.js
require('../common/atcsjs/header')

//根据lid查找商品详情
$(()=>{
    let lid = location.search.split('=')[1]
    $.get('/product/details', {lid: lid}).then(data =>{
        let detail = data[0][0],
        pic = data[1]
        //向页面添加商品展示内容 价格等等。。。。。
        $('div.shop-detail>div.rg').html( detailHtml(detail))
        //换左侧展示图
        $('div.lg-png>img').attr('src', `${'../' + pic[0].md}`)
        for(let i = 0; i < 5; i++){
            $(`div.sm-png>ul>li:nth-child(${i + 1})`).children('img')
                .attr('src', `${'../' + pic[i].sm}`)
        }
    })

})


//小图单机改变大图的单击事件
$(()=> {
    $('div.shop-detail>div.lf>div.sm-png>ul').on('click', 'li', e => {
        
         let arr = $(e.target).attr('src').split('/'),
         arr1 = []
         arr.forEach(ele => {
             if(ele == 'sm'){
                 ele = 'md'
             }
             arr1.push(ele)
         });

            $('div.shop-detail>div.lf>div.lg-png>img').attr('src', arr1.join('/'))     
    })
})


//商品购物展示区 的一些小的单机事件
$(() => {
    //颜色选择
    $('div.shop-detail>div.rg').on('click', 'input[type=button]', e => {
        $(e.target).addClass('selected').siblings('input').removeClass('selected')
    })
    //尺寸选择
    $('div.shop-detail>div.rg').on('click', 'span.avenge', e => {
        $(e.target).addClass('selected').siblings('span').removeClass('selected')
    })
    //数量的选择
    $('div.shop-detail>div.rg').on('click', 'button', e => {
        let $e = $(e.target),
        input = $e.siblings('input')
        //console.log($e.text())
         if($e.text() == '-'){
            input.val( input.val() - 1 )
        }else{
            input.val(Number(input.val()) + 1)
        }
        if (input.val() <= 0) input.val(1)
    })

    
        

    //立即购买
    $('div.shop-detail>div.rg').on('click', 'a.buy', e => {
        $.get('/islogin').then(data => {
            if(data.code < 0){
                $('div.login-modal').css('display', 'block')
            } else {
                let lid = Number(location.search.split('=')[1]) || '',
                    color = $('p.choose_color>input.selected').val() || 0,
                    count = parseInt($('p.account>input').val()),
                    size = $('p.size>span.selected').html() || 0,
                    price = parseInt($('div.pro_price>span').html().slice(1))
                //console.log(lid, color, count, size)
                if (lid !== '' && color != 0 && count >= 1 && size != 0) {
                    location = `/html/orderPay.html?lid=${lid}&count=${count}&size=${size}&price=${price}`
                } else {
                    $('div.rg div.message').html('<span>请选择此栏内选项进行购买<span>')
                        .show()
                    setTimeout(() => {
                        $('div.rg div.message').hide(500)
                    }, 1500)
                }
            }
        })
    })

    //加入购物车
    $('div.shop-detail>div.rg').on('click', 'a.shop', e => {
        $.get('/islogin').then(data => {
            if (data.code < 0) {
                $('div.login-modal').css('display', 'block')
            } else {
                let lid = Number(location.search.split('=')[1]) || '',
                color = $('p.choose_color>input.selected').val() || 0,
                count = parseInt($('p.account>input').val()),
                size = $('p.size>span.selected').html() || 0
                console.log(lid, color, count, size)
                if(lid !== '' && color != 0 && count >= 1 && size != 0){
                    $.get('/cart/verify').then(data => {
                        let idArr = []
                        for( let ele of data){
                            idArr.push(ele.product_id)
                        }
                        let i = idArr.indexOf(lid)
                        //console.log(i, idArr.length)
                        if(idArr.length !== 0 && i != -1){
                            $('div.rg div.message').html('<span>此商品已加入购物车，请在购物车内查找<span>')
                             .show()
                             setTimeout(()=>{
                                $('div.rg div.message').hide(500)
                             }, 1500)
                        }else{
                            $.get('/cart/insert', {
                                lid: lid
                            }).then(() =>{
                                $('div.rg div.message').html('<span>商品已加入购物车<span>')
                                    .show()
                                setTimeout(() => {
                                    $('div.rg div.message').hide(500)
                                }, 1500)
                            })
                        }
                    })
                } else {
                    $('div.rg div.message').html('<span>请选择此栏内选项，让我们更了解您<span>')
                        .show()
                    setTimeout(() => {
                        $('div.rg div.message').hide(500)
                    }, 1500)
                }
            }
        })
    })

    ////收藏
    $('div.shop-detail>div.rg').on('click', 'a.collection', e => {
        $.get('/islogin').then(data => {
            if (data.code < 0) {
                $('div.login-modal').css('display', 'block')
            } else {
                 let lid = Number(location.search.split('=')[1]) || '',
                     color = $('p.choose_color>input.selected').val() || 0,
                     count = parseInt($('p.account>input').val()),
                     size = $('p.size>span.selected').html() || 0
                 console.log(lid, color, count, size)
                 if (lid !== '' && color != 0 && count >= 1 && size != 0) {
                     $.get('/cart/favorite').then(data => {
                         let idArr = []
                         for (let ele of data) {
                             idArr.push(ele.product_id)
                         }
                         let i = idArr.indexOf(lid)
                         //console.log(i, idArr.length)
                         if (idArr.length !== 0 && i != -1) {
                             $('div.rg div.message').html('<span>此商品已收藏过，请在收藏夹内查找<span>')
                                 .show()
                             setTimeout(() => {
                                 $('div.rg div.message').hide(500)
                             }, 1500)
                         } else {
                             $.get('/cart/favorInsert', {
                                 lid: lid
                             }).then(() => {
                                 $('div.rg div.message').html('<span>商品已加入收藏夹<span>')
                                     .show()
                                 setTimeout(() => {
                                     $('div.rg div.message').hide(500)
                                 }, 1500)
                             })
                         }
                     })
                 } else {
                     $('div.rg div.message').html('<span>请选择此栏内选项，让我们更了解您<span>')
                         .show()
                     setTimeout(() => {
                         $('div.rg div.message').hide(500)
                     }, 1500)
                 }

            }
        })
    })

    //加入购物车的第二个按钮
    $('div.iteminfo div.cart.rt').click(()=>{
        // let scrollTop = document.documentElement.scrollTop ||
        //     document.body.scrollTop
        $('html').stop(true).animate({ //防止动画叠加
            scrollTop: 0,
        }, 500)
        $('div.shop-detail>div.rg a.shop').click()
    })

}) 

//广告轮播
$(() => {
    
    let a = 0, 
    bannerMove = () => {
        a += 2
        if (a > 960) {
            a = 0
            $('div.demo>div.surface>div.indemo').css({
                transition: 'none',
                left: `-${a}px`
            })
            return
        }
        $('div.demo>div.surface>div.indemo').css({
            transition: 'all .05s linear',
            left: `-${a}px`
        })
    },
    timer = setInterval(() => {
        bannerMove()

    }, 50)

    $('div.demo>div.surface>div.indemo').on('mouseenter', ()=>{
        clearInterval(timer)
    })
    $('div.demo>div.surface>div.indemo').on('mouseleave', () => {
        timer = setInterval(()=>{
            bannerMove()
        }, 50)
    })
    
    //clearInterval(timer)
})

//楼层滚动定位
$(()=>{
    $(window).scroll(() => {
        let scrollTop = document.documentElement.scrollTop ||
            document.body.scrollTop
        let offsetTop = $('div.iteminfo').offset().top
        if(scrollTop >= offsetTop){
            $('div.iteminfo div.item').addClass('itemFixed')
            $('div.iteminfo div.aside_nav').addClass('navFixed')
            
        } else {
            $('div.iteminfo div.item').removeClass('itemFixed')
            $('div.iteminfo div.aside_nav').removeClass('navFixed')
        }
        //console.log( offsetTop)
    })
})



require('../less/product_details.less')