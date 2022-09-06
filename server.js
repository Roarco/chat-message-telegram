const express = require('express');

const app = express();

app.use('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});