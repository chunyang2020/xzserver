const express = require('express')
const pool = require('../my_modules/mysql_pool')

let router = express.Router()

router.get('/content',(req, res)=>{
    let lid = req.query.lid,
    prg = 0, data = []
    pool.getConnection((err, conn)=>{
        if(err) throw err

        let sql1 = ` SELECT * FROM xz_laptop WHERE lid=? `
        conn.query(sql1, [lid], (err, result)=>{
            if(err) throw err
            data.push(result)
            prg += 1
            if(prg == 2){ 
                res.json(data)
                conn.release()
            }
        })
        let sql2 = ` SELECT * FROM xz_laptop_pic WHERE  laptop_id=? ` 
        conn.query(sql2,[lid], (err, result)=>{
            if(err) throw err

            data.push(result)
            prg += 1
            if(prg == 2) {
                res.json(data)
                conn.release()
            }    
        })
        

    })
})

router.get('/like', (req, res) => {

    let lidArr = req.query.lidArr.split(','),
        prg = 0,
        data = [],
        where1 = ''
        //console.log(lidArr)
        for (let a of lidArr) {
            where1 += ` or lid=${a} `
        }
    pool.getConnection((err, conn) => {
        if (err) throw err

        let sql1 = ` SELECT * FROM xz_laptop WHERE false ${where1} `
        conn.query(sql1, (err, result) => {
            if (err) throw err
            data.push(result)
            prg += 1
            if (prg == 2) {
                res.json(data)
                conn.release()
            }
        })

       let where2 = ''
        for (let b of lidArr) {
            where2 += ` or laptop_id=${b} `
        }
        let sql2 = ` SELECT * FROM xz_laptop_pic WHERE false ${where2} `
        conn.query(sql2, (err, result) => {
            if (err) throw err

            data.push(result)
            prg += 1
            if (prg == 2) {
                res.json(data)
                conn.release()
            }
        })
    })
})

router.get('/details', (req, res) => {
    let lid = req.query.lid,
        prg = 0,
        data = []
    pool.getConnection((err, conn) => {
        if (err) throw err

        let sql1 = ` SELECT * FROM xz_laptop WHERE lid=? `
        conn.query(sql1, [lid], (err, result) => {
            if (err) throw err
            data.push(result)
            prg += 1
            if (prg == 2) {
                res.json(data)
                conn.release()
            }
        })
        let sql2 = ` SELECT * FROM xz_laptop_pic WHERE  laptop_id=? `
        conn.query(sql2, [lid], (err, result) => {
            if (err) throw err

            data.push(result)
            prg += 1
            if (prg == 2) {
                res.json(data)
                conn.release()
            }
        })


    })
})




module.exports = router

