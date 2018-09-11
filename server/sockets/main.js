let sockets = {};
const User = require('../models/user/user');
const Slogan = require('../models/slogan/slogan');

sockets.init = (server) => {

    let io = require('socket.io').listen(server);
    let usersCount = 0;
    let usersArray = [];
    let addedUser = false;
    let currentSlogan = {};
    let gameStatus = {
        status: 'waiting for players',
        user: {}
    };

    io.on('connection', (socket) => {

        function updatePlayersList() {
            io.emit('update users list', {
                usersArray: usersArray,
                usersCount: usersCount
            })
        }

        function checkIfAllReady() {
            const test = usersArray.filter((user) => {
                return user.status.isReady === false
            });

            if (test.length === 0) {
                io.emit('all ready', true)
            } else {
                io.emit('all ready', false)
            }
        }

        function checkAnswer(message) {

            if (currentSlogan.validAnswers.includes(message.toLowerCase())) {

                const data = {date: new Date(), message: message};
                emitMessage(data, 'gameWon');
                gameStatusChanged('gameWon')

            } else if (currentSlogan.almostValidAnswers.includes(message)) {

                const data = {date: new Date(), message: message};
                emitMessage(data, 'gameAlmostWon')

            }

        }

        function updateRankings(isWon) {

            const drawer = usersArray.filter((user) => {
                return user.isDrawing
            });
console.log(usersArray);
            if (isWon) {
                User.updateRank(socket.user.id, 25);
                socket.user.rank += 20;

                drawer[0].rank += 30;
                User.updateRank(drawer[0].id, 30);

                usersArray.map((user) => {
                    if (user.isDrawing) {
                        emitRankingUpdateMessage(user, true, '+30')
                    } else if (user === socket.user) {
                        emitRankingUpdateMessage(user, true, '+20')
                    } else {
                        emitRankingUpdateMessage(user, false, '-5')
                    }

                })
            } else {
                drawer[0].rank -= 30;
                User.updateRank(drawer[0].id, -30);

                usersArray.map((user) => {
                    if (user.isDrawing) {
                        emitRankingUpdateMessage(user, false, '-30')
                    } else {
                        emitRankingUpdateMessage(user, false, '-5')
                    }
                })
            }

        }

        function emitRankingUpdateMessage(user, isIncreased, value) {
            io.emit('new room message', {
                username: user.username,
                message: '',
                isIncreased: isIncreased,
                type: 'rankingUpdate',
                value: value,
                date: new Date()
            })
        }

        function emitMessage(data, type) {
            io.emit('new room message', {
                username: socket.user.username,
                message: data.message,
                date: data.date,
                type: type
            })
        }

        function resetPlayersStatuses() {
            usersArray.map((user) => {
                user.status = {
                    isReady: false,
                    statusString: 'Not ready'
                }
            });
            checkIfAllReady();
            updatePlayersList()
        }

        function emitMessageToPlayer(data, type) {
            socket.emit('new room message', {
                username: socket.user.username,
                message: data.message,
                date: data.date,
                type: type
            })
        }

        function gameStatusChanged(status) {

            if (status === 'game started') {
                Slogan.getAllSlogans((err, slogans) => {
                    const random = Math.floor((Math.random() * slogans.length));
                    currentSlogan = slogans[random];
                    gameStatus.status = 'game started';
                    const data = {gameStatus: gameStatus.status, slogan: currentSlogan.slogan};
                    io.emit('game status changed', data)
                })

            } else {
                if (status === 'time up') {
                    const data = {date: new Date(), message: ''};
                    emitMessage(data, 'timeUp')
                }
                gameStatus.status = 'waiting for players';
                updateRankings(status === 'gameWon');
                resetPlayersStatuses();
                deleteDrawerFromQueue();
                const data = {gameStatus: gameStatus.status, slogan: null};
                io.emit('game status changed', data)
            }
        }

        function updatePlayerStatus() {
            socket.emit('player status changed', {user: socket.user})
        }

        function getQueueArray() {
            const queueArray = usersArray.filter((user) => {
                return user.queue !== null
            });
            return queueArray.sort((a, b) => {
                return a.queue - b.queue
            })
        }

        function deleteDrawerFromQueue() {

            usersArray.map((user) => {
                if (user.queue === 1) {
                    user.queue = null;
                    user.isDrawing = false
                } else if (user.queue !== null && user.queue !== 1) {
                    user.queue -= 1
                }
            });

            usersArray.filter((user) => {
                if (user.queue === 1) {
                    user.isDrawing = true
                }
            });

            updatePlayersList()

        }

        function changePlayerStatus() {

            if (!socket.user.status.isReady) {
                socket.user.status.isReady = true;
                socket.user.status.statusString = 'Ready'
            } else if (socket.user.isDrawing && gameStatus.status === 'game started') {
                socket.user.status.statusString = 'Drawing'
            }
            else if (gameStatus.status !== 'game started') {
                socket.user.status.isReady = false;
                socket.user.status.statusString = 'Not ready'
            }
            updatePlayerStatus();
            updatePlayersList();
            checkIfAllReady()
        }

        socket.on('join queue', () => {

            socket.user.queue = getQueueArray().length + 1;
            if (socket.user.queue === 1) {
                socket.user.isDrawing = true;
            }
            updatePlayerStatus();
            updatePlayersList()
        });

        socket.on('leave queue', () => {
            if (socket.user.isDrawing) {
                socket.user.isDrawing = false;
            }
            socket.user.queue = null;
            updatePlayerStatus();
            updatePlayersList()
        });

        socket.on('new message', (data) => {

            // Check if user is not drawing right now
            if (socket.user.status.statusString === 'Drawing') {
                emitMessageToPlayer({date: new Date(), message: ''}, 'sendBlocked');
                return false
            }

            emitMessage(data, 'userMessage');

            if (gameStatus.status === 'game started') {
                checkAnswer(data.message)
            }
        });

        socket.on('drawing', (data) => {
            io.emit('drawing', data)
        });

        socket.on('reset', () => {
            io.emit('resetUpdate')
        });

        socket.on('start game', () => {
            gameStatusChanged('game started')
        });

        socket.on('time up', () => {
            gameStatusChanged('time up')
        });

        socket.on('change player status', (data) => {
            changePlayerStatus(data)
        });

        socket.on('log user', (user) => {
            // if (addedUser && usersArray.indexOf(user.username) !== -1) return false

            addedUser = true;
            ++usersCount;

            socket.user = {
                id: user.id,
                email: user.email,
                username: user.username,
                rank: user.rank,
                status: {
                    isReady: false,
                    statusString: 'Not ready'
                },
                isDrawing: usersArray.length === 0,
                isAdmin: usersArray.length === 0,
                queue: usersArray.length === 0 ? 1 : null
            };

            usersArray.push(socket.user);

            const data = {message: '', date: new Date()};
            emitMessage(data, 'userJoined');

            updatePlayersList();
            checkIfAllReady();
            updatePlayerStatus()
        });

        socket.on('disconnect', () => {

                if (socket.user) {
                    addedUser = false;
                    --usersCount;
                    usersArray = usersArray.filter( (user) => {
                        return user !== socket.user;
                    });

                    //TODO check if game is in progress, handle it

                    updatePlayersList();
                    checkIfAllReady();

                    const data = {date: new Date(), message: ''};
                    emitMessage(data, 'userLeft')
                }

        })

    })

};

module.exports = sockets;
