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
    status: 'waiting for players',
    user: {}
  }

  io.on('connection', (socket) => {

    function updatePlayersList () {
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

    function resetPlayersStatuses () {

      usersArray.forEach((user) => {
        user.status = {
          isReady: false,
          statusString: 'Not ready'
        }
      })
      checkIfAllReady()
      updatePlayersList()
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
          const data = {gameStatus: gameStatus.status, slogan: currentSlogan.slogan}
          io.emit('game status changed', data)
        })

      } else {
        gameStatus.status = 'waiting for players'
        updateRankings(status === 'game won')
        resetPlayersStatuses()
        deleteDrawerFromQueue()
        const data = {gameStatus: gameStatus.status, slogan: null}
        io.emit('game status changed', data)
      }
    }

    function updatePlayerStatus () {
      socket.emit('player status changed', {user: socket.user})
    }

    function getQueueArray () {
      const queueArray = usersArray.filter((user) => {
        return user.queue !== null
      })
      return queueArray.sort((a, b) => {
        return a.queue - b.queue
      })
    }

    function deleteDrawerFromQueue () {

      usersArray.map((user) => {
        if (user.queue === 1) {
          user.queue = null
          user.isDrawing = false
        } else {
          user.queue -= 1
        }
      })

      usersArray.filter((user) => {
        if (user.queue === 1) {
          user.isDrawing = true
        }
      })

      updatePlayersList()

    }

    function updateQueueArray () {
      // const arr = getQueueArray()
      // for (let i = 0; i <= arr.length; i++) {
      //   arr[0].queue = i + 1
      // }

    }

    socket.on('join queue', () => {

      socket.user.queue = getQueueArray().length + 1
      updatePlayerStatus()
      updatePlayersList()
    })

    socket.on('leave queue', () => {
      socket.user.queue = null
      // updateQueueArray()
      updatePlayerStatus()
      updatePlayersList()
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

    socket.on('change player status', (data) => {
      changePlayerStatus(data)
    })

    function changePlayerStatus () {

      if (!socket.user.status.isReady) {
        socket.user.status.isReady = true
        socket.user.status.statusString = 'Ready'
      } else if (socket.user.isDrawing && gameStatus.status === 'game started') {
        socket.user.status.statusString = 'Drawing'
      }
      else if (gameStatus.status !== 'game started') {
        socket.user.status.isReady = false
        socket.user.status.statusString = 'Not ready'
      }
      updatePlayerStatus()
      updatePlayersList()
      checkIfAllReady()
    }

    function getUserRank() {

    }
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
          statusString: 'Not ready'
        },
        isDrawing: usersArray.length === 0,
        isAdmin: usersArray.length === 0,
        queue: usersArray.length === 0 ? 1 : null,
        rank: getUserRank(user)
      }

      usersArray.push(socket.user)

      const data = {message: '', date: new Date()}
      emitMessage(data, 'userJoined')

      updatePlayersList()
      checkIfAllReady()
      updatePlayerStatus()
    })

    socket.on('disconnect', () => {
      if (addedUser) {
        --usersCount

        if (socket.user) {
          const index = usersArray.indexOf(socket.user.username)
          usersArray.splice(index, 1)
          updatePlayersList()
          checkIfAllReady()

          const data = {date: new Date(), message: ''}
          emitMessage(data, 'userLeft')
        }

      }
    })

  })

}

module.exports = sockets
