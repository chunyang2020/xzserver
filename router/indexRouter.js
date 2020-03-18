const express = require('express')
const pool = require('../my_modules/mysql_pool')

let router = express.Router()
//首页轮播图请求
router.get('', (req, res) => {
    pool.getConnection((err, conn)=>{
        if(err) throw err
        let sql = `SELECT img FROM xz_index_carousel`
        conn.query(sql, (err, result)=>{
            if(err) throw err
            res.json(result)
            conn.release()
        })

    })
})

router.get('/banner', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err
        let sql = `SELECT * FROM xz_index_product`
        conn.query(sql, (err, result) => {
            if (err) throw err
            res.json(result)
            conn.release()
        })
    })
})

router.get('/autocomp', (req, res)=> {
        let kw = req.query.kw,
        kwarry= kw.toLowerCase().split(''),
        where = ''
    pool.getConnection((err, conn)=>{
        if(err) throw console.log('租用连接池出错')
        for(let key of kwarry){
            where += ` and title like '%${key}%' `
        }
        //console.log(where)
        let sql = `SELECT lid, title FROM xz_laptop WHERE 1 ${where} limit 0, 25`
        try{ conn.query(sql, (err, result)=>{
                res.json(result)
                conn.release()
        })}
        catch (err) {
            console.log('连接数据库出错')
        }
    })
})

module.exports = router