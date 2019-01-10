let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(socket.id + ": connected");

    socket.on('disconnect', function () {
        console.log(socket.id + ": disconnected");
    })

    socket.on('led-change', function (data) {
        console.log(socket.id+ ': ' + data)
        socket.broadcast.emit('led-change',data)
    });
})
server.listen(8000, () => {
    console.log('Started on port 8000')
}); //lắng nghe ở port 8000


