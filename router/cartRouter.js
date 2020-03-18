const express = require('express')
const pool = require('../my_modules/mysql_pool')

let router = express.Router()

//向购物车数据库插入数据
router.get('/insert', (req, res) => {
    let lid = req.query.lid,
    uid = req.session.uid

    pool.getConnection((err, conn) => {
        if(err) throw err
        let sql = ` INSERT INTO xz_shoppingcart_item(iid,user_id, product_id, count, is_checked) VALUES (null, ${uid}, ${lid}, 1, 0) `
        conn.query(sql, (err, result) => {
            if(err) throw err
            res.send(result)
            conn.release()
        })
    })
})

//检查此用户购物车中是否有此商品
router.get('/verify', (req, res) =>{
    pool.getConnection((err, conn) => {
        if(err) throw err
        let sql = ` SELECT product_id FROM xz_shoppingcart_item WHERE user_id=? `
        conn.query(sql, [req.session.uid], (err, result) => {
            if(err) throw err
            res.json(result)
            conn.release()
        })
    })
})

//验证数据库里是否有此商品
router.get('/favorite', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err
        let sql = ` SELECT product_id FROM xz_favorite WHERE user_id=? `
        conn.query(sql, [req.session.uid], (err, result) => {
            if (err) throw err
            res.json(result)
            conn.release()
        })
    })
})

//向收藏夹数据库插入数据
router.get('/favorInsert', (req, res) => {
    let lid = req.query.lid,
        uid = req.session.uid

    pool.getConnection((err, conn) => {
        if (err) throw err
        let sql = ` INSERT INTO xz_favorite(fid,user_id, product_id) VALUES (null, ${uid}, ${lid}) `
        conn.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
            conn.release()
        })
    })
})





module.exports = router