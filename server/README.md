# Server

## Installation

1. Run `npm install`.
2. Configure your MongoDB connection string in `config/database.js`
3. Insert sample game slogans by running script `node scripts/insertSlogans.js`. You will be asked
to choose language.


## Start

To run server simply type `node index.js`. 

If everything is fine it should connect to DB and start
API and socket server.

If you need autoreload I recommend using [nodemon](https://nodemon.io/), and on production server you can use [pm2](http://pm2.keymetrics.io/).

## Other

App is prepared to work with reverse proxy [nginx](https://www.nginx.com/), additionally you can find commented lines which prepare the app
to use with https protocol.