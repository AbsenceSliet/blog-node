'use strict'

import express from 'express'
import routes from './routes/index.js'
import bodyParser from 'body-parser'
import expressSession from 'express-session';

const app = express()

app.all('*', (req, res, next) => {
    const origin = req.headers.origin || ''
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With')
    res.header('Access-Control-Max-Age', '1728000')
    res.header('Content-Type', 'application/json;charset=utf-8')
    res.header("X-Powered-By", 'Express');
    console.log('------------')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})
app.use(bodyParser.json({
    limit: '1mb'
}))
app.use(bodyParser.urlencoded({
    extended: true
}))

routes(app);

// 数据库连接
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/vuemall', {
    useNewUrlParser: true
}, err => {
    if (err) {
        console.log('数据库连接失败', err)
    } else {
        console.log('数据库连接成功');
        app.listen('8088')
    }
})