
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');


// Connect to database
mongoose.connect(config.database).then( () => {
  console.log('Connection to database established');
}, (err) => {
  console.log('Connection to database failed' + err);
});


const app = express();
const userRoutes = require('./routes/user/userRoutes');
const server = http.Server(app);


app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.use('/user', userRoutes);
app.get('/', (req, res) => {res.send('Invalid Endpoint');});
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '/public/index.html'));});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`started on port: ${port}`);
});

// const io = socketIO(server);
//
//
//
// io.on('connection', (socket) => {
//   console.log('user connected');
//
//   socket.on('new-message', (message) => {
//     console.warn(message);
//     io.emit('new-message', message);
//   });
// });
//
// server.listen(port, () => {
//   console.log(`started on port: ${port}`);
// });
