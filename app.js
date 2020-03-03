const http = require('http')
const express = require('express')
const pool = require('./pool.js')

const app = express()
const server = http.createServer(app)

server.listen(3336)

app.use(express.static('public'))


app.get('', (req, res)=> {
    res.send(__dirname + '/public/index.html')
})

























console.log('running')