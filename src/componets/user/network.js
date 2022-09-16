const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

router.get('/', async(req, res) => {
    const query = req.query;

    try{
        const users = await controller.getUsers(query);
        response.succes(req, res, 'users were found', 200, users);
    }catch(e){
        response.error(req, res, e.message, e.status ,e.internal);
    }
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