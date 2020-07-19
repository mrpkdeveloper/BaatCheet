let socket = io()

let inpmsg = document.getElementById('inpmsg')
let btnsend = document.getElementById('btnsend')
let ulmsglist = document.getElementById('ulmsglist')

btnsend.onclick = function () {
    socket.emit('msg_send', {
        msg: inpmsg.value
    })
    inpmsg.value

    socket.on('msg_rcvd', (data) => {
        let newmsg = document.createElement('li')
        newmsg.innerText = data.msg
        ulmsglist.appendChild(newmsg)
    })
}