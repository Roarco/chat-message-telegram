const express = require('express');
const response = require('../../network/response');
const router = express.Router();


router.get('/', (req, res) => {
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado"
    });
    response.succes(req, res, 'Lista de mensajes');
});

router.post('/', (req, res) => {
    console.log(req.query);
    if (req.query.error == 'ok') {
        response.error(req, res, 'Error inesperado', 400, 'Es solo una simulacion de los errores');
    } else {
        response.succes(req, res, 'Creado correctamente', 201);
    }
});


module.exports = router;