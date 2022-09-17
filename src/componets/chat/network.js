const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');



router.get('/', async (req, res) => {
    try{
        const allChats = await controller.listChats();
        response.succes(
            req,
			res,
			'Chats were retrieved successfully.',
			200,
			allChats
        );
    }catch(err){
        response.error(req,res, err.message, err.status, err.internal)
    }
});

router.get('/:userId', async (req, res) => {
    /* controller.listChats(req.params.userId)
        .then((users) => {
            response.succes(req, res, users, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        }); */
        const { userId } = req.params;

        try{
            const chats = await controller.listChats(userId);
            response.succes(
                req,
                res,
                'Chats were retrieved successfully.',
                200,
                chats
            );
        }catch(err){
            response.error(req,res, err.message, err.status, err.internal)
        }
});

router.post('/', async (req, res) => {
        const { users } = req.body;

        try{
            const addedChat = await controller.addChat(users);
            response.succes(
                req,
                res,
                'Chat was added successfully.',
                201,
                addedChat
            );
        }catch(err){
            response.error(req,res, err.message, err.status, err.internal)
        }
});


module.exports = router;