const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer'); // Middleware for file upload
const path = require('path'); // Path module to manage file paths

const { socket } = require('../../socket');

// Upload multer instance
const storage = multer.diskStorage({
    destination: 'public/files/',
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    },
});

const upload = multer({
    storage: storage,
});

//Endpoints

router.get('/', async(req, res) => {
    //const filterMessages = req.query.chat || null;
    const query = req.query || null;

    try {
        const messages = await controller.getMessages(query);
        response.succes(req, res, 'Messages retrieved successfully', 200, messages);
    } catch (error) {
        response.error(req, res, error.message, error.status, error.internal);
    }
});

router.post('/', upload.single('file'),async (req, res) => {

        const { chat, user, message } = req.body;

        try {
            const fullMessage = await controller.addMessage(
                chat,
                user,
                message,
                req.file,
            );
            const messagePopulated = await controller.getMessages({
                id: fullMessage._id,
            });
            socket.io.emit(`${fullMessage.chat}`, messagePopulated[0]);
            response.succes(req, res,'Message created successfully', 201, fullMessage);
        } catch (error) {
            response.error(req, res, error.message, error.status, error.internal);
        }
});

router.patch('/:id',async (req, res) => {
        const { id } = req.params;
        const { message } = req.body;

        try {
            const updatedMessage = await controller.updateMessage(id, message);
            response.succes(req, res, 'Message updated successfully', 200, updatedMessage);
        } catch (error) {
            response.error(req, res, error.message, error.status, error.internal);
        }
});

router.delete('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const deletedMessage = await controller.deleteMessage(id);
            if (deletedMessage) {
                response.succes(req, res, 'Message deleted successfully', 200, deletedMessage);
            }else{
                response.error(req, res, 'Message not found', 404, 'Message not found');
            }
        } catch (error) {
            response.error(req, res, error.message, error.status, error.internal);
        }
});


module.exports = router;