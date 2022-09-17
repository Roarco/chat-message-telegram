//imports
const express = require('express');
const app = express();
const router = require('./network/routers');
const config = require('./config');
const PORT = config.port;
const db = require('./lib/db.js');
const server = require('http').Server(app);
const socket = require('./socket');
const cors = require('cors');

//conect the database
db.connect();

//middlewares for express
app.use(cors());
app.use(express.json());

// Router set
router(app);

/* app.use('/app', express.static('public'));
app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
}); */

//conection to the web socket
socket.connect(server);
socket.socket.io.on('connection',(socket) => {
    console.log('Some has connected');
    socket.emit('message','TESTING');
    socket.on('disconnect',() => {
        console.log('user disconnected');
    });
});

server.listen(PORT, function() {
    console.log(`La aplicación está escuchando en http://localhost:${PORT}`);
});