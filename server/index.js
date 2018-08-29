
const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const userRoutes = require('./routes/user/userRoutes');
const sloganRoutes = require('./routes/slogan/sloganRoutes');
const server = http.Server(app);

const port = process.env.PORT || 8080;
const socketPort = 3001;
const sockets = require('./sockets/main');


//Define your ssl certificate paths
// const sslOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/pictionary.pl/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/pictionary.pl/fullchain.pem')
// }
// const secureServer = https.createServer(sslOptions, app);

// Connect to database
mongoose.connect(config.database).then( () => {
  console.log('Connection to database established');
}, (err) => {
  console.log('Connection to database failed' + err);
});

app.use(cors());

// Set Static Folder
// app.use(express.static(path.join(__dirname, '../client/dist')));
// Uncomment if you want to serve app from node

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/api/user', userRoutes);
app.use('/api/slogan', sloganRoutes);
app.get('/', (req, res) => {res.send('Invalid Endpoint');});

// app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../client/dist/index.html'));});
// Uncomment if you want to serve app from node


//If you don't have SSL on prod and good for development use
server.listen(socketPort, () => {
    console.warn(`Listen sockets on: ${socketPort}`);
});
sockets.init(server);
app.listen(port, () => {
  console.log(`App started on port: ${port}`);
});

//If you have configured SSL on prod
// secureServer.listen(socketPort, () => {
//   console.warn(`Listen sockets on: ${socketPort}`);
// })
// sockets.init(secureServer);
// secureServer.listen(port, () => {
//   console.log(`Ssl listen on: ${port}`);
// })
