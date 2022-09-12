/* require('dotenv').config({
    path: './.env'
}); */
const express = require('express');
const app = express();
const router = require('./network/routers');
const config = require('./config');
const PORT = config.port;
const db = require('./lib/db.js');
const server = require('http').Server(app);
const socket = require('./socket');
const cors = require('cors');

db.connect();

app.use(cors());

app.use(express.json());
socket.connect(server);
router(app);

app.use('/app', express.static('public'));

server.listen(PORT, function() {
    console.log(`La aplicación está escuchando en http://localhost:${PORT}`);
});