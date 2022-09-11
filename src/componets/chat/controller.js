const store = require('./store');

function addChat(users) {
    return new Promise(async (resolve, reject) => {
        if (!users || !Array.isArray(users)) {
            console.error('[messageController] No hay usuarios');
            return reject('Los datos son incorrectos');
        }
        const chat = {
            users: users,
        };
        store.add(chat);
        resolve(chat);
    });
}

function listChats(userId) {
    return new Promise((resolve, reject) => {
        resolve(store.list(userId));
    });
}

module.exports = {
    addChat,
    listChats,
};