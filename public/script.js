let socket = io()

$("#loginbox").show()
$('#chatbox').hide()

$('#btnstart').click(() => {
    socket.emit('login', {
        username: $('#inpusername').val(),

    })
})

socket.on('logged_in', () => {
    $("#loginbox").hide()
    $('#chatbox').show()
})

$('#btnsend').click(() => {
    socket.emit('msg_send', {
        to: $('#inptouser').val(),
        msg: $('#inpmsg').val(),
    })
})

socket.on('msg_rcvd', (data) => {
    $('#ulmsg').append($('<li>').text(data.msg))
})