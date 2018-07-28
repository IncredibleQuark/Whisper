let sockets = {}
const User = require('../models/user/user')
const Slogan = require('../models/slogan/slogan')

sockets.init = (server) => {

  let io = require('socket.io').listen(server)
  let usersCount = 0
  let usersArray = []
  let addedUser = false
  let currentSlogan = {}
  let gameStatus = {
    queue: [],
    status: 'waiting for players',
    user: {}
  }

  io.on('connection', (socket) => {

    function updateUsersList () {
      io.emit('update users list', {
        usersArray: usersArray,
        usersCount: usersCount
      })
    }

    function checkIfAllReady () {
      const test = usersArray.filter((user) => {
        return user.status.isReady === false
      })

      if (test.length === 0) {
        io.emit('all ready', true)
      } else {
        io.emit('all ready', false)
      }
    }

    function findPlayerIndex (userId) {
      return usersArray.findIndex((item) => {
        return item.id === userId
      })
    }

    function findPlayerByUsername (username) {
      return usersArray.filter((user) => {
        return user.username === username
      })
    }

    function checkAnswer (message) {

      if (currentSlogan.validAnswers.includes(message)) {

        const data = {date: new Date(), message: message}
        emitMessage(data, 'gameWon')
        updateRankings(true)
        gameStatusChanged('game won')

      } else if (currentSlogan.almostValidAnswers.includes(message)) {

        const data = {date: new Date(), message: message}
        emitMessage(data, 'gameAlmostWon')

      }

    }

    function updateRankings (isWon) {

    }

    function emitMessage (data, type) {
      io.emit('new room message', {
        username: socket.user.username,
        message: data.message,
        date: data.date,
        type: type
      })
    }


    function resetPlayersStatuses() {

      usersArray.forEach( (user) => {
        user.status = {
          isReady: false,
          statusString: 'Not ready'
        }
      })
      checkIfAllReady()
      updateUsersList()
    }


    function emitMessageToPlayer (data, type) {

      socket.emit('new room message', {
        username: socket.user.username,
        message: data.message,
        date: data.date,
        type: type
      })
    }

    function gameStatusChanged (status) {

      if (status === 'game started') {
        Slogan.getAllSlogans((err, slogans) => {
          const random = Math.floor((Math.random() * slogans.length))
          currentSlogan = slogans[random]
          gameStatus.status = 'game started'
          const data = {status: gameStatus.status, slogan: currentSlogan.slogan, user: socket.user}
          io.emit('game status changed', data)
        })

      } else  {
        gameStatus.status = 'waiting for players'
        updateRankings(status === 'game won')
        resetPlayersStatuses()
        const data = {status: gameStatus.status, slogan: null, user: socket.user}
        io.emit('game status changed', data)
      }
    }

    socket.on('join queue', (user) => {
      gameStatus.queue.push(user)
      io.emit('queue update')
    })

    socket.on('new message', (data) => {

      // Check if user is not drawing right now
      const user = findPlayerByUsername(socket.user.username)
      // if (user[0].status.statusString === 'Drawing') {
      //   emitMessageToPlayer({date: new Date(), message: ''}, 'sendBlocked')
      //   return false
      // }

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
      gameStatusChanged('game started')
    })

    socket.on('time up', () => {
      gameStatusChanged('time up')
    })

    socket.on('change user status', (data) => {

      if (data.isReady) {
        socket.user.status = {
          isReady: true,
          statusString: 'Ready'
        }
      } else if (data.isDrawing && gameStatus.status === 'game started') {
        socket.user.status = {
          isReady: true,
          statusString: 'Drawing'
        }
      }
      else {
        socket.user.status = {
          isReady: false,
          statusString: 'Not ready'
        }
      }

      updateUsersList()
      checkIfAllReady()
    })

    socket.on('log user', (user) => {
      // if (addedUser && usersArray.indexOf(user.username) !== -1) return false

      addedUser = true
      ++usersCount

      socket.user = {
        id: user.id,
        email: user.email,
        username: user.username,
        status: {
          isReady: false,
          statusString: 'Not ready',
          isAdmin: usersArray.length === 1,
          queue: 'n/a',
          isDrawing: false
        }
      }

      usersArray.push(socket.user)

      const data = {message: '', date: new Date()}
      emitMessage(data, 'userJoined')

      updateUsersList()
      checkIfAllReady()

    })

    socket.on('disconnect', () => {
      if (addedUser) {
        --usersCount

        // const index = usersArray.indexOf(socket.user.username)
        // usersArray.splice(index, 1)

        updateUsersList()
        checkIfAllReady()

        const data = {date: new Date(), message: ''}
        emitMessage(data, 'userLeft')

      }
    })

  })

}

module.exports = sockets
