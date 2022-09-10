const express = require('express');
const router = express.Router();

const response = require('./network/response');

const app = express();

app.use(express.json());
app.use(router);

router.get('/message', (req, res) => {
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado"
    });
    response.succes(req, res, 'Lista de mensajes');
});

router.post('/message', (req, res) => {
    console.log(req.query);
    if (req.query.error == 'ok') {
        response.error(req, res, 'Error inesperado', 400, 'Es solo una simulacion de los errores');
    } else {
        response.succes(req, res, 'Creado correctamente', 201);
    }
});

app.use('/app', express.static('src/public'));

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});