//引入头部html代码片段 并插入页面指定位置
import headerHtml from '../common/htmljs/header-html'
//引入隐层的头部 并插入指定位置
import hidenHeaderHtml from '../common/htmljs/hiden_header-html'
//引入footerhtml
import footerHtml from '../common/htmljs/footer-html'

import siteAddress from '../../address.js'

require('../less/index.less')

$('#floor3').html(headerHtml())
$(hidenHeaderHtml()).insertBefore($('div.footer'))
$('body>div.footer').html(footerHtml())


//引入头部header.js
require('../common/atcsjs/header')
require('../less/orderPay.less') 

//收件地址的请求
let addressGet = function(){
    $.get('/order/pay').then(data => {
        //console.log(data)
        let html = ''
        for (let a of data) {
            html += `<div class="show_infor" data-defualt=${a.is_default} data-aid="${a.aid}">
                    <div class="name">
                        <span>${a.receiver}</span>
                    </div>
                    <div>
                        <span>${a.province}</span>
                        <span>${a.city}</span>
                        <span>${a.county}</span>
                        <span>${a.address}</span>
                        <span>${a.cellphone}</span>
                        <span>${a.postcode}</span>
                        <span class="none tacit">${a.is_default == 1?'默认地址':'设置为默认地址'}</span>
                    </div>
                </div>`
        }
        $('div.none_infor').html(html)
        $('div.addres>div.d2').html($('div.none_infor>div[data-defualt=1]').clone(true)[0])


    })
}
//页面初始化执行
$(()=>{
    addressGet()
})


//已有的地址的显示和隐藏
$('div.addres>a').on('click', 'span', e => {
    if (/更多*/.test($(e.target).html())) {
        $(e.target).html('收起地址>>')
    } else {
        $(e.target).html('更多地址>>')
    }
    $(e.target).parent().prev().toggle(500)
})
//每一条信息添加单机事件
$('div.none_infor').on('click', 'div.show_infor', function(){
    let tar = $(this)
    //console.log()
    $('div.addres>div.d2').html(tar.clone()[0])
})
//每一条信息上添加默认地址单机事件
$('div.none_infor').on('click', 'span.none', e=>{
   let $e = $(e.target),
   aid = $e.parent().parent().data('aid')
   $.get('/order/receiver',{aid: aid}).then(addressGet) 
})



//添加地址的点击事件
$('div.addres>div.d1>p:last-child').click(()=>{
    //console.log(222)
    $('div.insert_adres').addClass('modal').show(100)
})

//添加地址模态框的X单机事件
$(()=>{
    $('div.insert_adres').on('click', 'p', ()=>{
        $('div.insert_adres').addClass('modal').hide(100)
    })
    

    $.get('/address',{topId: 0}).then(data =>{
        //console.log(data)
        for (let ele of data) {
             $(`<option value=${ele.id}>${ele.addname}</option>`).appendTo('#a')
        }
    })
    $('#a').on('change', e => {
        let $e = $(e.target),
        html = '<option value="02202">------请选择市区----</option>'
        //console.log($e.val())
        $.get('/address', {topId: $e.val()}).then(data => {
            //console.log(data)
            for (let ele of data) {
               html += `<option value=${ele.id}>${ele.addname}</option>`
            }
            $('#c').html('<option value="02202">------请选择区县----</option>')
            $('#b').html(html)
        })
    })

    $('#b').on('change', e => {
        let $e = $(e.target),
        html = '<option value="02202">------请选择区县----</option>'
        //console.log($e.val())
        $.get('/address', {
            topId: $e.val()
        }).then(data => {
            //console.log(data)
            for (let ele of data) {
                html += `<option value=${ele.id}>${ele.addname}</option>`
            }
            $('#c').html(html)
        })
    })
     
})



