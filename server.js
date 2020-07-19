// const express = require('express')
// const http = require('http')
// const app = express()
// const socketio = require('socket.io')
// const server = http.createServer(app)
// const io = socketio(server)


const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')


const app = express()

//well here we use this http stuff to use our app and server on same local host
const server = http.createServer(app)

const io = socketio(server)

io.on('connection', (socket) => {
    console.log("connected with socket id ", socket.id)

    socket.on('msg_send', (data) => {
        io.emit('msg_rcvds', data)
    })

})

app.use('/', express.static(__dirname + '/public'))
app.listen(1212, () => {
    console.log("server started at http://localhost:1212")
})