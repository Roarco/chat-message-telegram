const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');

const upload = multer({
    dest: 'public/files/',
});

router.get('/', (req, res) => {
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.succes(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

router.post('/', upload.single('file'),(req, res) => {
    controller.addMessage(req.body.chat,req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.succes(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información invalida', 400, 'Error en el controlador');
        });
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.succes(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.succes(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});


module.exports = router;