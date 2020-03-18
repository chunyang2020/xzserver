
//判断是否登录
$(() => {
    let userName = sessionStorage.user_name
    if (!userName) {
        $.get('/islogin').then(
            data => {
                if (data.code > 0) {
                    sessionStorage.user_name = data.msg
                    let $li = $('div.right-r>ul').children(':last')
                    $li.children('a').html('注销').attr('href', 'javascript:')
                    $li.prev().children('a').html(`WELCOM: ${data.msg}`).attr('href', 'javascript:')
                }
            })
    } else {
        let $li = $('div.right-r>ul').children(':last')
        $li.children('a').html('注销').attr('href', 'javascript:')
        $li.prev().children('a').html(`WELCOM: ${sessionStorage.user_name}`).attr('href', 'javascript:')
    }
})
//注销功能
$(() => {
    $('div.right-r>ul').on('click', ':contains(注销)', e => {
        sessionStorage.userName = ''
        $.get('/logup').then(
            data => {
                // console.log(data)
                if (data.code > 0) {
                    sessionStorage.user_name = ''
                    location.reload(true)
                }
            }
        )
    })
})

//楼层滚动 导航条的显示、隐层
$(() => {
    //窗口滚动触发事件
    let scro = () => {
        let scrollTop = document.documentElement.scrollTop ||
            document.body.scrollTop

        if (scrollTop == 0) {
            $('div#floor3').show('2s')
            $('div.hiden-header').hide()
        } else if (scrollTop > 150) {
            $('div#floor3').hide()
            $('div.hiden-header').show('2s')
        }
    }
    $(window).scroll(() => {
        scro()
    })
    scro() //页面初始化时用
})

// 搜索框的单击事件 模拟触发  两个搜索框的通信
$(() => {
    //给搜索框的放大镜搜索图片绑定单击事件
    $(document.body).on('click', 'img[data-trigger=search]', e => {
        let $searBtn = $(e.target),
            $input = $searBtn.siblings('input.txtSearch')

        if ($.trim($input.val()) !== '') {
            sessionStorage.inputMsg = $input.val()
            location =
                'http://127.0.0.1:3336/html/product.html'


        } else {
            $input.attr('placeholder', '!!!!请输入要查找的关键字!!!!!')
            //console.log($input.val())
        }
    })
    //给搜索的搜索框绑定键盘事件 keyup
    $(document.body).on('keyup', 'input.txtSearch', e => {
        let key = e.keyCode,
            $input = $(e.target)
        //console.log(key)
        switch (key) {
            case 13:
                if ($input.siblings('ul').is(':has(.focus)')) {
                    sessionStorage.lid = $input.siblings('ul.shelper').children('.focus').data('lid')
                    $('input.txtSearch').val($input.siblings('ul.shelper').children('.focus').html()).focus()
                        .siblings('ul.shelper').children().removeClass('focus')
                    $('ul.shelper').hide()
                } else {
                    $input.siblings('img[data-trigger=search]').click()
                }
                // console.log(e.keyCode)
                break;
            case 38:
                //console.log('向上')
                if (!$input.siblings('ul').is(':has(.focus)')) {

                    $input.siblings('ul').children().first().addClass('focus')

                } else if ($input.siblings('ul').children().first().is('.focus')) {

                    $input.siblings('ul').children().removeClass('focus')
                        .last().addClass('focus')


                } else {
                    $input.siblings('ul').children('.focus').removeClass('focus')
                        .prev().addClass('focus')
                }
                $input.val($input.siblings('ul').children('.focus').html())
                break;
            case 40:
                //console.log('向下')
                if (!$input.siblings('ul').is(':has(.focus)')) {

                    $input.siblings('ul').children().first().addClass('focus')

                } else if ($input.siblings('ul').children().last().is('.focus')) {

                    $input.siblings('ul').children().removeClass('focus')
                        .first().addClass('focus')


                } else {
                    $input.siblings('ul').children('.focus').removeClass('focus')
                        .next().addClass('focus')
                }
                $input.val($input.siblings('ul').children('.focus').html())
                break;
            default:
                $('input.txtSearch').val($input.val()) //搜索框的通信 
                if ($input.val() != '') {
                    $.get('/index/autocomp', {
                        kw: $.trim($input.val())
                    }).then(data => {
                        //console.log(data)
                        let li = '',
                            lidArr = []
                        if (data.length != 0) {
                            for (let msg of data) {
                                li += `<li data-lid="${msg.lid}">${msg.title}</li>`
                                lidArr.push(msg.lid)
                            }
                            $('ul.shelper').html(li).show()
                            sessionStorage.lidArr = lidArr
                        } else {
                            li += `<li>)'>_<'( 没有搜索到您想要的商品</li>`
                            li += `<li><a href="html/product.html?kw=*">*************为您推荐***********</a></li>`
                            $('ul.shelper').html(li).show()
                        }
                    })
                }

        }
    })
    //给自动完成搜索帮助添加事件
    $('ul.shelper').on('click', 'li', e => {
        let $li = $(e.target)
        //console.log(1)
        $('input.txtSearch').val($li.html())
        $li.parent().siblings('input').focus()
        sessionStorage.lid = $li.data('lid')
        $('ul.shelper').hide()
    })
    //添加搜索框失去焦点事件
    $('div:has(.txtSearch).row').on('mouseleave', e => {
        $('ul.shelper').hide()
    })
    // $('input.txtSearch').on('blur', e =>{
    //     $(e.target).siblings('ul').hide()
    // })
})

//body绑定单击事件 如果没有登陆就阻止行为 弹出登录框
$(() => {
    $(document.body).on('click', 'img[data-pass]', e => {
        e.preventDefault()
        let $e = e.target
        //console.log(e.target)
        $.get('/islogin').then(data => {
            if (data.code < 0) {
                $('div.login-modal').css('display', 'block')
            } else {
                location = $($e).parent().attr('href')

            }
        })
    })
})