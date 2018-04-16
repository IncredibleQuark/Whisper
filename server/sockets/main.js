let sockets = {};

sockets.init = (server) => {

    let io = require('socket.io').listen(server);

    let usersCount = 0;
    let usersArray = [];
    let addedUser = false;



    io.sockets.on('connection', (socket) => {

      function updateUsersList() {
        io.emit('update users list', {
          usersArray: usersArray,
          usersCount: usersCount
        });
      }
        socket.on('new-message', (message) => {
console.log(socket.id);
            io.emit('new room message', {
                username: socket.username,
                message: message
            })
        });

        socket.on('add user', (username) => {

            // if(addedUser && usersArray.indexOf(username) !== -1) return;

            socket.username = username;
            addedUser = true;
            ++usersCount;
            usersArray.push(username);

            io.emit('user joined', {
                username: socket.username,
            });

            io.emit('update users list', {
                usersArray: usersArray,
                usersCount: usersCount
            })
        })

      socket.on('disconnect', () => {
          if (addedUser) {
              // --usersCount;

              const index = usersArray.indexOf(socket.username);
              // usersArray.splice(index, 1);

              updateUsersList();

              socket.broadcast.emit('user left', {
                  username: socket.username,
                usersCount: usersCount
              })
          }
      });

    });


};

module.exports = sockets;
