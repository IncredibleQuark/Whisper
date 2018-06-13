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

    function checkIfAllReady () {

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

    socket.on('change status', (data) => {

        const index = usersArray.findIndex( (item) => {
          return item.id === data.user.id;
        })

      if (data.isReady) {
          usersArray[index].status = {
            isReady: true,
            statusString: 'Ready'
          }
      } else {
          usersArray[index].status = {
            isReady: false,
            statusString: 'Not ready'
          }
      }

      updateUsersList()

      checkIfAllReady()
    })

    socket.on('log user', (user) => {

      // if (addedUser && usersArray.indexOf(user.username) !== -1) return false
      socket.username = user.username
      socket.status = {
        isReady: false
      }

      addedUser = true
      ++usersCount

      user.status = {
        isReady: false,
        statusString: 'Not ready',
        isAdmin: usersArray.length === 1
      }

      usersArray.push(user)

      io.emit('new room message', {
        username: user.username,
        type: 'userJoined',
        date: new Date()
      })

      updateUsersList()

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
