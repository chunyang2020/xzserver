const express = require('express')
const pool = require('../my_modules/mysql_pool')

let router = express.Router()
//收件地址请求
router.get('/pay', (req, res) => {
    pool.getConnection((err, conn)=>{
        if(err) throw err
        let uid = req.session.uid
        let sql = ` SELECT * FROM xz_receiver_address WHERE user_id=? `
        conn.query(sql, [uid],(err, result)=>{
            if(err) throw err
            res.json(result)
            conn.release()
        })
    })
})
//设置默认地址的请求
router.get('/receiver', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err
        let uid = req.session.uid,
        aid = req.query.aid
        let sql = ` UPDATE xz_receiver_address SET is_default=0 WHERE user_id=? `
        conn.query(sql, [uid], (err, result) => {
            if (err) throw err
            sql = ` UPDATE xz_receiver_address SET is_default=1 WHERE aid=? `
            conn.query(sql, [aid], (err, result) => {
                if (err) throw err
                res.json(result)
                conn.release()
            })
        })
    })
})


module.exports = router

// let sql = `INSERT INTO xz_receiver_address(aid, user_id, receiver, province, city, county, address, cellphone, fixedphone, postcode, tag, is_default)
//                     VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1) `
//; UPDATE xz_receiver_address SET is_default=1 WHERE aid=?