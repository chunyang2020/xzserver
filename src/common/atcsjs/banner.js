/**
 * Created on 2020/2/20
 *     '<img src="img/index/banner1.png" class="banner-img1" width="1001px" alt="ͼƬ1"/>' +
    '<img src="img/index/banner2.png" class="banner-img2" alt="ͼƬ2"/>' +
    '<img src="img/index/banner3.png" class="banner-img3" alt="ͼƬ3"/>' +
    '<img src="img/index/banner4.png" class="banner-img4" alt="ͼƬ4"/>' +
    '<img src="img/index/banner1.png" class="banner-img5" alt="ͼƬ5"/>' +
    <img src="img/index/arrow-right.png" class="banner-img7" alt="ͼƬ5"/>
    <img src="img/index/arrow-left.png" class="banner-img6" alt="ͼƬ5"/>
 * 广告轮播--以上是废弃不用的代码 ， 留着以后也许有用
 */
$(() => {
    $.get('http://127.0.0.1:3336/index').then(
        data => {
            //创建标签容器并追加到容器中
            $('<div class="banner-box">' +
                '<div class="arrow-left"></div>' +
                '<div class="arrow-right"></div>' +
                '<ul class="list-inline banner-circle"><li data-num=1></li><li data-num=2></li><li data-num=3></li><li data-num=4></li></ul>' +
                '</div>').appendTo('div.banner>div')
            //console.log(data)
            //1淡入淡出轮播函数
            let timer, a = 0,
                bgImgArrow = () => {
                    $('div.banner-box').css('backgroundImage', `url(${data[a].img})`)
                        .css('transition', 'all 1s linear')

                    $(`div.banner-box li[data-num=${a + 1}]`)
                        .css({
                            backgroundColor: '#0269c2',
                            opcity: 0.5
                        })

                    $(`div.banner-box li[data-num=${a + 1}]`).siblings()
                        .css('backgroundColor', '#fff')
                }

            //2设置定时器
            timer = setInterval(() => {
                if (a > 3) a = 0

                bgImgArrow()

                a += 1

                if (a > 3) a = 0
            }, 4000)

            //3鼠标进入清除定时器
            $('div.banner-box').on('mouseenter', e => {
                clearInterval(timer)
            })

            //4鼠标移出恢复定时器
            $('div.banner-box').on('mouseleave', () => {
                timer = setInterval(() => {
                    if (a > 3) a = 0

                    bgImgArrow()

                    a += 1

                    if (a > 3) a = 0

                }, 4000)
            })

            //5圆点切换图片
            $('div.banner-box>ul').on('mouseenter', 'li', e => {

                a = $(e.target).index()
                //console.log(a)
                bgImgArrow()
            })

            //6两边方向键切换图片
            $('div.banner-box div').click(e => {
                let targ = $(e.target).attr('class')
                if (targ == 'arrow-left') {
                    //console.log(targ)
                    a -= 1
                    if (a < 0) a = 0

                } else {
                    //console.log(targ)
                    a += 1
                    if (a > 3) a = 3
                }

                bgImgArrow()
            })


            bgImgArrow() //页面初始化自执行
        }
    )



})