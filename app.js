const http = require('http')
const express = require('express')
const pool = require('./my_modules/mysql_pool')
const cors = require('cors')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const indexRouter = require('./router/indexRouter.js')
const productRouter = require('./router/productRouter.js')
const cartRouter = require('./router/cartRouter.js')
const orderRouter = require('./router/orderRouter.js')
const fs = require('fs')
const siteAddress = require('./address')

const app = express()
const server = http.createServer(app)

server.listen(3336)

app.use(express.static('dist'))//静态文件的配置

app.use(cors({//跨域请求的配置
    origin: ['http://127.0.0.1'],
    credentials: true  //是否允许跨域访问
}))

app.use(bodyParser.urlencoded({ //post请求的转码配置 配置后req中自动加上body属性可直接得到uname等参数
    extended: false
}))

app.use(cookieParser())//cookie的配置

app.use(expressSession({//session的配置
    resave: false,//每次请求是否重新设置session
    saveUninitialized: true,//每次请求是否设置cookie
    secret: 'teducn'//加密传输密钥
}))
//首次访问加载首页
app.get('', (req, res) => {
    res.send(__dirname + '/dist/index.html')
})
//登录判断
app.get('/islogin', (req, res) =>{
    let $uid = req.session.uid
    if ($uid == null || $uid == ''){
        res.json({code: -4, msg: '未登录'})
    } else {
        pool.getConnection((err, conn)=>{
            if(err) throw err
            let sql = ` SELECT user_name FROM xz_user WHERE uid=? `
            conn.query(sql, [$uid], (err, result)=>{
                if(err) throw err
                res.json({code: 1, msg: result[0].user_name})
                conn.release()
            })
        })
    }
})
//注销
app.get('/logup', (req, res)=>{
    req.session.uid = ''
    res.json({code: 1})
})
//用户登录
app.get('/login', (req, res) => {

    let uname = (req.query.uname).trim(),
    upwd = (req.query.upwd).trim()

    if( uname != '' && upwd != ''){
        //用户名格式正则表达式
        let ureg = /^[\w \u4e00-\u9fa5]{2,18}$/
        //密码格式正则表达式
        let preg = /^[\w]{6,12}$/
        let uResult = ureg.test(uname),
        pResult = preg.test(upwd)
        //console.log(uResult, pResult, uname, upwd, req.query)

        if(uResult && pResult){
            pool.getConnection((err, conn) => {
                if(err) throw err
                let sql =  ` SELECT user_name,uid FROM xz_user WHERE uname=? and upwd=? `
                conn.query(sql, [uname, upwd], (err, result) => {
                    if(err) throw err
                    if(result.length == 0){
                        res.json({code: -3, msg: '用户名或密码不正确请重新输入'})
                    } else {
                        //console.log(result)
                        req.session.uid = result[0].uid
                        res.json({code: 1, msg: result[0].user_name})
                    }
                    conn.release()
                })

            })
        } else{res.json({code: -2, msg: '密码或用户名格式不正确'})}
        
    } else {res.json({code: -1, msg: '密码或用户名不能为空'})}

})


//省市县三省联动请求数据
app.get('/address', (req, res) =>{
    let topId = req.query.topId,
    arr = []
    siteAddress.forEach(ele => {
        if(ele.topid == topId){
            arr.push(ele)
        }
    })
    res.json(arr)
})

app.use('/index', indexRouter)//首页请求路由

// app.use((req, res, next) => {//请求拦截重定向 
//     if(req.session.uid == null){
//         res.redirect('/html/login.html')    
//     } else {
//         next()
//     }
    
// })
app.use('/product', productRouter)//商品查询的路由    
app.use('/cart', cartRouter) //购物车的路由
app.use('/order', orderRouter)//订单的路由




























console.log('running...........')