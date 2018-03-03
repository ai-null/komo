var express = require('express')
var {join} = require('path')
var {port} = require('./assets/config')

var app = express()

app.set('views', join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'views', 'index.html')
})

app.listen(port, (err) => {
    if (err) throw new Error
    
    console.log(`Magic happen at port ${port}`)
})