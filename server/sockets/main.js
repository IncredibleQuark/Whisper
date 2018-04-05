let sockets = {};

sockets.init = (server) => {
    // socket.io setup
    let io = require('socket.io').listen(server);
    io.sockets.on('connection',  (socket) => {
        console.log('socket connected');
        // other logic
        socket.on('new-message', (message) => {
            console.log(message);
            io.emit('update', message);
        })
    });



};

module.exports = sockets;
