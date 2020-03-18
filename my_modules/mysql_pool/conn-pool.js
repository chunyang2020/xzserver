/**
 * Created by ȽȽ on 2019/12/4.
 */
const mysql = require('mysql')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'xz',
    port: 3306,
    connectionLimit: 5
})



module.exports = pool