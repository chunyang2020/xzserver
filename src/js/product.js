
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
//引入头部header.js
require('../common/atcsjs/header')





// 根据传过来的数据 sessionStorage.lid  来添加查询商品项
$(()=>{
    
    $.get('/product/content', {
        lid: sessionStorage.lid
    }).then(data => {
       // console.log(data)
        let cont = data[0][0],
        pic = data[1][0]
        $('<div class="box"></div>')
            .html(`<div class="cont">
                        <div class="pudc">
                            <div class="pudc_information" id="pudcId3">
                                <img src="../${pic.sm}" class="">
                                <input type="hidden" name="" value="">
                                <span class="des">
                                    ${cont.title}
                                    <input type="hidden" name="" value="">
                                </span>
                                <p class="col"><span>${cont.lname}-</span><span class="color_des">-${cont.category} 
                                <input type="hidden" name=""value=""></span></p>
                            </div>
                        </div>
                        <div class="pices">
                            <p class="pices_des">${cont.subtitle}</p>
                        </div>
                        <div class="num">
                            <span class="reduc">近期销售：${cont.sold_count}台</span>
                        </div>
                        <div class="totle">
                            <span class="totle_information">
                            <ul>
                                <li>屏幕:${cont.resolution}</li>
                                <li> 硬盘: ${ cont.disk} </li>
                                <li> cpu: ${cont.cpu} </li>
                                <li> 显卡: ${cont.video_memory} </li>
                            </ul>
                            </span>
                        </div>
                    </div>
                    <P>其他人看过之后还看了........</p>
                    <div class="box-modal" data-detail="${cont.lid}"></div>
                    `)
        .appendTo($('div.container'))
        
    })
})

// 根据传过来的数据 sessionStorage.lidArr  来添加查询类似商品项
$(() => {
    $.get('/product/like', {
        lidArr: sessionStorage.lidArr
    }).then(data => {
        console.log(data)
        
        for(let i = 0; i < data[0].length; i++){
            let cont = data[0][i],
                pic = data[1][i + (i * 5)]


            $('<div class="box"></div>')
                .html(`<div class="cont">
                        <div class="pudc">
                            <div class="pudc_information" id="pudcId3">
                                <img src="../${pic.sm}" class="">
                                <input type="hidden" name="" value="">
                                <span class="des">
                                    ${cont.title}
                                    <input type="hidden" name="" value="">
                                </span>
                                <p class="col"><span>${cont.lname}-</span><span class="color_des">-${cont.category} 
                                <input type="hidden" name=""value=""></span></p>
                            </div>
                        </div>
                        <div class="pices">
                            <p class="pices_des">${cont.subtitle}</p>
                        </div>
                        <div class="num">
                            <span class="reduc">近期销售：${cont.sold_count}台</span>
                        </div>
                        <div class="totle">
                            <span class="totle_information">
                            <ul>
                                <li>屏幕:${cont.resolution}</li>
                                <li> 硬盘: ${ cont.disk} </li>
                                <li> cpu: ${cont.cpu} </li>
                                <li> 显卡: ${cont.video_memory} </li>
                            </ul>
                            </span>
                        </div>
                    </div>
                    <div class="box-modal" data-detail="${cont.lid}"></div>
                    `)
                .appendTo($('div.container'))
        }

    })
})

//给查询出的商品绑定单击事件 并跳转到详情页
$(()=>{
    $('div.container').on('click', 'div.box-modal', e => {
        location = `http://127.0.0.1:3336/html/product_details.html?lid=${$(e.target).data('detail')}`
    })
})


require('../less/product.less')