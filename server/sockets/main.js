let sockets = {}
const User = require('../models/user/user');
const Slogan = require('../models/slogan/slogan');

sockets.init = (server) => {

  let io = require('socket.io').listen(server)
  let usersCount = 0
  let usersArray = []
  let addedUser = false
  let currentSlogan = {};
  let gameStatus = {
    queue: [],
    status: 'waiting for players'
  };

  io.on('connection', (socket) => {

    function updateUsersList () {
      io.emit('update users list', {
        usersArray: usersArray,
        usersCount: usersCount
      })
    }

    function checkIfAllReady () {

      const test = usersArray.filter( (user) => {
        return user.status.isReady === false;
      })

      if (test.length === 0) {
        io.emit('all ready', true);
      } else {
        io.emit('all ready', false);
      }
    }

    function checkAnswer (message) {

      if (currentSlogan.validAnswers.includes(message)) {

        const data = {date: new Date(), message: message}
        emitMessage(data, 'gameWon')
        updateRankings()
        gameStatusChanged('waiting for players')

      } else if (currentSlogan.almostValidAnswers.includes(message)) {

        const data = {date: new Date(), message: message}
        emitMessage(data, 'gameAlmostWon')

      }

    }

    function updateRankings () {

    }

    function emitMessage (data, type) {
      io.emit('new room message', {
        username: socket.username,
        message: data.message,
        date: data.date,
        type: type
      })
    }

    socket.on('join queue', (user) => {
      gameStatus.queue.push(user);
      io.emit('queue update');
    })

    socket.on('new message', (data) => {

      emitMessage(data, 'userMessage')

      if (gameStatus.status === 'game started') {
        checkAnswer(data.message)
      }
    })

    socket.on('drawing', (data) => {
      io.emit('drawing', data)
    })

    socket.on('reset', () => {
      io.emit('resetUpdate')
    })

    socket.on('start game', () => {
      // Slogan.getAllSlogans((err, slogans) => {
      //   const random = Math.floor((Math.random() * slogans.length))
      //   currentSlogan = slogans[random]
      //   gameStatus.status = 'game started'
      //   io.emit('game started', currentSlogan.slogan)
      //
      // });
      gameStatusChanged('game started')
    })

    function gameStatusChanged(status) {

      if (status === 'game started') {
        Slogan.getAllSlogans((err, slogans) => {
          const random = Math.floor((Math.random() * slogans.length))
          currentSlogan = slogans[random]
          gameStatus.status = 'game started'
          const data = {status: gameStatus.status, slogan: currentSlogan.slogan}
          io.emit('game status changed', data)
        });
      } else {

        io.emit('game status changed', status)
      }
    }

    function findPlayerIndex(userId) {
      return usersArray.findIndex( (item) => {
        return item.id === userId;
      })
    }

    socket.on('change user status', (data) => {

        const index = findPlayerIndex(data.user.id)

      if (data.isReady) {
          usersArray[index].status = {
            isReady: true,
            statusString: 'Ready'
          }
      } else if (data.isDrawing) {
          usersArray[index].status = {
            isReady: true,
            statusString: 'Drawing'
          }
      }
      else {
          usersArray[index].status = {
            isReady: false,
            statusString: 'Not ready'
          }
      }

      updateUsersList()
      checkIfAllReady()
    })

    socket.on('log user', (user) => {
      if (addedUser && usersArray.indexOf(user.username) !== -1) return false
      socket.username = user.username

      addedUser = true
      ++usersCount

      user.status = {
        isReady: false,
        statusString: 'Not ready',
        isAdmin: usersArray.length === 1,
        queue: 'n/a',
        isDrawing: false
      }

      usersArray.push(user)

      const data = {message: '', date: new Date()}
      emitMessage(data, 'userJoined')

      updateUsersList()
      checkIfAllReady()

    })

    socket.on('disconnect', () => {
      if (addedUser) {
        --usersCount

        const index = usersArray.indexOf(socket.username)
        usersArray.splice(index, 1)

        updateUsersList()
        checkIfAllReady()

        const data = {date: new Date(), message: ''}
        emitMessage(data, 'userLeft')

      }
    })

  })

}

module.exports = sockets
