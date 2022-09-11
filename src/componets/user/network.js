const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

router.get('/', (req, res) => {
    const filterUser = req.query.id || null;
    controller.getUsers(filterUser)
        .then((userList) => {
            response.succes(req, res, userList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then((data) => {
            response.succes(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información invalida', 400, 'Error en el controlador');
        });
});

router.patch('/:id', (req, res) => {
    controller.updateUser(req.params.id, req.body.name)
        .then((data) => {
            response.succes(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', (req, res) => {
    controller.removeUser(req.params.id)
        .then(() => {
            response.succes(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;