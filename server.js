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
const { Socket } = require('dgram')


const app = express()

//well here we use this http stuff to use our app and server on same local host
const server = http.createServer(app)

const io = socketio(server)

let users = {
    'arnav': '1234'
}

let socketmap = {}


io.on('connection', (socket) => {
    console.log("connected with socket id ", socket.id)
    function login(s, u) {
        s.join(u)
        s.emit('logged_in')
        socketmap[s.id] = u
    }

    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)

            } else {
                socket.emit('login_fail')
            }
        } else {
            users[data.username] = data.password
            login(socket, data.username)
        }

    })

    socket.on('msg_send', (data) => {
        data.from = socketmap[socket.id]
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