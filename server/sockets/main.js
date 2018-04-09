let sockets = {};

sockets.init = (server) => {

    let io = require('socket.io').listen(server);
    io.sockets.on('connection', (socket) => {
        console.log('socket connected');

        socket.on('new-message', (message) => {
            io.emit('update', message);
        })
    });


};

module.exports = sockets;