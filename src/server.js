const express = require('express');
const app = express();
const router = require('./network/routers');

app.use(express.json());
router(app);

app.use('/app', express.static('src/public'));

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});