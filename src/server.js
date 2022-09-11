require('dotenv').config({
    path: './.env'
});
const express = require('express');
const app = express();
const router = require('./network/routers');
const port = process.env.PORT || 3000;
const db = require('./lib/db.js');

db.connect();


app.use(express.json());
router(app);

app.use('/app', express.static('public'));

app.listen(port, function() {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});