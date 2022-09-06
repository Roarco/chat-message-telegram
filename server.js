const express = require('express');
const router = express.Router();

const app = express();

app.use(express.json());
app.use(router);

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/api', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});