let sockets = {};

sockets.init = (server) => {

    let io = require('socket.io').listen(server);

    let usersCount = 0;

    io.sockets.on('connection', (socket) => {

        let addedUser = false;


        socket.on('new-message', (message) => {

            io.emit('new-global-message', {
                username: socket.username,
                message: message
            })
        });

        socket.on('add user', (username) => {
            if(addedUser) return;

            socket.username = username;
            addedUser = true;
            ++usersCount;
            socket.broadcast.emit('user joined', {
                username: socket.username,
                usersCount: usersCount
            });
        })
    });


};

module.exports = sockets;
