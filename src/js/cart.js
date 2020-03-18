//引入头部html代码片段 并插入页面指定位置
import headerHtml from '../common/htmljs/header-html'
//引入隐层的头部 并插入指定位置
import hidenHeaderHtml from '../common/htmljs/hiden_header-html'
//引入footerhtml
import footerHtml from '../common/htmljs/footer-html'


$('#floor3').html(headerHtml())
$(hidenHeaderHtml()).insertBefore($('body>div.footer'))
$('body>div.footer').html(footerHtml())

//引入头部header.js
require('../common/atcsjs/header')

require('../less/cart.less')