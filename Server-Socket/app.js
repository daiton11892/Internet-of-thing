let app = require('express')();
//Khai báo thư viện xây dựng server
let server = require('http').Server(app);
//Khai báo thư viện socket.io
let io = require('socket.io')(server);

//Bắt sự kiện connection
io.on('connection', (socket) => {
	//Khi có client connection thì in ra id + connected
    console.log(socket.id + ": connected");
	//Khi có client disconnect thì in ra id + disconnected
    socket.on('disconnect', function () {
        console.log(socket.id + ": disconnected");
    })
	
	//Bắt sự led-change
    socket.on('led-change', function (data) {
		//In ra data mà client gửi 
        console.log(socket.id+ ': ' + data)
		//Gửi data của sự kiện led-change cho toàn bộ client còn lại
        socket.broadcast.emit('led-change',data)
    });
})
server.listen(8000, () => {
    console.log('Started on port 8000')
}); //Bắt đầu server ở port 8000


