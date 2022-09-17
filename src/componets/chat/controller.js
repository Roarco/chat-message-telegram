const store = require('./store');

const addChat = async (users) => {
    return new Promise(async(resolve, reject) => {
        if (!users || users.length < 2){
            reject({
                message: 'There are not enough users to create a chat',
                internal: `Something went wrong in the controller`,
                status: 400
            });
        }else{
            try {
                const myUsers = {
                    users
                }
                const chat = store.add(myUsers);
                resolve(chat);
            } catch (error) {
                reject({
                    message: 'An internal error has ocurred',
                    internal: `Something went wrong in the controller ${error.message}`,
                    status: 500
                });
            }
        }
    });
}

const listChats = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const chats = await store.list(userId);
            resolve(chats);
        } catch (error) {
            reject({
                message: 'Error al listar los chats',
                internal: `Something want wrong with the chat store (getChats) ${error.message}`,
                status: 500
            });
        }
    });
}

module.exports = {
    addChat,
    listChats,
};