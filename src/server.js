require('dotenv').config({
    path: './.env'
});
const express = require('express');
const app = express();
const router = require('./network/routers');
const port = process.env.PORT || 3000;
const db = require('./lib/db.js');
const server = require('http').Server(app);
const socket = require('./socket');

db.connect();


app.use(express.json());
socket.connect(server);
router(app);

app.use('/app', express.static('public'));

server.listen(port, function() {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});