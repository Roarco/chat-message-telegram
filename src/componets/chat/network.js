const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

router.get('/:userId', (req, res) => {
    controller.listChats(req.params.userId)
        .then((users) => {
            response.succes(req, res, users, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

router.post('/', (req, res) => {
    controller.addChat(req.body.users)
        .then((fullChat) => {
            response.succes(req, res, fullChat, 201);
        }
        )
        .catch(e => {
            response.error(req, res, 'Información invalida', 400, 'Error en el controlador');
        }
        );
});


module.exports = router;