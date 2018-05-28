let sockets = {}

sockets.init = (server) => {

  let io = require('socket.io').listen(server)

  let usersCount = 0
  let usersArray = []

  io.on('connection', (socket) => {
    let addedUser = false

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

    socket.on('log user', (username) => {

      if (addedUser && usersArray.indexOf(username) !== -1) return

      socket.username = username
      addedUser = true
      ++usersCount
      usersArray.push(username)

      io.emit('user joined', {
        username: socket.username,
      })

      io.emit('update users list', {
        usersArray: usersArray,
        usersCount: usersCount
      })

      io.emit('new room message', {
        username: username,
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
