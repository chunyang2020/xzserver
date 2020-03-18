
//小图单机改变大图的单击事件
$(()=>{
    $('div.shop-detail>div.lf>div.sm-png>ul').on('click', 'li', e => {
        
            let src = `../img/product_detail/product_detail_img${$(e.target).data('num')}big.png`

            $('div.shop-detail>div.lf>div.lg-png>img').attr('src', src)     
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