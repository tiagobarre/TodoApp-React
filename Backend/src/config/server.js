const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

const port = 3003

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

server.listen(port, function(){
    console.log(`Backend rodando na porta ${port}.`)
})

module.exports = server

