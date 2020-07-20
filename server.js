// const express = require('express')
// const http = require('http')
// const app = express()
// const socketio = require('socket.io')
// const server = http.createServer(app)
// const io = socketio(server)


const http = require('http')
const express = require('express')
// const path = require('path')
const socketio = require('socket.io')


const app = express()

//well here we use this http stuff to use our app and server on same local host
const server = http.createServer(app)

const io = socketio(server)

io.on('connection', (socket) => {
    console.log("connected with socket id ", socket.id)

    socket.on('login', (data) => {
        // console.log("rcvd msg " + data.msg)
        // io.emit('msg_rcvd', data)
        socket.join(data.username)
        socket.emit('logged_in')
    })

    socket.on('msg_send', (data) => {
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        } else {
            socket.broadcast.emit('msg_rcvd', data)
        }
    })

})

app.use('/', express.static(__dirname + '/public'))
server.listen(1212, () => {
    console.log("server started at http://localhost:1212")
})