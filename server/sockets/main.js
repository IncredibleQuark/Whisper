let sockets = {}
const User = require('../models/user/user');
const Slogan = require('../models/slogan/slogan');

sockets.init = (server) => {

  let io = require('socket.io').listen(server)

  let usersCount = 0
  let usersArray = []

  io.on('connection', (socket) => {
    let addedUser = false
    let currentSlogan = {};

    function updateUsersList () {
      io.emit('update users list', {
        usersArray: usersArray,
        usersCount: usersCount
      })
    }

    socket.on('new message', (data) => {
      io.emit('new room message', {
        username: socket.username,
        message: data.message,
        date: data.date
      })
    })

    socket.on('drawing', (data) => {
      io.emit('drawing', data)
    })

    socket.on('reset', () => {
      io.emit('resetUpdate')
    })

    socket.on('start game', () => {
      Slogan.getAllSlogans((err, slogans) => {
        const random = Math.floor((Math.random() * slogans.length));
        currentSlogan = slogans[random];
        io.emit('game started', currentSlogan.slogan)
      });

    })

    socket.on('log user', (user) => {

      // if (addedUser && usersArray.indexOf(user.username) !== -1) return false

      socket.username = user.username
      socket.status = 'Not ready'
      user.status = 'Not ready'
      addedUser = true
      ++usersCount
      usersArray.push(user)

      io.emit('user joined', {
        username: socket.username,
      })

      io.emit('update users list', {
        usersArray: usersArray,
        usersCount: usersCount
      })

      io.emit('new room message', {
        username: user.username,
        type: 'userJoined',
        date: new Date()
      })

    })

    socket.on('disconnect', () => {
      if (addedUser) {
        --usersCount

        const index = usersArray.indexOf(socket.username)
        usersArray.splice(index, 1)

        updateUsersList()

        io.emit('new room message', {
          username: socket.username,
          type: 'userLeft',
          date: new Date()
        })

      }
    })

  })

}

module.exports = sockets
