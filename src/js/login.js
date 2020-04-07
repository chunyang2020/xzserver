
//引入footerhtml
import footerHtml from '../common/htmljs/footer-html'

$('div.footer').html(footerHtml())




//用户名、密码格式的验证格式的验证
$(()=>{
    //用户名格式正则表达式
    let ureg = /^[\w \u4e00-\u9fa5]{2,18}$/;
    //密码格式正则表达式
    let preg = /^[\w]{6,12}$/;
    //用户名的验证
    $('div.login-table').on('blur', 'input[type=text]', e => {
        let $e = $(e.target),
        $val = $.trim($e.val())

        if($val !== '' && ureg.test($val)){
            console.log(1)
            $e.siblings('div').data('type', 1).html('√用户名格式正确√')
                .addClass('succ')
        } else if ($val == ''){
            $e.siblings('div').data('type', -1).html('*****用户名不能为空')
                .addClass('fail')
        } else {
            $e.siblings('div').data('type', -1).html('****用户名格式不正确')
                .addClass('fail')
        }
    })
    //密码的验证
    $('div.login-table').on('blur', 'input[type=password]', e => {
        let $e = $(e.target),
            $val = $.trim($e.val())

        if ($val !== '' && preg.test($val)) {
            $e.siblings('div').data('type', 1).html('√').addClass('succ')
        } else if ($val == '') {
            $e.siblings('div').data('type', -1).html('*****密码不能为空')
                .addClass('fail')
        } else {
            $e.siblings('div').data('type', -1).html('****密码格式不正确')
                .addClass('fail')
        }
    })
    //得到焦点时移除相对应的提示
    $('div.login-table').on('focus', 'input:not([type=button])', e => {
        $(e.target).siblings('div').removeClass()
    })
})
//登录按钮单击登录
$(()=>{
    $('div.login-table').on('click', 'input[type=button]', e => {
        let $e = $(e.target),
        $type = $('div.user').children('div').data('type') +
            $('div.pwd').children('div').data('type')
        
        //console.log($type)
        if($type <= 0){
            $e.next().html('**用户名或密码格式不正确**').addClass('fail')
            
        } else {
           let $uname = $('div.user').children('input').val()
            let $upwd = $('div.pwd').children('input').val()
            $.get('/login',{
                uname: $.trim($uname),
                upwd: $.trim($upwd)
            }).then(data=>{
                console.log(data)
                let code = data.code,
                msg = data.msg
                if(code < 0){
                    $e.next().html(msg).addClass('fail')
                } else {
                    sessionStorage.user_name = data.msg
                    location = 'http://127.0.0.1:3336'
                }
            })
        }
        setTimeout(()=>{
            $e.next().removeClass()
        }, 1500)

    })
})


require('../less/login.less')
